/* Parser base base class */

function Parser() {
    this.logs = [];
    this.parsed = false;
    this.user_list = [];
}

Parser.prototype.parse_line = function (i_line) {
    return;
}

Parser.prototype.parse_logs = function(i_source, max) {
	if (this.parsed) 
	 	return this.logs;

	var lines = i_source.split(/\n+/);
	no_matches_lines = "";
	
	for (var i=0, len=(max<lines.length ? max : lines.length); i<len; i++) {				
		var parsed_line = this.parse_line(lines[i]);
		if (parsed_line)
		   this.logs.push(parsed_line);
		else {
			no_matches_lines += lines[i] + "\n"; 
			console.warn("parser no matches : " + lines[i]);
		}
			
	}
	
	if (no_matches_lines) {
		var alertstring = "WARNING!!\n\nThe following lines were not parsed correctly. ";
		alertstring += "If they are signigicant, please verify that you chose the good parser and that your log text is well formatted. ";
		alertstring += "Othewise, contact us by sending these lines and specifying which parser you are using\n\n";
		alertstring += no_matches_lines;
		
		
		alert(alertstring);
	}
		
		
	this.parsed = true;

	return this.logs;
}

Parser.prototype.get_logs = function() {
	
	if (this.parsed) 
	 	return this.logs;
	else return; 
}
