/*
* Handles object selection and selectability
*/

var cubeWorld = require('../../server/worlds/cubeworld.js');
var transforms = require('./TransformControls.js');


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

};
