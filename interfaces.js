/* ////////////////////////////////////////////////////////////////
// DataMiningIRC
// We put here functions related to interfaces
// This could eventually be refactored to be object-oriented.
////////////////////////////////////////////////////////////////*/

// DisplayLogsNormal : function to display the logs in a normal way
//
function displayLogsNormal() {
                    var source = $('#source').val();
                    var logs = the_parser.parse_logs(source,100);
                    var user_list = the_parser.get_user_list();
                    
      				var html = 'Display only message line<br><table><thead><tr><td>type</td><td>Hour</td><td>Minute</td><td>User</td><td>Text</td></tr></thead><tbody>';
    				for (var i=0;i<logs.length;i++) 
    					if (logs[i].type == "message") {    						
    						if (is_question(logs[i].text))    							
    							html+='<tr style="background-color: #ff0000;">';
    						else
    							html+='<tr>';
    						html+='<td>M</td><td>'+logs[i].time.getHours()+'</td><td>'+logs[i].time.getMinutes()+'</td><td>'+logs[i].user+'</td><td>'+logs[i].text+"</td></tr>";
    					}
    					else {
    						html+='<tr style="background-color: #C0C0C0;"><td>Join</td><td>'+logs[i].time.getHours()+'</td><td>'+logs[i].time.getMinutes()+'</td><td>'+logs[i].user+'</td><td>'+logs[i].text+"</td></tr>";
    					}
    					
    					html+='</tbody></table>';
                    
		   		    $('#preview').html(html);
}		

// Function to display the list of users
//
function displayUserList() {
    var source = $('#source').val();
    var logs = the_parser.parse_logs(source,100);
    var user_list = the_parser.get_user_list();

    // Display a table with users
	var html = '<table><thead><tr><td>user name</td><td>nb lines</td><td></tr></thead><tbody>';
	for (a_user in user_list) {
			html+='<tr><td>'+a_user+'</td><td>'+user_list[a_user]+'</td><td></tr>';    						
	}
		html+='</tbody></table>';
                        
	    $('#preview').html(html);
}

