function callAction(action, cb) {
  var xhr = new XMLHttpRequest();
  var location = localStorage.server;
  location += '/ctrl/'+localStorage.apikey+'/'+action
  xhr.open("GET", location, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      console.log(xhr.responseText);
      var resp = JSON.parse(xhr.responseText);
      cb(resp);
    }
  }
  xhr.send();
}

function setInfo(data) {
  console.log(data);
  if (data.err) return console.log("ERROR: "+data.err);
  else data = data.data;
  $('#block').css('background-image', 'url("http:'+data.albumArt+'")');
  $('#title').html(data.title);
  $('#subtitle').html(data.artist);
  var tc = 'active';
  $('#thumbsup').toggleClass(tc, data.thumbsup);
  $('#thumbsdown').toggleClass(tc, data.thumbsdown);
  $('#toggle').toggleClass(tc, !data.isPlaying);
}

function refresh() {
  callAction('info', setInfo);
}

$(document).ready(function() {
  //setInterval(refresh, 7000);
  refresh();
  $('#ctrls button').click(function() {
    var elem = $(this);
    elem.attr('disabled', 'disabled');
    callAction(elem.attr('id'), function(data) {
      setInfo(data);
      elem.removeAttr('disabled');
    });
  });
});