// Adaptado a Moodle por Manuel Fernando M.A
// Contribucion original por:
// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// Documentation - www.RTCMultiConnection.org

M.mod_ectr = {};

M.mod_ectr.init_meeting = function(Y, signalingserver, username) {

    // Inicializando el constructor
    var connection = new RTCMultiConnection();
    // conexion por firebase
    connection.firebase = false;
    // Configuracion del tipo de conección de medios
    connection.session = {
        data: true,
        audio: false,
        video: false
    };
    // datos extra para compartir el nombre completo
    connection.extra = {
        fullname: current_user,
        imgPerfil: avatar,
        email: 'correo@correo.com'
    };
    // Capturo el usuario de la sesion
    var current_user = username;
    // Capturo foto de perfil usuario
    var avatar = avatarjs;
    // Establecer algunos valores predeterminados
    connection.preventSSLAutoAllowed = false;
    connection.autoReDialOnFailure = true;
    connection.setDefaultEventsForMediaElement = false;
    //var userMaxParticipantsAllowed = 8;
    //var maxParticipantsAllowed = 8;
    var direction = 'many-to-many';
    connection.direction = 'one-to-many';

    connection.openSignalingChannel = function(config) {

        var channel = location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
        var websocket = new WebSocket(signalingserver);
        websocket.channel = channel;

        websocket.onopen = function () {
                websocket.push(JSON.stringify({
                        open: true,
                        channel: channel
                }));
                if (config.callback) {
                    config.callback(websocket);
                }

        };
        websocket.onmessage = function(event) {
            config.onmessage(JSON.parse(event.data));
        };
        websocket.push = websocket.send;
        websocket.send = function (data) {
                if (websocket.readyState != 1) {
                        return setTimeout(function() {
                                websocket.send(data);
                        }, 300);
                }

                websocket.push(JSON.stringify({
                        data: data,
                        channel: channel
                }));
        };
        return websocket;
    };

    // use "channel" como sessionid para usar sessionid personalizado!
    var roomid = connection.channel;
    var channel = location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
    var websocket = new WebSocket(signalingserver);
    // Usuarios conectados (Peers)
    connection.onconnected = function(e) {
        console.log('Numero de usuarios conectados: ', connection.numberOfConnectedUsers + 1);

        var arrayOfAllConnectedUsers = [];
        for (var userid in connection.peers) {
            console.debug(userid, 'esta conectado.');
            arrayOfAllConnectedUsers.push(userid);

        }
        // console.info('Arreglo de todos los usuarios conectados: ', arrayOfAllConnectedUsers);
        // establezco el bucle que pasa a traves de los items en el arreglo
        var numberOfListItems = arrayOfAllConnectedUsers.length;
        for (var i = 0; i < numberOfListItems; ++i) {
            // creamos <li> para cada uno
            var listItem = document.createElement('li');
            listItem.className = "list-group-item";
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
            // imagen predeterminada
            var imgDefault = 'pix/foto-perfil.jpg';
            imgPerfil.setAttribute('src', imgDefault);
            // al conectarse ocultar mensaje
            document.getElementById('listWarning').setAttribute('hidden','')
            // numero de usuarios conectados
            badge.innerHTML = numberOfConnectedUsers = connection.numberOfConnectedUsers + 1;

        }
    };

    websocket.onmessage = function (event) {
        var data = JSON.parse(event.data);

        if (data.isChannelPresent == false) {
            connection.open(); // Abre la nueva sala
            console.log('Se ha abierto una nueva sala: ', connection.channel);
        } else {
            connection.join(roomid); // Se une a sala existente
            console.log('Se ha unido a la sala existente: ', connection.channel);
        }
    };
    
    websocket.onopen = function () {
        websocket.send(JSON.stringify({
            checkPresence: true,
            channel: roomid
        }));
    };


    var roomsList = document.getElementById('rooms-list'), sessions = { };
    connection.onNewSession = function(session) {
        if (sessions[session.sessionid]) return;
        sessions[session.sessionid] = session;

        var tr = document.createElement('tr');
        tr.innerHTML = '<td>Hay una sesión activa.</td>' +
            '<td><button class="join">Unirse</button></td>';
        roomsList.insertBefore(tr, roomsList.firstChild);

        tr.querySelector('.join').setAttribute('data-sessionid', session.sessionid);
        tr.querySelector('.join').onclick = function() {
            this.disabled = true;

            session = sessions[this.getAttribute('data-sessionid')];
            if (!session) alert('No hay una sala para unirse.');

            connection.join(session);
        };
    };

    var videosContainer = document.getElementById('videos-container') || document.body;
    connection.onstream = function(e) {
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

        videosContainer.insertBefore(mediaElement, videosContainer.firstChild);

        if (e.type == 'local') {
            mediaElement.media.muted = true;
            mediaElement.media.volume = 0;
        }
    };

    connection.onstreamended = function(e) {
        if (e.mediaElement.parentNode && e.mediaElement.parentNode.parentNode && e.mediaElement.parentNode.parentNode.parentNode) {
            e.mediaElement.parentNode.parentNode.parentNode.removeChild(e.mediaElement.parentNode.parentNode);
        }
    };

    var setupNewSession = document.getElementById('setup-new-session');

    setupNewSession.onclick = function() {
        setupNewSession.disabled = true;

        var direction = document.getElementById('direction').value;
        var _session = document.getElementById('session').value;
        var splittedSession = _session.split('+');

        var session = { };
        for (var i = 0; i < splittedSession.length; i++) {
            session[splittedSession[i]] = true;
        }

        var maxParticipantsAllowed = 256;

        if (direction == 'one-to-one') maxParticipantsAllowed = 1;
        if (direction == 'one-to-many') session.broadcast = true;
        if (direction == 'one-way') session.oneway = true;

        connection.extra = {
            'session-name': 'Anonymous'
        };

        connection.session = session;
        connection.maxParticipantsAllowed = maxParticipantsAllowed;

        connection.sessionid = 'Anonymous';
        connection.open();
    };
    // www.RTCMultiConnection.org/docs/onmessage/
    connection.onmessage = function(e) {
        appendDIV(e.data);

        console.debug(e.userid, 'posted', e.data);
        console.log('latency:', e.latency, 'ms');
    };
    // www.RTCMultiConnection.org/docs/onclose/
    connection.onclose = function(e) {
        var userData = e.extra;
        appendAlertWarning('La conexión de datos se ha cerrado entre usted y ' + userData.fullname + ' (' + e.userid +')');
    };
    // www.RTCMultiConnection.org/docs/onleave/
    connection.onleave = function(e) {
        var userData = e.extra;
        appendAlertWarning(userData.fullname + ' (' + e.userid + ') ha abandonado el chat!');
    };  
    // www.RTCMultiConnection.org/docs/onopen/
    // Los datos de conexion se abren
    connection.onopen = function(e) {
        var userData = e.extra;
        appendAlertSuccess(userData.fullname + ' (' + e.userid + ') se ha conectado al chat! ');
        if (document.getElementById('chat-input')) document.getElementById('chat-input').disabled = false;
        if (document.getElementById('file')) document.getElementById('file').disabled = false;
        if (document.getElementById('open-new-session')) document.getElementById('open-new-session').disabled = true;
    };
    // www.RTCMultiConnection.org/docs/onstatechange/
    // snippet recomendado por @muaz Khan para: "Session-rechecking... Descriptions not found"
    connection.onstatechange = function(state) {
    if(state.name === 'room-not-available') {
            connection.open(); // si el local no esta disponible, abrirla.
        }
    }; 

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
        var div = document.createElement('li');
        div.className = "left clearfix";
        div.title = file.name;
        div.innerHTML = '<label>0%</label> <progress></progress>';
        appendDIV(div, fileProgress);
        progressHelper[file.uuid] = {
            div: div,
            progress: div.querySelector('progress'),
            label: div.querySelector('label')
        };
        progressHelper[file.uuid].progress.max = file.maxChunks;
    };
    // www.RTCMultiConnection.org/docs/onFileEnd/
    connection.onFileEnd = function(file) {
        var helper = progressHelper[file.uuid];
        if (!helper) {
            console.error('No existe tal elemento del asistente de progreso.', file);
            return;
        }

        if (file.remoteUserId) {
            helper = progressHelper[file.uuid][file.remoteUserId];
            if (!helper) {
                return;
            }
        }
        // conversor de hora a hora 10:45 pm
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();

        if (d.getHours() < 10) {
          gH = "0";
        } else {
          gH = "";
        }

        if (d.getMinutes() < 10) {
          gM = "0";
        } else {
          gM = "";
        }

        if (h <= 12) {
        var H = "am";
        } else{
          var H = "pm";
        };
        // Variables de configuracion DataChannel
        var avatar = avatarjs;
        var chatBody = '<div class="chat-body clearfix">';
        var nombre ='<strong class="primary-font">'+ current_user +'</strong>'; 
        var hora = '<small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>'+ gH + new Date().getHours() + ":"+ gM + new Date().getMinutes() + " " + H + '</small>';

        var div = helper.div;
        if (file.type.indexOf('image') != -1) {
            div.innerHTML = avatar + chatBody + nombre + hora + '<br /><a class="content" href="' + file.url + '" download="' + file.name + '"><strong style="color:#337ab7;" class="primary-font">' + file.name + '</strong> <br /><img src="' + file.url + '" data-toggle="tooltip" data-placement="top" title="Clic para descargar: ' + file.name + '" style="max-width: 100%; padding-top: 5px;" class="img-rounded"></a></div> <!-- END hat-body clearfix-->';
        } else {
            div.innerHTML = avatar + chatBody + nombre + hora + '<br /><a class="content" href="' + file.url + '" download="' + file.name + '"><strong style="color:#337ab7;" class="primary-font">' + file.name + '</strong> <br /><iframe src="' + file.url + '" data-toggle="tooltip" data-placement="top" title="Clic para descargar: ' + file.name + '" style="width: 100%;border: 0;height: inherit;margin-top:1em;" class="img-rounded"></iframe></a></div> <!-- END hat-body clearfix-->';
        }
        // configuracion scroll chat-body image
        $("#panel-body").animate({scrollTop : $("#panel-body")[0].scrollHeight},650);

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

    function updateLabel(progress, label) {
        if (progress.position == -1) return;
        var position = +progress.position.toFixed(2).split('.')[1] || 100;
        label.innerHTML = position + '%';
    }
    // Abriendo elementos basicos de la conversacion <li>
    function appendDIV(div, parent) {
        if (typeof div === 'string') {
            var content = div;
            var div = document.createElement('li');
            div.className = "left clearfix";
            div.innerHTML = content;
            // configuracion scroll chat-body text
            $("#panel-body").animate({scrollTop : $("#panel-body")[0].scrollHeight},650);
        }

        if (!parent) chatOutput.appendChild(div, chatOutput.firstChild);
        else fileProgress.appendChild(div, fileProgress.firstChild);

        // div.tabIndex = 0;
        div.focus();
    }
    // cuando un usuario se conecta al chat
    function appendAlertSuccess(li, parent) {
        if (typeof li === 'string') {
            var content = li;
            var li = document.createElement('li');
            li.className = "alert alert-success text-center clearfix";
            li.innerHTML = content;
            // configuracion scroll chat-body text
            $("#panel-body").animate({scrollTop : $("#panel-body")[0].scrollHeight},650);
        }

        if (!parent) chatOutput.appendChild(li, chatOutput.firstChild);
        else fileProgress.appendChild(li, fileProgress.firstChild);

        // li.tabIndex = 0;
        li.focus();
    }
    // cuando un usuario se desconecta del chat
    function appendAlertWarning(li, parent) {
        if (typeof li === 'string') {
            var content = li;
            var li = document.createElement('li');
            li.className = "alert alert-warning text-center clearfix";
            li.innerHTML = content;
            // configuracion scroll chat-body text
            $("#panel-body").animate({scrollTop : $("#panel-body")[0].scrollHeight},650);
        }

        if (!parent) chatOutput.appendChild(li, chatOutput.firstChild);
        else fileProgress.appendChild(li, fileProgress.firstChild);

        // li.tabIndex = 0;
        li.focus();
    }
    // Detectar si WebRTC es soportado o detectado por el navegador
    detectWebRTC = function () {
        if (webrtcDetectedBrowser == null) {
            console.log('Su navegador no Soporta WebRTC!.');
            $('.browser-warning').show();
        }
    }

    // variables
    var chatOutput = document.getElementById('chat-output');
    var fileProgress = document.getElementById('file-progress');

    document.getElementById('file').onchange = function() {
        connection.send(this.files[0]);
    };
    // cuando se pulsa Enter como abreviacion para el envio de los mensajes
    var chatInput = document.getElementById('chat-input');
    chatInput.onkeydown = function(e) {
        // jQuery-CSSEmoticons
        $('.comment').emoticonize();
        if (e.keyCode !== 13 || !this.value) return;       
        // conversor de hora a hora 10:45 pm
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();

        if (d.getHours() < 10) {
          gH = "0";
        } else {
          gH = "";
        }

        if (d.getMinutes() < 10) {
          gM = "0";
        } else {
          gM = "";
        }

        if (h <= 12) {
        var H = "am";
        } else{
          var H = "pm";
        };
        // Variables de configuracion DataChat
        var avatar = avatarjs;
        var chatBody = '<div class="chat-body clearfix">';
        var nombre ='<strong class="primary-font">'+ current_user +'</strong>'; 
        var hora = '<small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>'+ gH + new Date().getHours() + ":"+ gM + new Date().getMinutes() + " " + H + '</small>';
        var text = avatar + chatBody + nombre + hora + '<p class="content comment">' + this.value + '</p></div> <!-- END hat-body clearfix-->';
        appendDIV(text);

        // enviando los datos del mensaje
        connection.send(text);
        // jQuery-CSSEmoticons
        $('.comment').emoticonize();
        this.value = '';
        
    };

    connection.connect();

}