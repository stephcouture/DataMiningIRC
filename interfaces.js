/* ////////////////////////////////////////////////////////////////
// DataMiningIRC
// We put here functions related to interfaces
// This could eventually be refactored to be object-oriented.
////////////////////////////////////////////////////////////////*/

// DisplayLogsNormal : function to display the logs in a normal way
//

function gethtml_LogsDiv(hide_notices) {
    var source = $('#source').val();
    the_logs = new irc_logs(the_parser.parse_logs(source,100));
    // var user_list = the_parser.get_user_list();
    
    var html = '<table class="logstable" cellpadding="0" cellspacing="0">';
	for (var i=0;i<the_logs.lines.length;i++) {
		if (the_logs.lines[i].type == "message") {    						
			if (is_question(the_logs.lines[i].text))    							
				html+='<tr class= "logsrow-question">';
			else
				html+='<tr class= "logsrow-message">';
			html+='<td class= "logscolumn">'+the_logs.lines[i].full_line+'</td></tr>'

		}
		else if (!hide_notices){
			html+='<tr div class= "logsrow-notice"><td class= "logscolumn">'+the_logs.lines[i].full_line+'</td></tr>';
		}
	}
		
	html+='</table>';
	return html;	
}


function gethtml_LogsTable() {
    var source = $('#source').val();
    // var logs = the_parser.parse_logs(source,100);
    // var user_list = the_parser.get_user_list();
    
    var html = 'Display only message line<br><table><thead><tr><td>type</td><td>Hour</td><td>Minute</td><td>User</td><td>Text</td></tr></thead><tbody>';
	for (var i=0;i<logs.length;i++) 
		if (the_logs.lines[i].type == "message") {    						
			if (is_question(the_logs.lines[i].text))    							
				html+='<tr style="background-color: #ff0000;">';
			else
				html+='<tr>';
			html+='<td>M</td><td>'+the_logs.lines[i].time.getHours()+'</td><td>'+the_logs.lines[i].time.getMinutes()+'</td><td>'+the_logs.lines[i].user+'</td><td>'+logs[i].text+"</td></tr>";
		}
		else {
			html+='<tr style="background-color: #C0C0C0;"><td>Join</td><td>'+the_logs.lines[i].time.getHours()+'</td><td>'+the_logs.lines[i].time.getMinutes()+'</td><td>'+the_logs.lines[i].user+'</td><td>'+the_logs.lines[i].text+"</td></tr>";
		}
		
		html+='</tbody></table>';
		return html;	
}

function displayLogsTable() {
    $('#preview').html(gethtml_LogsTable());
}

// Function to display the list of users

function displayUserList() {
    var source = $('#source').val();
    // var logs = the_logs.parse_logs(source,100);
    var user_list = the_logs.get_user_list();

    // Display a table with users
	var html = '<table><thead><tr><td>user name</td><td>nb lines</td><td></tr></thead><tbody>';
	for (a_user in user_list) {
			html+='<tr><td>'+a_user+'</td><td>'+user_list[a_user]+'</td><td></tr>';    						
	}
		html+='</tbody></table>';
                        
	    $('#preview').html(html);
}

function displayLogsDiv(check) {
	
	if (check) {
		console.log("displayLogsDiv : checked");
		$('#panel-scroll').html(gethtml_LogsDiv(true));
	}
	else {
		console.log("displayLogsDiv : not checked");
		$('#panel-scroll').html(gethtml_LogsDiv(false));
	}
}

function displayToolResult() {
	console.log ("displayToolResult");

	visualizer_name = $('#tool_selector').val();
	html = the_visulizers[visualizer_name].show();
	$('#preview').html(html);
	
	console.log ("displayToolResult"+visualizer_name);
	
}

function displaySelectors() {
	console.log ("displaySelectors");
	
	var html = '<table border="1"><tr>';
	for (a_selector in the_selectors) {
		console.log (a_selector);
	    html += '<td>'+the_selectors[a_selector].show()+'</td>';
	}
	html += '</tr></table>';
 				
//	html += '<input type="button" value="Source" onclick="$(\'#loading\').show(); $('#source-button').hide(); $(\'#panel\').hide()"/>';
	console.log ("html");
	return html;
}


function displayVisualizers() {
	console.log ("displayVisualizers");
	html = '<select id="tool_selector" onchange="displayToolResult()">';
	html += '<option></option>';
	
	for (a_visualizer in the_visulizers) {
		console.log (a_visualizer);
	    html += '<option>'+a_visualizer+'</option>';	
	}
 						
    html += '<option>Google Chrome</option>';
	html += '</select>';
	return html;
}

function displayPanel() { 
	$('#loading').hide();
	$('#panel').show();

	$('#restrict-panel').html(displaySelectors());
	
	html = '<div id="panel-scroll">'+gethtml_LogsDiv(false)+'</div>';
	$('#displaylogtable').html(html);
	html_functions = '<input type="button" value="display user time" onclick="loadLogs()">';
	html_functions += '<input type="button" value="display logs table" onclick="displayLogsTable()">';
	html_functions += '<input type="button" value="display user list" onclick="displayUserList()">';
	$('#functionButtons').html(html_functions);
	
	// Display the tool selector
	$('#toolselector').html(displayVisualizers());
	
}

