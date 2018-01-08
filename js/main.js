'use strict';

// Stream: an abstract interface for working with streaming data in Node.js
// MediaStream: interface represents a stream of media content. 
// MediaStreamTrack: interface represents a single media track within a stream

var errorElement = document.querySelector('#errorMsg');
var video = document.querySelector('video');

var constraints = window.constraints = {
	audio: false,
	video: true
};

//navigator.mediaDevices.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
function handleSuccess(stream){
	// MediaStream.getVideoTracks(): returns a list of MediaStreamTrack object stored in the MediaStream object that have their kind attribute set to "Video"
	var videoTracks = stream.getVideoTracks();
	
	console.log('Got stream with constraints:', constraints);
	console.log('Using Video Device: ' + videoTracks[0].label);
	
	stream.oninactive = function() {
		console.log('Stream INACTIVE');
	};
	
	window.stream = stream;
	video.srcObject = stream;
}

function handleError(error){
	if(error.name === 'ConstraintNotSatisfiedError') {
		errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
				constraints.video.width.exact + ' px is not supported by your device.');
	}
	else if (error.name === 'PermissionDeniedError'){
		errorMsg('Permissions have not been granted to use your camera and ' +
				'microphone, you need to allow the the devices');
	}
	errorMsg('GetUserMedia error: ' + error.name, error);
}

function errorMsg(msg, error) {
	errorElement.innerHTML += '<p>' + msg + '</p>';
	if (typeof error !== 'undefined'){
		console.error(error);
	}
}

navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);



