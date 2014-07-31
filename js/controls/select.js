/*
* Handles object selection and selectability
*/

var cubeWorld = require('../../server/worlds/cubeworld.js');
var transforms = require('./TransformControls.js');
var userState = require('../uservals/userstate.js');


module.exports = select = {

	// Currently selected object is in userstate.js

	axes: null,

	// Add axes to scene, access functions of axes types
	initSelect: function () {

		var renderer = cubeWorld.renderer,
			camera = cubeWorld.camera,
			scene = cubeWorld.scene;

		// Set up all the prototypes and transform objects
		transforms();

		// Make transform functions and data available
		// If we use canvas, selection won't work correctly during pointer lock
		var axes = select.axes = new THREE.TransformControls( camera, document.body );

		// Start out with translate
		axes.setMode("translate");

		scene.add(axes);

	},


	// --- Enablers --- \\

	// Called in display.js
	// Hovering will select objects to get show info
	enableHoverSelection: function () {
		// Has to be mousedown for selection lock to work
		document.removeEventListener("mousedown", select.selctionHandler, false);
		document.addEventListener('mousemove', select.selctionHandler, false);

	},  // end enableHoverSelection()

	// Called in display.js
	// Clicking will select objects
	disableHoverSelection: function () {
		// Has to be mousedown for selection lock to work
		document.removeEventListener('mousemove', select.selctionHandler, false);
		document.addEventListener("mousedown", select.selctionHandler, false);

	},  // end disableHoverSelection()


	// --- Selection --- \\

	// Determines and, if needed sets, the object currently being selected
	selctionHandler: function (event) {

		console.log("In selectionHandler()");

	},  // end selctionHandler()

};
