// 
// Hide the notices selector
// 

function hide_notices_selector() {
	console.log("hide_notices_selector");
	this.name = "hide_notices_selector";
}

hide_notices_selector.prototype.show = function () {

    return '<input type="checkbox" name="hide-notice" value="1" onClick="this.checked ? displayLogsDiv(true) : displayLogsDiv(false)"> Hide Notices';
}

console.log("avant d'ajouter le hide_notices_selector");
aselector = new hide_notices_selector();
the_selectors[aselector.name] = aselector;

