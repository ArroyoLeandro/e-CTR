var user = {
  screen_name: 'maxmustermann'};
function $(q){
  res = document.getElementById(q);
  return res;
}

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
  var hora = document.createTextNode(gH + new Date().getHours() + ":"+ gM + new Date().getMinutes() + " " + H);
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
  small.appendChild(hora);
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