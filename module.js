// Adaptado a Moodle por Manuel Fernando M.A
// Contribucion original por:
// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// Documentation - www.RTCMultiConnection.org

M.mod_ectr = {};

M.mod_ectr.init_meeting = function(Y, signalingserver, username) {

    var user = {
    screen_name: 'maxmustermann'};
    function $(q){
      res = document.getElementById(q);
      return res;
    }

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

        var d = new Date();
        var h = addZero(d.getHours());
        var m = addZero(d.getMinutes());

        if (h > 12) {
          var H = "pm";
        } else{
          var H = "am";
        };

      setTimeout(new Date(),1000) 

    function sendMessage(msg){
      updateUI(msg);
    }

    function updateUI(data){
      var wrap = document.createElement('li');
      wrap.className = "left clearfix";
      var avatar = document.createElement('img');
      avatar.className = "imgchat img-rounded";
      var div = document.createElement('div');
      div.className = "chat-body clearfix";
      var nombre = document.createElement('strong');
      nombre.className = "primary-font";
      var small = document.createElement('small');
      small.className = "pull-right text-muted";
      var span = document.createElement('span');
      span.className = "glyphicon glyphicon-time";
      var hora = document.createTextNode(h + ":" + m + H);
      var content = document.createElement('p');
      content.className = "content";

      nombre.innerHTML = data.user.screen_name + " ";
      avatar.src = data.user.avatar;
      content.innerHTML = data.text;
      content.className = "content";
      avatar.className = "imgchat img-rounded";
      wrap.appendChild(avatar);
      wrap.appendChild(div);
      div.appendChild(nombre);
      div.appendChild(small);
      small.appendChild(span);
      span.appendChild(hora);
      div.appendChild(content);
      $('chat-list').appendChild(wrap);
      $('text').value="";
    }

    function onEnter(){
      var txt = $('text').value;
      var msg = {
        user: {
          screen_name: 'Max Mustermann',
          avatar: 'http://diggwithme.files.wordpress.com/2012/09/new-default-twitter-avatar.jpg'
        },
        text: txt
      };
      console.log(msg);
      sendMessage(msg);
      $('chat-list').scrollTo(0, $('chat-list').innerHeight);
    }

    window.onload = function(){ 
        var inp = $('text');
    inp.onkeydown = function(e) {
        if (e.keyCode == 13){
           onEnter();
        }
    };
    };
    // Inicializando el constructor
    var connection = new RTCMultiConnection();
    // conexion por firebase
    connection.firebase = false;
    // Configuracion del tipo de coneccion de medios
    connection.session = {
        data: true,
        audio: false,
        video: false
    };
    var current_user = username;
    // some booleans to override defaults
    connection.preventSSLAutoAllowed = false;
    connection.autoReDialOnFailure = true;
    connection.setDefaultEventsForMediaElement = false;

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

    // use "channel" as sessionid or use custom sessionid!
    var roomid = connection.channel;
    var channel = location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
    var websocket = new WebSocket(signalingserver);
    //var userMaxParticipantsAllowed = 8;
    //var maxParticipantsAllowed = 8;
    //var direction = 'many-to-many';

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
        tr.innerHTML = '<td>There is an active session.</td>' +
            '<td><button class="join">Join</button></td>';
        roomsList.insertBefore(tr, roomsList.firstChild);

        tr.querySelector('.join').setAttribute('data-sessionid', session.sessionid);
        tr.querySelector('.join').onclick = function() {
            this.disabled = true;

            session = sessions[this.getAttribute('data-sessionid')];
            if (!session) alert('No room to join.');

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

    connection.onmessage = function(e) {
        appendDIV(e.data);

        console.debug(e.userid, 'posted', e.data);
        console.log('latency:', e.latency, 'ms');
    };

    connection.onclose = function(e) {
        appendDIV('Data connection is closed between you and ' + e.userid);
    };

    connection.onleave = function(e) {
        appendDIV(e.userid + ' left the session.');
    };

    // on data connection gets open
    connection.onopen = function() {
        if (document.getElementById('chat-input')) document.getElementById('chat-input').disabled = false;
        if (document.getElementById('file')) document.getElementById('file').disabled = false;
        if (document.getElementById('open-new-session')) document.getElementById('open-new-session').disabled = true;
    };

    var progressHelper = { };

    connection.autoSaveToDisk = false;

    connection.onFileProgress = function(chunk) {
        var helper = progressHelper[chunk.uuid];
        helper.progress.value = chunk.currentPosition || chunk.maxChunks || helper.progress.max;
        updateLabel(helper.progress, helper.label);
    };
    connection.onFileStart = function(file) {
        var div = document.createElement('div');
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

    connection.onFileEnd = function(file) {
        progressHelper[file.uuid].div.innerHTML = '<a href="' + file.url + '" target="_blank" download="' + file.name + '">' + file.name + '</a>';
    };

    function updateLabel(progress, label) {
        if (progress.position == -1) return;
        var position = +progress.position.toFixed(2).split('.')[1] || 100;
        label.innerHTML = position + '%';
    }

    function appendDIV(div, parent) {
        if (typeof div === 'string') {
            var content = div;
            div = document.createElement('div');
            div.innerHTML = content;
        }

        if (!parent) chatOutput.insertBefore(div, chatOutput.firstChild);
        else fileProgress.insertBefore(div, fileProgress.firstChild);

        div.tabIndex = 0;
        div.focus();
    }

    var chatOutput = document.getElementById('chat-output');
    var fileProgress = document.getElementById('file-progress');

    document.getElementById('file').onchange = function() {
        connection.send(this.files[0]);
    };

    var chatInput = document.getElementById('chat-input');
    chatInput.onkeypress = function(e) {
        if (e.keyCode !== 13 || !this.value) return;

        var text = current_user + ':' + this.value;
        appendDIV(text);

        // sending text message
        connection.send(text);

        this.value = '';
    };

    connection.connect();

}