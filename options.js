apikey = document.getElementById("apikey");
server = document.getElementById("server");
role = document.getElementById("role");
savebutton = document.getElementById("save-button");

function save() {
	localStorage.apikey = apikey.value;
	localStorage.server = server.value;
	localStorage.role = role.checked;
  
	markClean();

	chrome.extension.getBackgroundPage().init();
}

function markDirty() {
	saveButton.disabled = false;
}

function markClean() {
	saveButton.disabled = true;
}


role.onclick = markDirty;
savebutton.onclick = save;


saveButton = document.getElementById("save-button");

markClean();

if (localStorage.apikey && localStorage.apikey.length > 3) {
  apikey.value = localStorage.apikey;
} else {
  apikey.value = "MyPlayerSecret"+Math.round(Math.random()*100);
}

if (localStorage.server && localStorage.server.length > 3) {
  server.value = localStorage.server;
} else {
  server.value = "http://gmusicr.herokuapp.com";
}
if (localStorage.role == "true") {
  role.checked = "true";
} 

document.oninput = function() { markDirty() };
