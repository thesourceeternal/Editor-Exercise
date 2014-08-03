/*
* Handles object selection and selectability
*/

var world = require('../../server/worlds/cubeworld.js');
var transforms = require('./TransformControls.js');
var userState = require('../uservals/userstate.js');


'use strict'

module.exports = select = {

	// Currently selected object is in userstate.js
	// just so there's one central place to get it from

	axes: null,

	locked: false,

	// For getting intersections
	projector: new THREE.Projector(),
	raycaster: new THREE.Raycaster(),
	pointerVector: new THREE.Vector3(),
	camPosition: new THREE.Vector3(),

	// Add axes to scene, access functions of axes types
	initSelect: function () {

		var renderer = world.renderer,
			camera = world.camera,
			scene = world.scene;

		// Set up all the prototypes and transform objects
		transforms();

		// Make transform functions and data available
		var axes = select.axes = new THREE.TransformControls( camera, renderer.domElement );

		// Start out with translate
		axes.setMode("translate");

		scene.add(axes);

	},


	// --- Enablers --- \\

	lockSelection: function () { select.locked = true; },

	unlockSelection: function () { select.locked = false; },

	// Hovering will select objects to get show info
	enableHoverSelection: function () {
		// Has to be mousedown for selection lock to work
		document.removeEventListener("mousedown", select.selctionHandler, false);
		document.addEventListener('mousemove', select.selctionHandler, false);

		// Only lock on mousedown when hovering
		document.addEventListener("mousedown", select.lockSelection, false);
		document.addEventListener("mouseup", select.unlockSelection, false);

	},  // end enableHoverSelection()

	// Clicking will select objects
	disableHoverSelection: function () {
		// Has to be mousedown for selection lock to work
		document.removeEventListener('mousemove', select.selctionHandler, false);
		document.addEventListener("mousedown", select.selctionHandler, false);

		// Selection locking mechanism would interfere when pointer is free
		document.removeEventListener("mousedown", select.lockSelection, false);
		document.removeEventListener("mouseup", select.unlockSelection, false);

		// Make absolutely sure user can select objects while in editor
		select.locked = false;

	},  // end disableHoverSelection()


	// --- Selection --- \\

	// Determines and, if needed sets, the object currently being selected
	selctionHandler: function ( event ) {

		if ( !select.locked ) {

			// Potential new selected object
			var newObj = select.firstIntersect(event);

			// If it's a different object then before, select it
			if ( newObj !== userState.selectedObj ) {

				select.selectObject( newObj );

			}

		}  // end if !select.locked

	},  // end selctionHandler()

	// Returns the object closest to the pointer
	firstIntersect: function ( event ) {

		var intersectors = select.pointerIntersectors(event);

		if ( intersectors[0] !== undefined ) {

			return intersectors[0].object;

		} else {

			return undefined;

		}

	},  // end firstIntersect()

	// Returns a list of the objects intersected by the pointer
	// TODO: Explore only testing visible objects
	pointerIntersectors: function ( event ) {

		var raycaster = select.raycaster,
			projector = select.projector,
			pointerVector = select.pointerVector;

		var camera = cubeWorld.camera;

		var camPosition = select.camPosition;
		camPosition.setFromMatrixPosition( camera.matrixWorld );

		// Will be pointer coords
		var x, y;

		// When pointer is free, need to get it's position realtive to canvas
		if ( userState.editorShowing ) {

			var element = cubeWorld.renderer.domElement;
			var rect = element.getBoundingClientRect();

			x = (( event.clientX - rect.left ) / rect.width) * 2 - 1;
			y = -(( event.clientY - rect.top ) / rect.height) * 2 + 1;

		} else {
			// When pointer is locked, pointer always at center
			x = 0, y = 0;

		}

		pointerVector.set( x, y, 0.5 );
		projector.unprojectVector( pointerVector, camera );

		pointerVector.sub( camPosition ).normalize();
		raycaster.set( camPosition, pointerVector );

		return raycaster.intersectObjects( cubeWorld.scene.children );

	},  // end pointerIntersectors()

	// Sets selected object and shows its axes
	// axes showing may need to happen in a view related script
	selectObject: function ( newObject ) {

		var oldObject = userState.selectedObj;

		if ( oldObject !== undefined ) {

			select.axes.detach( oldObject );

		}

		userState.selectedObj = newObject;

		if ( newObject !== undefined ) {

			select.axes.attach( newObject );

		}

	},  // end selectObject()

};
