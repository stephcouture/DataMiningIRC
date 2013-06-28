// 
// Display a user wordcloud
// 

function debug_test_parser() {
	this.name = "debug test parser";
}

debug_test_parser.prototype.show = function () {

	var html = '<table><thead>';
	html += '<tr><td>#</td><td>date-time</td><td>user</td><td>type</td><td>text</td></tr>';
	html += '</thead><tbody>';
	
	for (var i=0;i<the_logs.lines.length;i++) {
		html += '<tr><td>' + i +'</td>';
		html += '<td>' + the_logs.lines[i].time +'</td>';
		html += '<td>' + the_logs.lines[i].user +'</td>';
		html += '<td>' + the_logs.lines[i].type +'</td>';
		html += '<td>' + the_logs.lines[i].text +'</td></tr>';
	}
	
	html += '</tbody></table>';
		
	return html; 
	
}

// only add if in debug mode
if (debug_mode) {
	atool = new debug_test_parser();
	the_visulizers[atool.name] = atool;
}