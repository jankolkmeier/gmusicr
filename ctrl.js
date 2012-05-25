console.log("GMusicR loaded...");

function onRequest(request, sender, cb) {
  if (request.type === 'info') {
    info_action(cb);
  } else {
    playback_action(request.type, cb);
  }
}

function dispatchMouseEvent(target, var_args) {
  var e = document.createEvent("MouseEvents");
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
    if (hasClass(element, "goog-flat-button-disabled")) {
      // This should be working, but it isn't...
      element = document.getElementById('start_shuffle_all');
    }
	} else if (type == 'next') {
		element = document.getElementById('ff');
	} else if (type == 'prev') {
		element = document.getElementById('rew');
	} else if (type == 'thumbsup') {
		element = document.getElementById('thumbsUpPlayer');
	} else if (type == 'thumbsdown') {
		element = document.getElementById('thumbsDownPlayer');
	} else {
    return cb({ err: "unknown action: "+type, data:null });
  }
  
	dispatchMouseEvent(element, 'mouseover', true, true);
	dispatchMouseEvent(element, 'mousedown', true, true);
	dispatchMouseEvent(element, 'mouseup', true, true);
  
  setTimeout(function() {
    info_action(cb);
  }, 1000);
}

function info_action(cb) {
  var artist, title, thumbsup, thumbsdown, isPlaying, albumArt;
  var checkedClass = 'goog-flat-button-checked';
  
  try {
    artist = document.getElementById('playerArtist').innerText;
    title = document.getElementById('playerSongTitle').innerText;
  } catch (err) {
    return cb({ err: "Player Not Active", data:null });
  }
  
  try {
    thumbsup = hasClass(document.getElementById('thumbsUpPlayer'), checkedClass);
    thumbsdown = hasClass(document.getElementById('thumbsDownPlayer'), checkedClass);
    isPlaying = document.getElementById('playPause').getAttribute('title') === "Pause";
    albumArt = document.getElementById('playingAlbumArt').getAttribute('src');
  } catch (err) {
    return cb({ err: "Unable to fetch information: "+err, data:null });
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