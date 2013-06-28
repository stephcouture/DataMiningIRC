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
	for (var i=0, len=(max<lines.length ? max : lines.length); i<len; i++) {				
		var parsed_line = this.parse_line(lines[i]);
		if (parsed_line)
		   this.logs.push(parsed_line);
	}
	
	this.parsed = true;

	return this.logs;
}

Parser.prototype.get_logs = function() {
	
	if (this.parsed) 
	 	return this.logs;
	else return; 
}
