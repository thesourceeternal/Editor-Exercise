/*
* Variables representing the user, like location and
* elements displayed.
*/

module.exports = userState = {

	arrival: true,

	// --- HUD --- \\
	editorShowing: false,
	inspectorShowing: true,
	activeHud: null,  // May be sent/retrieve object data

	// --- Scene --- \\
	selectedObject: null, // Selected scene object

}
