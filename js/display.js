/* 
* Controls the hiding and showing of element blocks
*/

var userState = require('./uservals/userstate.js');


module.exports = displayBlocks = {

	// Maybe place in userstate.js
	lockElements: [],  // Elements visible during pointer lock
	freeElements: [],  // Elements visible when pointer is free

	_init_: function () {

		// Used to hide and show for pointer lock
		// Elements visible during pointer lock
		displayBlocks.lockElements = [
			document.getElementsByClassName("sampler")[0],
			document.getElementsByClassName("reticule")[0]
		]

		// Elements visible when pointer is free
		displayBlocks.freeElements = [
			document.getElementsByClassName("editor-sidebar")[0],
			document.getElementsByClassName("bottombar")[0]
		]

		// intro is its own thing
		// sidebar and inventory are always visible after intro


	},  // end _init_


	/* ===================================
	   Functions
	   ==================================== */

	// --- Smaller Effects --- \\

	// Expands and collapses the first sibling of a .collapser element
	// Changes the arrow image too
	toggleCollapse: function (element) {

		var sib = element.parentNode.nextSibling;

		// Uses jquery slideToggle function for nice animation
		$(sib).slideToggle();

		// Change the arrow image and it's alt text (accessibility)
		if ( element.classList.contains("expanded") ) {

			element.classList.remove("expanded");
			element.alt = "Click to expand";

		} else {

			element.classList.add("expanded");
			element.alt = "Click to collapse";

		}

	},


	// --- Editor Blocks --- \\
	toggleEditor: function () {
		
		if (userState.editorShowing === true) {
			displayBlocks.hideEditor();
		} else {
			displayBlocks.showEditor();
		}

	},  // end toggleEditor()

	showEditor: function () {

		var lockElems = displayBlocks.lockElements;
		var freeElems = displayBlocks.freeElements;

		// Hide pointer lock
		for ( var indx = 0; indx < lockElems.length; indx++ ) {
			lockElems[indx].classList.add("collapsed");
		}
		// Show editor
		for ( var indx = 0; indx < freeElems.length ;indx++ ) {
			freeElems[indx].classList.remove("collapsed");
		}

		userState.editorShowing = true;

	},  // end showEditor()

	hideEditor: function () {

		var freeElems = displayBlocks.freeElements;
		var lockElems = displayBlocks.lockElements;

		// Hide editor
		for ( var indx = 0; indx < freeElems.length ;indx++ ) {
			freeElems[indx].classList.add("collapsed");
		}
		// Show pointer lock
		for ( var indx = 0; indx < lockElems.length; indx++ ) {
			lockElems[indx].classList.remove("collapsed");
		}

		userState.editorShowing = false;

	},  // end hideEditor()

	showInspector: function () {

		// Show inspector, hide assets
		document.getElementsByClassName( "inspector" )[0].classList.remove("collapsed");
		document.getElementsByClassName( "assets" )[0].classList.add("collapsed");

		// Change the appearence of the inspector tabs
		document.getElementsByClassName( "inspector-get" )[0].classList.add("active-tab");
		document.getElementsByClassName( "assets-get" )[0].classList.remove("active-tab");

		userState.inspectorShowing = true;

	},  // end showInspector()

	showAssets: function () {

		// Show assets, hide inspector
		document.getElementsByClassName( "assets" )[0].classList.remove("collapsed");
		document.getElementsByClassName( "inspector" )[0].classList.add("collapsed");

		// Change the appearence of the inspector tabs
		document.getElementsByClassName( "assets-get" )[0].classList.add("active-tab");
		document.getElementsByClassName( "inspector-get" )[0].classList.remove("active-tab");

		userState.inspectorShowing = false;


	},  // end showAssets()

	// // --- Sampler --- \\
	// // Sampler? Info box?
	// showSampler: function () {},  // end showSampler()

	// hideSampler: function () {},  // end hideSampler()

	// --- Code --- \\
	toggleCode: function () {
		// toggle code mirror editor
	},  // end toggleCode()

	showCode: function () {},  // end showCode()

	hideCode: function () {},  // end hideCode()

	// --- Intro --- \\
	showIntro: function () {

		// Hide everything other than the intro and canvas
		var freeElems = displayBlocks.freeElements;
		var lockElems = displayBlocks.lockElements;

		for ( var indx = 0; indx < freeElems.length ;indx++ ) {
			freeElems[indx].classList.add("collapsed");
		}

		for ( var indx = 0; indx < lockElems.length; indx++ ) {
			lockElems[indx].classList.add("collapsed");
		}

		document.getElementsByClassName( "sidebar" )[0].classList.add("collapsed");

		// show the majority with the intro in it
		document.getElementsByClassName( "intro" )[0].classList.remove("collapsed");
		// document.getElementsByClassName( "majority" )[0].classList.remove("collapsed");
		// show the sidebar


	},  // end showIntro()

	hideIntro: function () {

		// Remove the intro
		var intro = document.getElementsByClassName( "intro" )[0];
		intro.parentNode.removeChild(intro);

		// Show sidebar
		document.getElementsByClassName( "sidebar" )[0].classList.remove("collapsed");

		// Expose sampler
		displayBlocks.hideEditor();

		userState.arrival = false;

	},  // end hideIntro()


}
