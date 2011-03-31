// Register the music player
chrome.extension.sendRequest({type: 'register'}, function(response) {
  // Do stuff with response
});

function simulateClick(elementId) {
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent('click', true, false,  document, 0, 0, 0, 0, 0, false, 
	  false, false, false, 0, null);
  document.getElementById(elementId).dispatchEvent(evt);
}

function isVisible(elementId) {
  return document.getElementById(elementId).style.display !== 'none';
}

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    switch(msg) {
    case 'previous':
      simulateClick('large_previous_song_button');
      break;
    case 'playpause':
      if (isVisible('pause_button')) {
        simulateClick('pause_button');
      } else {
        simulateClick('play_button');
      }
      break;
    case 'next':
      simulateClick('large_next_song_button');
      break;
    }
  });
});

