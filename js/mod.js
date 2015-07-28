connection.onmessage = function(e) {
    appendDIV(e.data, e.userid);
    console.debug(e.userid, 'ha publicado', e.data);
    console.log('latency:', e.latency, 'ms');
};

// Se abren los datos de conexion 
connection.onopen = function() {
    if (document.getElementById('chat-input')) document.getElementById('chat-input').disabled = false;
    if (document.getElementById('file')) document.getElementById('file').disabled = false;
    if (useridBox) useridBox.disabled = false;
};

document.getElementById('file').onchange = function() {
    var file = this.files[0];
    connection.send(file);
};
var chatOutput = document.getElementById('chat-output'),
    fileProgress = document.getElementById('file-progress');
function appendDIV(data, userid, parent) {
    var div = document.createElement('div');
    if (parent) div.innerHTML = data;
    else {
        div.innerHTML = '<section class="user-id" contenteditable title="Use his user-id to send him direct messages or throw out of the room!">' + userid + '</section>'
            + '<section class="message" contenteditable>' + data + '</section>';
    }
    if (!parent) chatOutput.appendChild(div, chatOutput.firstChild);
    else fileProgress.appendChild(div, fileProgress.firstChild);
    div.tabIndex = 0;
    div.focus();
    chatInput.focus();
}
var chatInput = document.getElementById('chat-input');
var useridBox = document.getElementById('user-id');
chatInput.onkeypress = function(e) {
    if (e.keyCode !== 13 || !this.value) return;
    if (useridBox.value.length) {
        var user = connection.channels[useridBox.value];
        if (user) user.send(this.value);
        else return alert('No such user exists.');
    } else connection.send(this.value);
    appendDIV(this.value, 'Me');
    this.value = '';
    this.focus();
};
/* users presence detection */
connection.onleave = function(userid) {
    var message = 'A user whose id is ' + userid + ' left you!';
    appendDIV(message, userid);
    console.warn(message);
};
// connection.leave( userid ); --- eject a user
// connection.leave(); --- leave the room yourself!