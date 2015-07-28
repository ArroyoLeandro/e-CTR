// Adaptado a Moodle por Manuel Fernando M.A
// Original work:
// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// Documentation - www.RTCMultiConnection.org

// initializing the constructor
            var connection = new RTCMultiConnection();
            // setting type of media connection
            connection.session = {
                audio: false,
                data: true,
                video: false
            };
            // some booleans to override defaults
            connection.preventSSLAutoAllowed = false;
            connection.autoReDialOnFailure = true;
            connection.setDefaultEventsForMediaElement = false;

var signalingserver = 'http://umkk099ffa00.manuelystempro.koding.io:8888/';
var mainSocket = io.connect(signalingserver);

connection.openSignalingChannel = function(config) {
    config.channel = config.channel || this.channel;
    mainSocket.emit('new-channel', {
        channel: config.channel,
        sender: connection.userid
    });
    var socket = io.connect(signalingserver + config.channel);
    socket.channel = config.channel;
    
    socket.on('connect', function() {
        if (config.callback) config.callback(socket);
    });
    socket.send = function(message) {
        socket.emit('message', {
            sender: connection.userid,
            data: message
        });
    };
    socket.on('message', config.onmessage);
};
// via https://github.com/muaz-khan/WebRTC-Experiment/tree/master/socketio-over-nodejs#presence-detection
mainSocket.on('presence', function(isChannelPresent) {
    console.log('¿Hay presencia en el Canal?', isChannelPresent);
        if (!isChannelPresent) {
            connection.open(connection.channel); // Abre la nueva sala
            console.log('Se ha abierto una nueva sala: ', connection.channel);
        } else {
            connection.join(connection.channel); // Se une a sala existente
            console.log('Se ha unido a la sala existente: ', connection.channel);
        }
    });
mainSocket.emit('presence', connection.channel);

// search for existing data channels
channel.connect();