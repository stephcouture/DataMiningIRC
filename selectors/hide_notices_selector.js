// 
// Hide the notices selector
// 

function hide_notices_selector() {
	console.log("hide_notices_selector");
	this.name = "hide_notices_selector";
}

hide_notices_selector.prototype.show = function () {
    return '<input type="checkbox" id="hide-notice" name="hide-notice" value="1" onClick="displayLogsDiv()"> Hide Notices';
}

hide_notices_selector.prototype.restrict = function () {
	
	console.log("dans hide_notices_selector.restrict")
	
	if ($('#hide-notice').is(":checked")) { 
		for (var i=0;i<the_logs.lines.length;i++) {
			if (the_logs.lines[i].type != "message")
				the_logs.lines[i].deselect();		
		}
	}
}

console.log("avant d'ajouter le hide_notices_selector");
aselector = new hide_notices_selector();
the_selectors[aselector.name] = aselector;

