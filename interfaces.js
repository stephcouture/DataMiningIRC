/* ////////////////////////////////////////////////////////////////
// DataMiningIRC
// We put here functions related to interfaces
// This could eventually be refactored to be object-oriented.
////////////////////////////////////////////////////////////////*/

// DisplayLogsNormal : function to display the logs in a normal way
//

function gethtml_LogsDiv() {
    var html = '<table class="logstable" cellpadding="0" cellspacing="0">';
    for (var i=0;i<the_logs.lines.length;i++) {
    	if (the_logs.lines[i].selected) {
    		if (the_logs.lines[i].type == "message") {
    			if (the_logs.lines[i].is_question())
    				html+='<tr class= "logsrow-question">';
    			else
    				html+='<tr class= "logsrow-message">';
    			html+='<td class= "logscolumn">'+the_logs.lines[i].full_line+'</td></tr>'
    		}
    		else {
    			html+='<tr div class= "logsrow-notice"><td class= "logscolumn">'+the_logs.lines[i].full_line+'</td></tr>';
    		}
    	}
    }
		
	html+='</table>';
	return html;	
}


/* 
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

*/

function displayLogsDiv(reset) {
	
    the_logs.selectall();
    
    if (!reset) {
    	// We restrict the selection
    	for (a_selector in the_selectors) {
    		the_selectors[a_selector].restrict();
    	}
    }
	
	$('#panel-scroll').html(gethtml_LogsDiv());
}

function displayToolResult() {
	console.log ("displayToolResult");

	visualizer_name = $('#tool_selector').val();
	html = the_visulizers[visualizer_name].show();
	if (html) 
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
	
	html += '<td><input type="button" value="reset" onclick="resetSelectors()"></td>';
	onclick = "$('#loading').show(); $('#source-button').hide(); $('#panel').hide()";
	html += '<td><input type="button" value="Source" onclick="'+onclick+'"/></td>';
	
	html += '</tr></table>';
 				
	console.log ("html");
	return html;
}

function resetSelectors() {
	
	// reset every selectors
	for (a_selector in the_selectors) {
	    the_selectors[a_selector].reset();
	}
	
	displayLogsDiv(true);
}

function displayVisualizers() {
	console.log ("displayVisualizers");
	html = '<p>Tool visualizer : '; 
	html += '<select id="tool_selector" onchange="displayToolResult()">';
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
	
	// load the logs
    var source = $('#source').val();
    the_logs = new irc_logs(the_parser.parse_logs(source,100));

	$('#restrict-panel').html(displaySelectors());
	
	html = '<div id="panel-scroll">'+gethtml_LogsDiv(false)+'</div>';
	$('#displaylogtable').html(html);
	
	// Display the tool selector
	$('#toolselector').html(displayVisualizers());
	
}

