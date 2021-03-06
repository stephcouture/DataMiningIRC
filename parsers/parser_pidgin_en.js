/* pidgin_en parser */

/**
 * Parse instructions for the Irssi logfile format.
 *
 * +------------+-------------------------------------------------------+->
 * | Line	| Format						| Notes
 * +------------+-------------------------------------------------------+->
 * | Normal	| (hh:mm:ss PM) NICK: MSG			
 * | Join	| (hh:mm:ss PM) NICK [HOST] entered the room
 * | Quit	| (hh:mm:ss PM) NICK [HOST] entered the room			
 * | Mode	| -!- mode/CHAN [+o-v NICK NICK] by NICK		| Only check for combinations of ops (+o) and voices (+v).
 * | Mode	| -!- ServerMode/CHAN [+o-v NICK NICK] by NICK		| "
 * | Topic	| -!- NICK changed the topic of CHAN to: MSG		| Skip empty topics.
 * | Kick	| -!- NICK was kicked from CHAN by NICK [MSG]		| Kick message may be empty due to normalization.
 * +------------+-------------------------------------------------------+-> */


function parser_pidgin_en() {
  this.type = "pidgin-en"; 
  Parser.call(this);
}

// inherit Parser
parser_pidgin_en.prototype = new Parser();
 
// correct the constructor pointer because it points to Person
parser_pidgin_en.prototype.constructor = parser_pidgin_en;
parser_pidgin_en.prototype.parse_line = function (i_line) {
	
	var message_type;
	if (matches = i_line.match(/^\((\d+):(\d+):(\d+) (.+?)\) ([a-zA-Z0-9-_]+?): (.+?)$/))
		message_type = "message";
	else if (matches = i_line.match(/^\((\d+):(\d+):(\d+) (.+?)\) ([a-zA-Z0-9-_]+?) \[.+?\] entered the room.$/))
		message_type = "join";
	else if (matches = i_line.match(/^\((\d+):(\d+):(\d+) (.+?)\) ([a-zA-Z0-9-_]+?) left the room /)) 
		message_type = "quit";
	// here, I remove the ^ at the beginning of regexp because 
	// it seems that sometime, there is hidden char at the beginning of the file.  
	else if (matches = i_line.match(/\((\d+):(\d+):(\d+) (.+?)\) /)) { 
		matches[5] = "";
		matches[6] = "";
		message_type = "unknown";		
	}	  
	else return null;
	
	// convert the to make it 24-hour (because it is am/pm)
	var hour = parseInt(matches[1]);
	if (matches[4] == "PM" && hour != 12)
		hour += 12;
	else if (matches[4] == "AM" && hour == 12)
		hour = 0;
	
	// return the line;
	alogline =  new log_line(
			new Date(0,0,0,hour,matches[2],matches[3]),   // time
			matches[5], // user 
			matches[6],  // text
			message_type, // type
			i_line);  // full line
	
	if (debug_mode) console.log(alogline);
	return alogline;	
}

