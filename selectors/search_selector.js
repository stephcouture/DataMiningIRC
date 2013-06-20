// 
// Hide the notices selector
// 

function search_selector() {
	this.name = "search_selector";
}

search_selector.prototype.show = function () {
    return 'Search filter: <input type="text" id="search_selector" name="search_selector" value="" onkeyup="refresh_page()" /> ';
}

search_selector.prototype.restrict = function () {
	var search = $('#search_selector').val();
	if (search) {
		for (var i=0;i<the_logs.lines.length;i++) {
			if (the_logs.lines[i].text.indexOf(search)>-1) {
				the_logs.lines[i].select()
			}
			else  {	
				the_logs.lines[i].deselect()
			}
		}
	}
	else {
		this.reset();
	}
}

search_selector.prototype.reset = function () {
	
}

aselector = new search_selector();
the_selectors[aselector.name] = aselector;

