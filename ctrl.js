function onRequest(request, sender, cb) {
  if (request.action === 'playback_action') {
    playback_action(request.type, cb);
  } else if (request.action === 'info_action') {
    info_action(cb);
  }
}



function dispatchMouseEvent(target, var_args) {
  var e = document.createEvent("MouseEvents");
  // If you need clientX, clientY, etc., you can call
  // initMouseEvent instead of initEvent
  e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
};
function hasClass(element, cls) {
    var r = new RegExp('\\b' + cls + '\\b');
    return r.test(element.className);
}

function playback_action(type, cb) {
	if (type == 'toggle') {
		element = document.getElementById('playPause');
	} else if (type == 'next') {
		element = document.getElementById('ff');
	} else if (type == 'prev') {
		element = document.getElementById('rew');
	} else if (type == 'thumbsup') {
		element = document.getElementById('thumbsUpPlayer');
	} else if (type == 'thumbsdown') {
		element = document.getElementById('thumbsDownPlayer');
	} else {
    return cb();
  }
  
	dispatchMouseEvent(element, 'mouseover', true, true);
	dispatchMouseEvent(element, 'mousedown', true, true);
	dispatchMouseEvent(element, 'mouseup', true, true);
	cb();
}

function info_action(cb) {
  var artist, title, thumbsup, thumbsdown, isPlaying, albumArt;
  var checkedClass = 'goog-flat-button-checked';
  try {
    artist = document.getElementById('playerArtist').innerText;
    title = document.getElementById('playerSongTitle').innerText;
    thumbsup = hasClass(document.getElementById('thumbsUpPlayer'), checkedClass);
    thumbsdown = hasClass(document.getElementById('thumbsDownPlayer'), checkedClass);
    isPlaying = document.getElementById('playPause').getAttribute('title') === "Pause";
    albumArt = document.getElementById('playingAlbumArt').getAttribute('src');
  } catch (err) {
    console.log(err);
    return cb(true);
  }
  
  var data =  {
    "artist": artist,
    "title": title,
    "thumbsup": thumbsup,
    "thumbsdown": thumbsdown,
    "isPlaying": isPlaying,
    "albumArt": albumArt
  }
  
  cb({ data: data, err: false });
}

chrome.extension.onRequest.addListener(onRequest);