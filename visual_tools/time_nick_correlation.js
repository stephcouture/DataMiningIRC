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

time_nick_correlation.prototype.gettable = function() {
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
	// make html table
	var htmltable = '<table><thead>';
	htmltable += '<tr><td>user name</td>';
	for (var i=0;i<24;i++) {
		htmltable += '<td>'+i+'</td>';
	}
	htmltable += '<td>total</td></tr></thead><tbody>';
	
	for (var u=0;u<aTemp.length;u++) {
		auser = aTemp[u].user_name;
		htmltable += '<tr><td>'+auser+'</td>';
		for (var i=0;i<24;i++) {
			htmltable += '<td>&nbsp;';
			if  (users_array[auser].hours[i]["join"])
				htmltable += '<div class = "time_nick_join">'+users_array[auser].hours[i]["join"]+'</div>';
			if  (users_array[auser].hours[i]["message"])
				htmltable += '<div class = "time_nick_message">'+users_array[auser].hours[i]["message"]+'</div>';
			htmltable += '</td>';
		}
		htmltable += '<td>';
		htmltable += '<div class = "time_nick_message">'+users_array[auser].total["message"]+'</div>';
		htmltable += '<div class = "time_nick_join">'+users_array[auser].total["join"]+'</div>';
		htmltable += '</td></tr>';
	}
	
	
	htmltable +='</tbody></table></div></div>';
	
	return htmltable;
}

time_nick_correlation.prototype.show = function () {
	       
		var html = '<div class ="time_nick_tool">Legend : <div class = "time_nick_join">join</div> <div class = "time_nick_message">message</div>  ';

		// Select sort
		// var val = $('#time_nick_sortby').length ? $('#time_nick_sortby').val() : "user name";  // this could be cleaner
		html += 'Sort by : <select id="time_nick_sortby" onchange="time_nick_correlation_sort_trigger()">';
		html += '<option>user name</option><option>message</option><option>join</option><option>quit</option></select>  ';
		html += '<div id = "time_nick_table">'+this.gettable()+'</div></div>';
		
		$('#preview').html(html);
}

// this is not the cleanest way to do this. We should  
function time_nick_correlation_sort_trigger() {
	console.log("time_nick_correlation_sort_trigger");
	
	$('#time_nick_table').html(the_visulizers["time nick correlation"].gettable());
}


atool = new time_nick_correlation();
the_visulizers[atool.name] = atool;