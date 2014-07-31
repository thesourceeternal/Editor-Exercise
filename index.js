// Starts things off

// Server stuff
var world = require('./server/worlds/cubeworld.js');
var html = require('./server/htmlBlocks.js');

// User stuff
var pointerLock = require('./js/controls/pointerlock.js');
var select = require('./js/controls/select.js');
var mouseEvents = require('./js/controls/mouseevents.js');
var keyEvents = require('./js/controls/keyevents.js');
var display = require('./js/display.js');

window.addEventListener( 'load', function () {
	console.log("PROJECT: Editor Exercise");

	/* ===================================
	    Server
	   ==================================== */

	// TODO: Need to seperate client stuff from this file
	world();

	// The editor element representations of the objects
	html._init_();


	/* ===================================
	    User/Client
	   ==================================== */

	// Get some elements for hiding and showing
	display._init_();

	// Activate axis objects
	select.initSelect();

	// Make all the pointer lock things work
	pointerLock._init_();

	// Add event listeners
	mouseEvents();
	keyEvents();

	// Start things off
	display.showIntro();

} );  // end window on load
