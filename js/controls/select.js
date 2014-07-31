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

			// console.log( newObj );

			select.selectObject( newObj );

		}

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

		// Right now pointerVector is actually coords in the world
		pointerVector.set( x, y, 0.5 );
		// Now pointerVector is the mousen's screen position
		projector.unprojectVector( pointerVector, camera );
		// Now it's pointing to the middle of the world again...
		pointerVector.sub( camPosition ).normalize();

		raycaster.set( camPosition, pointerVector );

		return raycaster.intersectObjects( cubeWorld.scene.children );

	},  // end pointerIntersectors()

	// Sets selected object and shows its axes
	// axes showing may need to happen in a view related script
	selectObject: function ( newObject ) {

		var oldObject = userState.selectedObj;
		// console.log("oldObject:");
		// console.log(oldObject);
		// console.log( "newObject" );
		// console.log( newObject )
		// console.log(select.axes)

		if ( oldObject !== undefined ) {

			select.axes.detach( oldObject );

		}

		userState.selectedObj = newObject;

		if ( newObject !== undefined ) {

			select.axes.attach( newObject );

		}

	},  // end selectObject()

};
