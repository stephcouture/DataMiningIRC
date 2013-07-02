/* xchat_en parser */

/**
 * Parse instructions for the Irssi logfile format.
 * Exemple file : 
 * 
 * 
 * 
 * +------------+-------------------------------------------------------+->
 * | Line	| Format						| Notes
 * +------------+-------------------------------------------------------+->
 * | Normal	| MMM DD hh:mm:ss <NICK> MSG			
 * | Join	| MMM DD hh:mm:ss * NICK(HOST) has joined #room
 * | Quit	| MMM DD hh:mm:ss * NICK(HOST) has quit (QUIT:Leaving)		
 * +------------+-------------------------------------------------------+-> */


function parser_xchat_en() {
  this.type = "xchat_en"; 
  Parser.call(this);
}

// inherit Parser
parser_xchat_en.prototype = new Parser();
 
// correct the constructor pointer because it points to Person
parser_xchat_en.prototype.constructor = parser_xchat_en;
parser_xchat_en.prototype.parse_line = function (i_line) {
	
	var message_type;
	if (matches = i_line.match(/^(.+?) (\d+) (\d+):(\d+):(\d+) <([a-zA-Z0-9-_]+?)>\t(.+?)$/))
		message_type = "message";
	else if (matches = i_line.match(/^(.+?) (\d+) (\d+):(\d+):(\d+) \*\t([a-zA-Z0-9-_]+?) \(.+?\) has joined/))
		message_type = "join";
	else if (matches = i_line.match(/^(.+?) (\d+) (\d+):(\d+):(\d+) \*\t([a-zA-Z0-9-_]+?) has quit/)) 
		message_type = "quit";
	else if (matches = i_line.match(/^(.+?) (\d+) (\d+):(\d+):(\d+) /)) {
		matches[5] = "";
		matches[6] = "";
		message_type = "unknown";		
	} 	  
	else return null;
	
	// change the <> for their html code
	var newline = i_line.replace("<","&#60;");
	newline = newline.replace(">","&#62;"); 
		
	// return the line;
	alogline =  new log_line(
			new Date(0,0,0,matches[3],matches[4],matches[5]),   // time
			matches[6], // user 
			matches[7],  // text
			message_type, // type
			newline);  // full line
	
	if (debug_mode) console.log(alogline);
	return alogline;	
}

