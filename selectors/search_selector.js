// 
// Hide the notices selector
// 

function search_selector() {
	this.name = "search_selector";
}

search_selector.prototype.show = function () {
	var html = 'Search on msg: <input type="text" id="search_selector" name="search_selector" value="" /> ';
	html +=	'<input type="button" value="apply" onclick="refresh_page()">';
    return html;
}

search_selector.prototype.restrict = function () {
	var search = $('#search_selector').val();
	if (search) {
		for (var i=0;i<the_logs.lines.length;i++) {
			if ((the_logs.lines[i].type == "message") && (the_logs.lines[i].text.indexOf(search) == -1))
				the_logs.lines[i].deselect();
		}
	}
}

search_selector.prototype.reset = function () {
	var search = $('#search_selector').val('');
}

aselector = new search_selector();
the_selectors[aselector.name] = aselector;

