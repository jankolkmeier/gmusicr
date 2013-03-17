var socket = null;

var init = function() {
  if (!localStorage.isInitialized) {
    localStorage.isInitialized = true;
    localStorage.apikey = "MyPlayerSecret"+Math.round(Math.random()*100);
    localStorage.server = "http://gmusicr.herokuapp.com";
    localStorage.role = false;
  }
  
  if (localStorage.role) {
    console.log("Acting as Player");
    console.log("Connecting to: "+localStorage.server);
    if (socket !== null) socket.disconnect();
    
    socket = io.connect(localStorage.server);
    
    socket.on('connect', function(){
      console.log("Registering with: "+localStorage.apikey);
      socket.emit('register', { id: localStorage.apikey });
    });
    
    socket.on('action', function(data, cb) {
      if (data.id !== localStorage.apikey) {
        return cb({ err: "ignoring request for id "+data.id, data: null });
      }
      
      chrome.tabs.query({ url:'https://play.google.com/music/*' }, function(tabs) {
        if (tabs.length > 0) {
          chrome.tabs.sendRequest(tabs[0].id, { 'type' : data.type }, cb);
        } else return cb({ err: "No Google Music Runnig", data: null });
      });
    });
  } else {
    console.log("Not acting as Player");
  }
}

onload = function() {
  init();
};

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  init();
});
