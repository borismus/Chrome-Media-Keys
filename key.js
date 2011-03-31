// Gets injected into all pages for capturing keyboard events.
// TODO: find a good solution for when there's no page focus

// Get keyboard shortcuts for various events on startup.
var previous = {keyCode: 117};
var playpause = {keyCode: 118};
var next = {keyCode: 119};

chrome.extension.sendRequest({type: 'key'}, function(response) {
	previous = response.previous;
	playpause = response.playpause;
	next = response.next;
});

window.onkeydown = function(event) {
  var command = null;
  if (eventKeyMatch(event, previous)) {
    command = 'previous';
  } else if (eventKeyMatch(event, playpause)) {
    command = 'playpause';
  } else if (eventKeyMatch(event, next)) {
    command = 'next';
  }
  if (command !== null) {
    var request = {type: 'command', command: command};
    // Send message to music player
    chrome.extension.sendRequest(request, function(response) {
      // Do stuff on successful response
    });
  }
};

function eventKeyMatch(event, key) {
  // Returns true iff the event matches the given key
  return event.keyCode == key.keyCode &&
         event.altKey == key.altKey &&
         event.ctrlKey == key.ctrlKey &&
         event.shiftKey == key.shiftKey;
}
