// Adaptado a Moodle por Manuel Fernando M.A
// Gracias a @muazkh por su Contribucion:
// Muaz Khan     - MuazKhan.com
// MIT License   - WebRTC-Experiment.com/licence
// Documentation - RTCMultiConnection.org

    // inicializando el constructor
    var connection = new RTCMultiConnection();
    // conexion por firebase
    connection.firebase = false;
    // configuracion del tipo de conección de medios
    connection.session = {
        data: true,
        audio: false,
        video: false
    };
    // luego puedo invocar la recepcion de audio y video
    connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
    };
    // Capturo el usuario de la sesion
    var username = userjs;
    // Capturo foto de perfil usuario
    var avatar = avatarjs;
    //  Grupo del usuario
    var grupo = currentgroupjs;
    // src del avatar del usuario
    var srcAvatar = srcAvatarjs;
    // conversor de hora a hora 10:45 pm - 08:06 am
    // funcion para insertar el cero
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    // funcion para convertir hora en 10:45
    function modHora(i) {
        if (i > 12){
            i = i - 12;
        }
        return i;
    }
    // funcion para insertar el am y pm
    var d = new Date();
    if (d.getHours() <= 12) {
        var H = "am";
        } else{
          var H = "pm";
    }
    // datos extra para compartir el nombre completo, img perfil, hora publicacion
    connection.extra = {
        username: username,
        imgPerfil: avatar,
        srcAvatar: srcAvatar,
        grupo: grupo
        //horaPublicacion: horaPublicacion
    };
    // Establecer algunos valores predeterminados
    connection.preventSSLAutoAllowed = false;
    connection.autoReDialOnFailure = true;
    connection.setDefaultEventsForMediaElement = false;
    //var userMaxParticipantsAllowed = 8;
    //var maxParticipantsAllowed = 8;
    //var direction = 'many-to-many';
    // connection.direction = 'one-to-many';

/* ui-Detect WebRTC*/
    var RTCPeerConnection = null;
    var getUserMedia = null;
    var attachMediaStream = null;
    var reattachMediaStream = null;
    var webrtcDetectedBrowser = null;

    if (navigator.mozGetUserMedia) {
        console.log("Este navegador parece ser Firefox Mozilla!");
        webrtcDetectedBrowser = "firefox";
        // El objeto RTCPeerConnection
        RTCPeerConnection = mozRTCPeerConnection;
        // El objeto RTCSessionDescription
        RTCSessionDescription = mozRTCSessionDescription;
        // El objeto RTCIceCandidate
        RTCIceCandidate = mozRTCIceCandidate;
        // Obtener UserMedia (única diferencia es el prefijo)
        // Codigo de Adam Barth
        getUserMedia = navigator.mozGetUserMedia.bind(navigator);
        // Adjuntar una secuencia de medios a un elemento
        attachMediaStream = function (element, stream) {
            console.log("Colocación de flujo de medios");
            element.mozSrcObject = stream;
            element.play();
        };
        reattachMediaStream = function (to, from) {
            console.log("Cómo volver a colocar el flujo de medios");
            to.mozSrcObject = from.mozSrcObject;
            to.play();
        };
        // Fake get{Video,Audio}Tracks
        MediaStream.prototype.getVideoTracks = function () {
            return [];
        };

        MediaStream.prototype.getAudioTracks = function () {
            return [];
        };
    } else if (navigator.webkitGetUserMedia) {
        console.log("Este navegador parece ser Google Chrome u Opera");
        webrtcDetectedBrowser = "chrome";
        // El objeto RTCPeerConnection
        RTCPeerConnection = webkitRTCPeerConnection;

        // Obtener UserMedia (only difference is the prefix).
        // Código de Adam Barth
        getUserMedia = navigator.webkitGetUserMedia.bind(navigator);
        // Adjunte una secuencia de medios a un elemento.
        attachMediaStream = function (element, stream) {
            element.src = webkitURL.createObjectURL(stream);
        };
        reattachMediaStream = function (to, from) {
            to.src = from.src;
        };
        // La representación de los tracks (flujo audio) en una corriente se cambia en M26.
        // Unificarlos para versiones anteriores de Google Chrome en el período de coexistencia.
        if (!webkitMediaStream.prototype.getVideoTracks) {
            webkitMediaStream.prototype.getVideoTracks = function () {
                return this.videoTracks;
            };
            webkitMediaStream.prototype.getAudioTracks = function () {
                return this.audioTracks;
            };
        }
        // Nueva sintaxis de metodo getXXXStreams en M26.
        if (!webkitRTCPeerConnection.prototype.getLocalStreams) {
            webkitRTCPeerConnection.prototype.getLocalStreams = function () {
                return this.localStreams;
            };
            webkitRTCPeerConnection.prototype.getRemoteStreams = function () {
                return this.remoteStreams;
            };
        }
    } else {
        var detectWebRTC = getElement('.detect-webrtc');
        detectWebRTC.style.display = 'block';
        console.log("Este navegador no parece ser un navegador moderno (Google Chrome, Firefox Mozilla u Opera), por lo tanto no es capaz de soportar WebRTC!");
    }
/*ui.main*/
    function getElement(selector) {
    return document.querySelector(selector);
    }

    var main = getElement('.chat');
    // añadir los nuevos mensajes
    function addNewMessage(args) {
        var newMessageDIV = document.createElement('li');
        newMessageDIV.className = 'left clearfix';

        var userinfoDIV = document.createElement('div');
        userinfoDIV.className = 'user-info';
        userinfoDIV.innerHTML = args.userinfo || '<img src="pix/foto-perfil.jpg">';

        newMessageDIV.appendChild(userinfoDIV);

        var userActivityDIV = document.createElement('div');
        userActivityDIV.className = 'user-activity chat-body clearfix';

        userActivityDIV.innerHTML = '<strong class="primary-font">' + args.header + '</strong><small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>' + args.horaPublicacion + '</small>';
        
        var p = document.createElement('p');
        p.className = 'message content comment';
        userActivityDIV.appendChild(p);
        p.innerHTML = args.message;

        newMessageDIV.appendChild(userActivityDIV);

        main.appendChild(newMessageDIV, main.firstChild);

        //userinfoDIV.style.height = newMessageDIV.clientHeight + 'px';

        if (args.callback) {
            args.callback(newMessageDIV);
        }

        document.querySelector('#message-sound').play();
        // configuracion scroll chat-body image
        $("#panel-body").animate({scrollTop : $("#panel-body")[0].scrollHeight},650);

    }
    // usando websockets para la señalizacion
    // https://github.com/manueltato11/e-CTR-server
    var signalingserver = 'wss://e-ctr-server-websocket-over-nodejs-manueltato11.c9.io:8080';
    // use "channel" como sessionid para usar sessionid personalizado!
    var roomid = connection.channel;
    var channel = location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
    var websocket = new WebSocket(signalingserver);

    websocket.onmessage = function (event) {
        var URLactual = window.location;
        var data = JSON.parse(event.data);

        if (data.isChannelPresent == false) {
            connection.open(); // Abre la nueva sala
            console.log('Se ha abierto una nueva sala: ', connection.channel);
            addNewMessage({
                header: 'e-Chat UNAD',
                userinfo: '<img src="pix/default.png" alt="Admin Default" title="Admin Default" class="imgchat img-rounded chat-img pull-left">',
                horaPublicacion: addZero(modHora(new Date().getHours())) + ':' + addZero(new Date().getMinutes()) + ' ' + H,
                message: 'Eres el primero en llegar al chat del grupo <span class="badge">' + connection.extra.grupo + '</span> <br />Comparte e invita a tus compañeros de grupo copiando el enlace permanente o añádalo a tus marcadores para volver cuando quieras :) <span class="badge">' + URLactual + '</span>'
            });
        } else {
            connection.join(roomid); // Se une a sala existente
            console.log('Se ha unido a la sala existente: ', connection.channel);
            addNewMessage({
                header: connection.extra.username,
                userinfo: connection.extra.imgPerfil,
                horaPublicacion: addZero(modHora(new Date().getHours())) + ':' + addZero(new Date().getMinutes()) + ' ' + H,
                message: 'Hay usuarios conectados al chat. Uniéndose al chat del grupo <span class="badge">' + connection.extra.grupo + '</span>'
            });
        }
    };
    
    websocket.onopen = function () {
        websocket.send(JSON.stringify({
            checkPresence: true,
            channel: roomid
        }));
    };

    function getUserinfo(blobURL, imageURL) {
        return blobURL ? '<video src="' + blobURL + '" autoplay controls></video>' : '<img src="' + imageURL + '">';
    }

    var isShiftKeyPressed = false;

    getElement('.input-wrapper input').onkeydown = function(e) {
        // jQuery-CSSEmoticons
        $('.comment').emoticonize();
        if (e.keyCode == 16) {
            isShiftKeyPressed = true;
        }
    };

    var numberOfKeys = 0;
    getElement('.input-wrapper input').onkeyup = function(e) {
        numberOfKeys++;
        if (numberOfKeys > 3) numberOfKeys = 0;

        if (!numberOfKeys) {
            if (e.keyCode == 8) {
                return connection.send({
                    stoppedTyping: true
                });
            }

            connection.send({
                typing: true
            });
        }

        if (isShiftKeyPressed) {
            if (e.keyCode == 16) {
                isShiftKeyPressed = false;
            }
            return;
        }


        if (e.keyCode != 13) return;

        addNewMessage({
            header: connection.extra.username,
            userinfo: connection.extra.imgPerfil,
            horaPublicacion: addZero(modHora(new Date().getHours())) + ':' + addZero(new Date().getMinutes()) + ' ' + H,
            message: linkify(this.value)
        });

        connection.send(this.value);

        this.value = '';
    };
    // que sucede cuando habilitamos la camara
    getElement('#allow-webcam').onclick = function() {
        this.disabled = true;

        var session = { audio: true, video: true };

        connection.captureUserMedia(function(stream) {
            var streamid = connection.token();
            connection.customStreams[streamid] = stream;

            connection.sendMessage({
                hasCamera: true,
                streamid: streamid,
                session: session
            });
        }, session);
    };
    // que sucede cuando habilitamos la el microfono
    getElement('#allow-mic').onclick = function() {
        this.disabled = true;
        var session = { audio: true };

        connection.captureUserMedia(function(stream) {
            var streamid = connection.token();
            connection.customStreams[streamid] = stream;

            connection.sendMessage({
                hasMic: true,
                streamid: streamid,
                session: session
            });
        }, session);
    };
    // que sucede cuando compartimos la pantalla
    getElement('#allow-screen').onclick = function() {
        this.disabled = true;
        var session = { screen: true };

        connection.captureUserMedia(function(stream) {
            var streamid = connection.token();
            connection.customStreams[streamid] = stream;

            connection.sendMessage({
                hasScreen: true,
                streamid: streamid,
                session: session
            });
        }, session);
    };
    // que sucede cuando compartirmos archivos
    getElement('#share-files').onclick = function() {
        document.getElementById('share-files').onchange = function() {
            connection.send(this.files[0]);
        };
    };

    // funcion para detectar tamaño archivos
    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Bytes';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

/* ui.peer-connection */

    // usamos websockets para la señalizacion
    // https://github.com/manueltato11/e-CTR-server
    // var signalingserver = 'wss://e-ctr-server-websocket-over-nodejs-manueltato11.c9.io/';
    connection.openSignalingChannel = function(config) {
        config.channel = config.channel || this.channel;
        var websocket = new WebSocket(signalingserver);
        websocket.channel = config.channel;

        websocket.onopen = function() {
            websocket.push(JSON.stringify({
                open: true,
                channel: config.channel
            }));
            if (config.callback)
                config.callback(websocket);
        };

        websocket.onmessage = function(event) {
            config.onmessage(JSON.parse(event.data));
        };
        websocket.push = websocket.send;
        websocket.send = function(data) {
            if (websocket.readyState != 1) {
                        return setTimeout(function() {
                            websocket.send(data);
                        }, 1000); // up 1000
            }
                    
            websocket.push(JSON.stringify({
                data: data,
                channel: config.channel
            }));
        };
    };

    connection.customStreams = { };
    // Auto traducir, falso
    connection.autoTranslateText = false;
    // RTCMultiConnection.org/docs/onopen/
    // cuando se habre la conexion
    connection.onopen = function(e) {
        getElement('#allow-webcam').disabled = false;
        getElement('#allow-mic').disabled = false;
        getElement('#share-files').disabled = false;
        getElement('#allow-screen').disabled = false;
        getElement('#chat-input').disabled = false;
        getElement('#ayuda-comentarios').disabled = false;

        addNewMessage({
            header: e.extra.username,
            userinfo: e.extra.imgPerfil,
            horaPublicacion: addZero(modHora(new Date().getHours())) + ':' + addZero(new Date().getMinutes()) + ' ' + H,
            message: 'La conexión de datos se ha establecido entre usted y <strong>' + e.extra.username + '</strong>.'
        });

        // refrescamos la lista de usuarios online
        var listUsers = document.getElementById("usuariosOnline");
        while (listUsers.hasChildNodes()) {
            listUsers.removeChild(listUsers.firstChild);
        }
        // console.info('Arreglo de todos los usuarios conectados: ', arrayOfAllConnectedUsers);
        // establezco el bucle que pasa a traves de los items en el arreglo
        console.log('Numero de usuarios conectados: ', connection.numberOfConnectedUsers + 1);
        var arrayOfAllConnectedUsers = [];
        for (var userid in connection.peers) {
            console.debug(userid, 'esta conectado.');
            arrayOfAllConnectedUsers.push(userid);
        }
        var numberOfListItems = arrayOfAllConnectedUsers.length;
        for (var i = 0; i < numberOfListItems; ++i) {
            // creamos <li> para cada uno
            var listItem = document.createElement('li');
            listItem.className = "list-group-item list-group-li";
            listItem.setAttribute("id", arrayOfAllConnectedUsers[i])
            var imgPerfil = document.createElement('img');
            imgPerfil.className = "imgchat img-circle";
            var perfilUsuario = document.createElement('a');
            perfilUsuario.className = "user-perfil";
            var spanPerfil = document.createElement('span');
            spanPerfil.className = "user-perfil";
            var h6 = document.createElement('h6');
            var spanLabel = document.createElement('span');
            spanLabel.className = "label label-success";
            // agrego el texto del elemento
            perfilUsuario.innerHTML = arrayOfAllConnectedUsers[i];
            // añado los elementos a la pagina
            document.getElementById("usuariosOnline").appendChild(listItem);
            listItem.appendChild(imgPerfil);
            listItem.appendChild(perfilUsuario);
            listItem.appendChild(spanPerfil);
            spanPerfil.appendChild(h6);
            h6.appendChild(spanLabel);
            // estado predeterminado
            spanLabel.innerHTML = 'online';
            imgPerfil.setAttribute('src', 'pix/foto-perfil.jpg');
            // al conectarse ocultar mensaje
            // document.getElementById('listWarning').setAttribute('hidden','')
            numbersOfUsers.innerHTML = 1;
            // numero de usuarios conectados
            numbersOfUsers.innerHTML = parseInt(numbersOfUsers.innerHTML) + 1;

        }

    };
    // RTCMultiConnection.org/docs/onmessage/
    // evento para cada nuevo mensaje de datos
    connection.onmessage = function(e) {
        if (e.data.typing) {
            document.getElementById("chat-input").placeholder = e.extra.username + ' esta escribiendo ...';
            return;
        }

        if (e.data.stoppedTyping) {
            document.getElementById("chat-input").placeholder = 'Escriba su mensaje...';
            return;
        }
        document.getElementById("chat-input").placeholder = 'Escriba su mensaje...';

        addNewMessage({
            header: e.extra.username,
            userinfo: e.extra.imgPerfil,
            horaPublicacion: addZero(modHora(new Date().getHours())) + ':' + addZero(new Date().getMinutes()) + ' ' + H,
            message: (connection.autoTranslateText ? linkify(e.data) + '<span style="font-style: oblique; color: #BDBDBD"> (' + linkify(e.original) + ')</span>' : linkify(e.data))
        });
        // jQuery-CSSEmoticons
       // $('.comment').emoticonize();
        document.title = e.data;
        // Conocer la latencia de los datos que fluyen entre las conexiones
        console.debug(e.extra.username,'(', e.userid,') publico:', e.data);
        console.log('Su latencia:', e.latency, 'ms');

    };
    // RTCMultiConnection.org/docs/onNewSession/
    // evento para unirse a una sala con o sin  stream(s)
    var sessions = { };
    connection.onNewSession = function(session) {
        if (sessions[session.sessionid]) return;
        sessions[session.sessionid] = session;

        session.join();

        addNewMessage({
            header: session.extra.username,
            userinfo: session.extra.imgPerfil,
            horaPublicacion: addZero(modHora(new Date().getHours())) + ':' + addZero(new Date().getMinutes()) + ' ' + H,
            message: 'Hacer apretón de manos con el propietario del chat...!'
        });
    };
    // RTCMultiConnection.org/docs/onRequest/
    // evento se activa para cada nueva participacion o cada peticion
    connection.onRequest = function(request) {
        connection.accept(request);
        addNewMessage({
            header: 'Nuevo Participante!',
            userinfo: request.extra.imgPerfil,
            horaPublicacion: addZero(modHora(new Date().getHours())) + ':' + addZero(new Date().getMinutes()) + ' ' + H,
            message: 'Se ha conectado al chat <strong>' + request.extra.username + ' <span class="badge">' + request.userid + '</span>'
        });
    };
    // RTCMultiConnection.org/docs/onCustomMessage/
    // evento para mensajes personalizados
    connection.onCustomMessage = function(message) {
        if (message.hasCamera || message.hasScreen) {
            var msg = message.extra.username + ' compartió su cámara. <br /><button id="preview" class="btn btn-success btn-sm">Vista previa <span class="fa fa-desktop"></span></button>  <button id="share-your-cam" class="btn btn-success btn-sm">Compartir mi cámara <span class="fa fa-camera"></span></button>';

            if (message.hasScreen) {
                msg = message.extra.username + ' está dispuesto a compartir su pantalla. <br /><button id="preview" class="btn btn-success btn-sm">Ver su pantalla<span class="fa fa-desktop"></span></button>  <button id="share-your-cam" class="btn btn-success btn-sm">Compartir mi cámara <span class="fa fa-camera"></span></button>';
            }

            addNewMessage({
                header: message.extra.username,
                userinfo: message.extra.imgPerfil,
                horaPublicacion: addZero(modHora(new Date().getHours())) + ':' + addZero(new Date().getMinutes()) + ' ' + H,
                message: msg,
                callback: function(div) {
                    div.querySelector('#preview').onclick = function() {
                        this.disabled = true;

                        message.session.oneway = true;
                        connection.sendMessage({
                            renegotiate: true,
                            streamid: message.streamid,
                            session: message.session
                        });
                    };

                    div.querySelector('#share-your-cam').onclick = function() {
                        this.disabled = true;

                        if (!message.hasScreen) {
                            session = { audio: true, video: true };

                            connection.captureUserMedia(function(stream) {
                                connection.renegotiatedSessions[JSON.stringify(session)] = {
                                    session: session,
                                    stream: stream
                                }
                            
                                connection.peers[message.userid].peer.connection.addStream(stream);
                                div.querySelector('#preview').onclick();
                            }, session);
                        }

                        if (message.hasScreen) {
                            var session = { screen: true };

                            connection.captureUserMedia(function(stream) {
                                connection.renegotiatedSessions[JSON.stringify(session)] = {
                                    session: session,
                                    stream: stream
                                }
                                connection.peers[message.userid].peer.connection.addStream(stream);
                                div.querySelector('#preview').onclick();
                            }, session);
                        }
                    };
                }
            });
        }

        if (message.hasMic) {
            addNewMessage({
                header: message.extra.username,
                userinfo: message.extra.imgPerfil,
                horaPublicacion: addZero(modHora(new Date().getHours())) + ':' + addZero(new Date().getMinutes()) + ' ' + H,
                message: message.extra.username + ' compartió su micrófono. <br /><button id="listen" class="btn btn-success btn-sm">Escuchar <span class="fa fa-volume-up"></span></button>  <button id="share-your-mic" class="btn btn-success btn-sm">Compartir mi micrófono <span class="fa fa-microphone"></span></button>',
                callback: function(div) {
                    div.querySelector('#listen').onclick = function() {
                        this.disabled = true;
                        message.session.oneway = true;
                        connection.sendMessage({
                            renegotiate: true,
                            streamid: message.streamid,
                            session: message.session
                        });
                    };

                    div.querySelector('#share-your-mic').onclick = function() {
                        this.disabled = true;

                        var session = { audio: true };

                        connection.captureUserMedia(function(stream) {
                            connection.renegotiatedSessions[JSON.stringify(session)] = {
                                session: session,
                                stream: stream
                            }
                            
                            connection.peers[message.userid].peer.connection.addStream(stream);
                            div.querySelector('#listen').onclick();
                        }, session);
                    };
                }
            });
        }

        if (message.renegotiate) {
            var customStream = connection.customStreams[message.streamid];
            if (customStream) {
                connection.peers[message.userid].renegotiate(customStream, message.session);
            }
        }
    };
    // RTCMultiConnection.org/docs/onstream/
    // Evento que se activa para los flujos locales/remotos de comunicacion
    // Flujos como de audio, video, datos, pantalla
    connection.blobURLs = { };
    connection.onstream = function(e) {
        if (e.stream.getVideoTracks().length) {
            connection.blobURLs[e.userid] = e.blobURL;
            /*
            if( document.getElementById(e.userid) ) {
                document.getElementById(e.userid).muted = true;
            }
            */
            addNewMessage({
                header: e.extra.username,
                userinfo: e.extra.imgPerfil,
                horaPublicacion: addZero(modHora(new Date().getHours())) + ':' + addZero(new Date().getMinutes()) + ' ' + H,
                message: e.extra.username + ' compartió su cámara <span class="fa fa-camera"></span>'
            });
        } else {
            addNewMessage({
                header: e.extra.username,
                userinfo: e.extra.imgPerfil,
                horaPublicacion: addZero(modHora(new Date().getHours())) + ':' + addZero(new Date().getMinutes()) + ' ' + H,
                message: e.extra.username + ' compartió su micrófono <span class="fa fa-microphone"></span>'
            });
        }
        // contenedor de la llamada de video
        var videosContainer = document.getElementById('videos-container') || document.body;

        // botones de la llamado de voz y audio
        var buttons = ['mute-audio', 'mute-video', 'record-audio', 'record-video', 'full-screen', 'volume-slider', 'stop'];

        if (connection.session.audio && !connection.session.video) {
            buttons = ['mute-audio', 'full-screen', 'stop'];
        }

        var mediaElement = getMediaElement(e.mediaElement, {
            width: (videosContainer.clientWidth / 2) - 50,
            title: e.userid,
            buttons: buttons,
            onMuted: function(type) {
                connection.streams[e.streamid].mute({
                    audio: type == 'audio',
                    video: type == 'video'
                });
            },
            onUnMuted: function(type) {
                connection.streams[e.streamid].unmute({
                    audio: type == 'audio',
                    video: type == 'video'
                });
            },
            onRecordingStarted: function(type) {
                // www.RTCMultiConnection.org/docs/startRecording/
                connection.streams[e.streamid].startRecording({
                    audio: type == 'audio',
                    video: type == 'video'
                });
            },
            onRecordingStopped: function(type) {
                // www.RTCMultiConnection.org/docs/stopRecording/
                connection.streams[e.streamid].stopRecording(function(blob) {
                    if (blob.audio) connection.saveToDisk(blob.audio);
                    else if (blob.video) connection.saveToDisk(blob.video);
                    else connection.saveToDisk(blob);
                }, type);
            },
            onStopped: function() {
                connection.peers[e.userid].drop();
            }
        });

        videosContainer.appendChild(mediaElement, videosContainer.firstChild);

        if (e.type == 'local') {
            mediaElement.media.muted = true;
            mediaElement.media.volume = 0;
        }
    };
    // RTCMultiConnection.org/docs/onstreamended
    connection.onstreamended = function(e) {
        if (e.mediaElement.parentNode && e.mediaElement.parentNode.parentNode && e.mediaElement.parentNode.parentNode.parentNode) {
            e.mediaElement.parentNode.parentNode.parentNode.removeChild(e.mediaElement.parentNode.parentNode);
        }
    };
    // RTCMultiConnection.org/docs/sendMessage
    connection.sendMessage = function(message) {
        message.userid = connection.userid;
        message.extra = connection.extra;
        connection.sendCustomMessage(message);
    };
    // RTCMultiConnection.org/docs/onleave/
    // Comprueba si el iniciador o participantes se han ido
    connection.onleave = function(event) {
        addNewMessage({
            header: event.extra.username,
            userinfo: event.extra.imgPerfil,
            horaPublicacion: addZero(modHora(new Date().getHours())) + ':' + addZero(new Date().getMinutes()) + ' ' + H,
            message: event.extra.username + ' ha abandonado el chat!'
        });

        /**
         * Elimina el <li> del <ul> correspondiente al id del usuario que se desconecto
         */
         var item = document.getElementById(event.userid);
         item.parentNode.removeChild(item);
    
    };
    // RTCMultiConnection.org/docs/onclose/
    // Evento solo se activa cuando la conexion de datos WebRTC se ha cerrado
    connection.onclose = function(event) {
        addNewMessage({
            header: event.extra.username,
            userinfo: event.extra.imgPerfil,
            horaPublicacion: addZero(modHora(new Date().getHours())) + ':' + addZero(new Date().getMinutes()) + ' ' + H,
            message: 'La conexión de datos se ha cerrado entre usted y <strong>' + event.extra.username + '</strong>'
        });

        numbersOfUsers.innerHTML = parseInt(numbersOfUsers.innerHTML) - 1;
    };

    // www.RTCMultiConnection.org/docs/onstatechange/
    // snippet recomendado por @muaz Khan para: "Session-rechecking... Descriptions not found"
    connection.onstatechange = function(state) {
    if(state.name === 'room-not-available') {
            connection.open(); // si el local no esta disponible, abrirla.
        }
    };
    // RTCMultiConnection.org/docs/onconnected/
    // Usuarios conectados (Peers)
    connection.onconnected = function (e) {
        
    }

/*ui.share-files*/
    // file sharing
    var progressHelper = { };
    // Autoguardar en el disco duro
    connection.autoSaveToDisk = false;
    // www.RTCMultiConnection.org/docs/onFileProgress/
    connection.onFileProgress = function(chunk) {
        var helper = progressHelper[chunk.uuid];
        helper.progress.value = chunk.currentPosition || chunk.maxChunks || helper.progress.max;
        updateLabel(helper.progress, helper.label);
    };
    // RTCMultiConnection.org/docs/onFileStart/
    connection.onFileStart = function(file) {
        addNewMessage({
            header: file.extra.username,
            userinfo: file.extra.imgPerfil,
            horaPublicacion: addZero(modHora(new Date().getHours())) + ':' + addZero(new Date().getMinutes()) + ' ' + H,
            message: '<strong>' + file.name + '</strong> (' + bytesToSize(file.size) + ')',
            callback: function(div) {
                var innerDiv = document.createElement('div');
                innerDiv.title = file.name;
                innerDiv.innerHTML = '<label>0%</label><progress></progress>';
                div.querySelector('.message').appendChild(innerDiv);
                progressHelper[file.uuid] = {
                    div: innerDiv,
                    progress: innerDiv.querySelector('progress'),
                    label: innerDiv.querySelector('label')
                };
                progressHelper[file.uuid].progress.max = file.maxChunks;
            }
        });
    };

    // www.RTCMultiConnection.org/docs/onFileEnd/
    connection.onFileEnd = function(file) {
        var helper = progressHelper[file.uuid];
        if (!helper) {
            console.error('No existe tal elemento en el asistente de progreso.', file);
            return;
        }
        if (file.remoteUserId) {
            helper = progressHelper[file.uuid][file.remoteUserId];
            if (!helper) {
                return;
            }
        }

        var div = helper.div;
        if (file.type.indexOf('image') != -1) {
            div.innerHTML = '<a class="content" href="' + file.url + '" download="' + file.name + '"><span class="fa fa-download"></span> <strong style="color:#337ab7;" class="primary-font">' + file.name + '</strong> </a><br /><img src="' + file.url + '" title="Descargar ' + file.name + '" style="max-width: 100%; padding-top: 5px;" class="img-rounded"> <!-- END hat-body clearfix-->';
        } else {
            div.innerHTML = '<a class="content" href="' + file.url + '" download="' + file.name + '"><span class="fa fa-download"></span> <strong style="color:#337ab7;" class="primary-font">' + file.name + '</strong> </a><br /><iframe src="' + file.url + '" title="Descargar ' + file.name + '" style="width: 100%;border: 0;height: inherit;margin-top:1em;" class="img-rounded"></iframe> <!-- END hat-body clearfix-->';
        }
        // para la compatibilidad con versiones anteriores
        if (connection.onFileSent || connection.onFileReceived) {
            if (connection.onFileSent) {
                connection.onFileSent(file, file.uuid);
            }

            if (connection.onFileReceived) {
                connection.onFileReceived(file.name, file);
            }
        }
    };
    // actualiza el porcentaje de carga de los archivos
    function updateLabel(progress, label) {
        if (progress.position == -1) return;
        var position = +progress.position.toFixed(2).split('.')[1] || 100;
        label.innerHTML = position + '%';
    }
/* ui.users-list*/

    var numbersOfUsers = getElement('.numbers-of-users');

    numbersOfUsers.innerHTML = 0;

/* ui.settings*/
    var settingsPanel = getElement('.settings-panel');
    getElement('#settings').onclick = function() {
        settingsPanel.style.display = 'block';
    };

    getElement('#save-settings').onclick = function() {
        settingsPanel.style.display = 'none';

        if (!!getElement('#autoTranslateText').checked) {
            connection.autoTranslateText = true;
            connection.language = getElement('#language').value;
        } else connection.autoTranslateText = false;

        connection.bandwidth.audio = getElement('#audio-bandwidth').value;
        connection.bandwidth.video = getElement('#video-bandwidth').value;

        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: !!getElement('#OfferToReceiveAudio').checked,
            OfferToReceiveVideo: !!getElement('#OfferToReceiveVideo').checked,
            IceRestart: !!getElement('#IceRestart').checked
        };

        var videWidth = getElement('#video-width').value;
        var videHeight = getElement('#video-height').value;
        connection.mediaConstraints.mandatory = {
            minWidth: videWidth,
            maxWidth: videWidth,
            minHeight: videHeight,
            maxHeight: videHeight
        };

        connection.preferSCTP = !!getElement('#prefer-sctp').checked;
        connection.chunkSize = +getElement('#chunk-size').value;
        connection.chunkInterval = +getElement('#chunk-interval').value;

        window.skipRTCMultiConnectionLogs = !!getElement('#skip-connection-Logs').checked;

        //connection.selectDevices(getElement('#audio-devices').value, getElement('#video-devices').value);
        connection.maxParticipantsAllowed = getElement('#max-participants-allowed').value;
        connection.candidates = {
            relay: getElement('#prefer-stun').checked,
            reflexive: getElement('#prefer-turn').checked,
            host: getElement('#prefer-host').checked
        };

        connection.dataChannelDict = eval('(' + getElement('#dataChannelDict').value + ')');

        if (!!getElement('#fake-pee-connection').checked) {
            // RTCMultiConnection.org/docs/fakeDataChannels/
            connection.fakeDataChannels = true;
            connection.session = { };
        }
        ;
    };

    var audioDeviecs = getElement('#audio-devices');
    var videoDeviecs = getElement('#video-devices');

    connection.getDevices(function(devices) {
        for (var device in devices) {
            device = devices[device];
            appendDevice(device);
        }
    });

    function appendDevice(device) {
        var option = document.createElement('option');
        option.value = device.id;
        option.innerHTML = device.label || device.id;
        if (device.kind == 'audio') {
            audioDeviecs.appendChild(option);
        } else videoDeviecs.appendChild(option);
    }