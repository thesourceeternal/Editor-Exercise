/*
* Handles object selection and selectability
*/

var world = require('../../server/worlds/cubeworld.js');
var transforms = require('./TransformControls.js');
var userState = require('../uservals/userstate.js');


module.exports = select = {

	// Currently selected object is in userstate.js
	// just so there's one central place to get it from

	axes: null,

	// Add axes to scene, access functions of axes types
	initSelect: function () {

		var renderer = world.renderer,
			camera = world.camera,
			scene = world.scene;

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
	selctionHandler: function ( event ) {

		// Potential new selected object
		var newObj = select.firstIntersect(event);
		// If it's a different object then before, select it
		if ( newObj !== userState.selectedObject ) {

			select.selectObject( newObj );

		}

	},  // end selctionHandler()

	// Picks the object closest to the center view of the camera
	firstIntersect: function ( event ) {

		console.log("I'm the closest intersected object!");

	},  // end firstIntersect()

	// Sets selected object and shows its axes
	// axes showing may need to happen in a view related script
	selectObject: function ( object ) {

		console.log("I've selected a new object!");

	}

};
