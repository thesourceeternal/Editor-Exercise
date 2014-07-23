/* 
* Handles user mouse input events
* There will eventually be a lot of them
*/

var display = require('../display.js');
var userState = require('../userstate.js');


module.exports = keyEvents = function () {

	// Get in more local scope
	var hotkeys = userState.preferences.hotkeys;

	document.addEventListener( 'keyup', function () {

		var keyCode = ( 'which' in event ) ? event.which : event.keyCode;

		/* ===================================
		   UI
		   ==================================== */
		if ( keyCode === hotkeys.pointerLock[2] ) {

			// Toggle display of inspector/assests vs. object sampler
			// but not on first arrival where hideIntro() will take care of it
			if ( userState.arrival === true ) {

				// This will take care of pointer lock too
				display.hideIntro();

			} else {  // just lock the pointer

				// Keyup so it waits till after all other pointer
				// changes have been made, after toggleEditor() so arrival
				// will stay true and intro will hide properly
				display.toggleEditor();
			}

		}  // end keyCode pointerLock


		/* ===================================
		   RUNNING TESTS
		   ==================================== */
		else if ( keyCode === hotkeys.tests[2] ) {

			if (pointerLock.isLocked) {

				runTests();

			} else {  // the user may have not engaged pointerlock
				// so pointerlock tests can't run properly,
				// will give incorrect results
				console.log("Pressing 't' for tests is only " +
					"for use while pointer is locked. Using it while " +
					"pointer is unlocked may cause errors in testing.");
			}

		}  // end keyCode tests

	} );  // end document on keyup ()

};
