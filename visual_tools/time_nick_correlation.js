// 
// Time nick correlation tool
// 

function time_nick_correlation() {
	this.name = "time nick correlation";
	
}

time_nick_correlation.prototype.get_users_table = function () {
	
	if (!this.users_array) {
		var users_array = [];
		
		// Construct a table
		for (var i=0;i<the_logs.lines.length;i++) {
			aline = the_logs.lines[i];
			if (aline.selected) {
				if (!users_array[aline.user]) {			
					// Initialize the array
					users_array[aline.user] = {hours : [], total : []};
					users_array[aline.user].total["message"] = 0;
					users_array[aline.user].total["join"] = 0;
					users_array[aline.user].total["quit"] = 0;
					for (var h=0;h<24;h++) {
						users_array[aline.user].hours[h] = [];
						users_array[aline.user].hours[h]["message"] = 0;
						users_array[aline.user].hours[h]["join"] = 0;
						users_array[aline.user].hours[h]["quit"] = 0;
					}
				}
				
				console.log("ligne "+i+":"+aline.user+"type : "+aline.type+" nb :"+users_array[aline.user].hours[aline.time.getHours()][aline.type]);
				users_array[aline.user].hours[aline.time.getHours()][aline.type]++;
				users_array[aline.user].total[aline.type]++;
			}
		}
	
	this.users_array = users_array;
	}
	
	return this.users_array;
}

time_nick_correlation.prototype.show = function () {
	       
	users_array = this.get_users_table();
	console.log(users_array);
	
	// 
	// first sort the array
	var aTemp = [];
	for (var user in users_array)
		aTemp.push({user_name: user, data:users_array[user]});
	
	var sortfunc;
	if ($('#time_nick_sortby').length && $('#time_nick_sortby').val() != "user name") {// if the controller exist and its not username;
		sortfunc = function (a,b) {return a.data.total[$('#time_nick_sortby').val()] < b.data.total[$('#time_nick_sortby').val()] };
	}
	else {
		console.log("avant sortfunc user_name");
		sortfunc = function(a,b) {return a.user_name > b.user_name};
	}
		
	aTemp.sort(sortfunc);
	
	//
	// Display the table
	var html = '<div class ="time_nick_tool">Legend : <span class = "time_nick_join">join</span> <span class = "time_nick_message">message</span>  ';

	// Select sort
	// var val = $('#time_nick_sortby').length ? $('#time_nick_sortby').val() : "user name";  // this could be cleaner
	html += 'Sort by : <select id="time_nick_sortby" onchange="time_nick_correlation_sort_trigger()">';
	html += '<option>user name</option><option>message</option><option>join</option><option>quit</option></select>  ';
	
	// Frequency
	// html += 'Frequency : <select id="time_nick_frequency" onchange="">';
	// html += '<option>hour</option><option>30 minutes</option><option>15 minutes</option></select><p>';

	// Display the table
	html += '<table style = "border:1px solid"><thead>';
	html += '<tr style = "border:1px solid"><td style="border:1px solid">user name</td>';
	for (var i=0;i<24;i++) {
		html += '<td style = "border:1px solid">'+i+'</td>';
	}
	html += '<td>total</td></tr></thead><tbody>';
	
	for (var u=0;u<aTemp.length;u++) {
		auser = aTemp[u].user_name;
		html += '<tr style = "border:1px solid"><td style = "border:1px solid">'+auser+'</td>';
		for (var i=0;i<24;i++) {
			html += '<td style="border:1px solid">&nbsp;';
			if  (users_array[auser].hours[i]["join"])
				html += '<span class = "time_nick_join">'+users_array[auser].hours[i]["join"]+'</span>';
			if  (users_array[auser].hours[i]["message"])
				html += '<span class = "time_nick_message">'+users_array[auser].hours[i]["message"]+'</span>';
			html += '</td>';
		}
		html += '<td style="border:1px solid">';
		html += '<span class = "time_nick_message">'+users_array[auser].total["message"]+'</span>';
		html += '<span class = "time_nick_join">'+users_array[auser].total["join"]+'</span>';
		html += '</td></tr>';
	}
	
	
	html+='</tbody></table></div>';
    $('#preview').html(html);
	    
	// return html;
}

// this is not the cleanest way to do this. We should  
function time_nick_correlation_sort_trigger() {
	console.log("time_nick_correlation_sort_trigger");
	
	the_visulizers["time nick correlation"].show();
}


atool = new time_nick_correlation();
the_visulizers[atool.name] = atool;