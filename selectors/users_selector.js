// 
// Select users
// 

function users_selector() {
	console.log("users selector");
	this.name = "users selector";
}

users_selector.prototype.show = function () {
	
	html = 'select user : ';
	html += '<select id="users_selector" onchange="displayLogsDiv()";>';
	html += '<option value=""> </option>'
	
	users_array = the_logs.get_user_list();
	
	// Sorting by numeric order
	var aTemp = [];
	for (var key in users_array)
		aTemp.push({user_name: key, nb:users_array[key]});
	
	aTemp.sort(function (a,b) {return a.nb < b.nb});
	console.log(aTemp);
	
	for (var i=0;i<aTemp.length;i++) {
	    html += '<option value="'+aTemp[i].user_name+'">'+aTemp[i].user_name+' ('+aTemp[i].nb+')</option>';	
	}
	
	html += '</select>';
	
    return html;
}

users_selector.prototype.restrict = function () {
	
	var user_selector = $("#users_selector").val();
	
	if (!user_selector) 
		return;
	
	for (var i=0;i<the_logs.lines.length;i++) {
		if (the_logs.lines[i].user != user_selector)
			the_logs.lines[i].deselect();		
	}    
}

users_selector.prototype.reset = function () {
	$("#users_selector").val("");
}

console.log("avant d'ajouter le selector");
aselector = new users_selector();
the_selectors[aselector.name] = aselector;

