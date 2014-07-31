/*
* Simply contains the change between ui modes
*/

var display = require('../display.js');
// Why are the others not required? Search browserify.


module.exports = uiChange = {

	activateEditor: function () {

		display.showEditor();
		select.disableHoverSelection();

		pointerLock.unlockPointer();
		// Stop fppov controls
		cubeWorld.controls.enabled = false;

	},

	activatePointerlock: function () {

		display.hideEditor();
		select.enableHoverSelection();

		pointerLock.lockPointer();
		// Start fppov controls
		cubeWorld.controls.enabled = true;

	},

};
