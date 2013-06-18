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
    			if (the_logs.is_question(i))
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



function refresh_page(reset) {
	
    the_logs.selectall();
    
    if (!reset) {
    	// We restrict the selection
    	for (a_selector in the_selectors) {
    		the_selectors[a_selector].restrict();
    	}
    }
	
    // refresh the scroll panel
	$('#panel-scroll').html(gethtml_LogsDiv());
	
    // refresh the visualizers
	displayToolResult(true);
}

function displayToolResult(refresh) {
	console.log ("displayToolResult");

	visualizer_name = $('#tool_selector').val();
	if (visualizer_name) 
		html = the_visulizers[visualizer_name].show(refresh);
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
	
	refresh_page(true);
		
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
 						
	html += '</select>';
	return html;
}

function displayPanel() { 
	$('#loading').hide();
	$('#panel').show();
	
	// load the logs
    var source = $('#source').val();
    the_parser = parsers[$('#parser_format').val()];
    the_logs = new irc_logs(the_parser.parse_logs(source,1000));

	$('#restrict-panel').html(displaySelectors());
	
	html = '<div id="panel-scroll">'+gethtml_LogsDiv(false)+'</div>';
	$('#displaylogtable').html(html);
	
	// Display the tool selector
	$('#toolselector').html(displayVisualizers());
	
}

