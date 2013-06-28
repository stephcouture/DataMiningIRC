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
		var match = this.parse_line(lines[i]);
		if (match) {
		   this.logs.push(new log_line(
			   new Date(0,0,0,match[1],match[2]),   // time
			   match[3], // user 
			   match[4],  // text
			   match[5], // type
			   lines[i]));  // full line
		   }
	}
	this.parsed = true;
        return this.logs;
}

Parser.prototype.get_logs = function() {
	
	if (this.parsed) 
	 	return this.logs;
	else return; 
}
