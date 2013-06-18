// 
// Hide the notices selector
// 

function hide_notices_selector() {
	this.name = "hide_notices_selector";
}

hide_notices_selector.prototype.show = function () {
    return '<input type="checkbox" id="hide-notice" name="hide-notice" value="1" onClick="refresh_page()"> Hide Notices';
}

hide_notices_selector.prototype.restrict = function () {
	
	if ($('#hide-notice').is(":checked")) { 
		for (var i=0;i<the_logs.lines.length;i++) {
			if (the_logs.lines[i].type != "message")
				the_logs.lines[i].deselect();		
		}
	}
}

hide_notices_selector.prototype.reset = function () {
	$('#hide-notice').attr('checked', false);
}

aselector = new hide_notices_selector();
the_selectors[aselector.name] = aselector;

