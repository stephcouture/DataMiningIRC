// 
// Select users
// 

function users_selector() {
	this.name = "users selector";
}

users_selector.prototype.show = function () {
	
	
	html = 'select user(s) : ';
	html += '<select id="users_selector" multiple="true" style="width:400px;" onchange="refresh_page()">';
	
	users_array = the_logs.get_user_list();
	
	// Sorting by numeric order
	var aTemp = [];
	for (var key in users_array)
		aTemp.push({user_name: key, nb:users_array[key]});
	
	aTemp.sort(function (a,b) {return a.nb < b.nb});
	
	for (var i=0;i<aTemp.length;i++) {
	    html += '<option value="'+aTemp[i].user_name+'">'+aTemp[i].user_name+' ('+aTemp[i].nb+')</option>';	
	}
	
	html += '</select>';
	html += '<script>$("#users_selector").select2({allowClear: true});</script>'
	
    return html;
}

users_selector.prototype.restrict = function () {
	
	var selected_users = $("#users_selector").val();
	
	if (!selected_users) 
		return;
	
	for (var i=0;i<the_logs.lines.length;i++) {
		if (selected_users.indexOf(the_logs.lines[i].user) == -1)
			the_logs.lines[i].deselect();		
	}    
}

users_selector.prototype.reset = function () {
	//$("#users_selector").val("");
	$("#users_selector").select2('data', null);
}

aselector = new users_selector();
the_selectors[aselector.name] = aselector;

