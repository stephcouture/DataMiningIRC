/* Irssi parser 
* This code is inspired from https://github.com/tommyrot/superseriousstats/blob/master/parser_irssi.php
*
* Permission to use, copy, modify, and/or distribute this software for any
* purpose with or without fee is hereby granted, provided that the above
* copyright notice and this permission notice appear in all copies.
*
* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/


/**
 * Parse instructions for the Irssi logfile format.
 *
 * +------------+-------------------------------------------------------+->
 * | Line	| Format						| Notes
 * +------------+-------------------------------------------------------+->
 * | Normal	| <NICK> MSG						| Skip empty lines.
 * | Action	| * NICK MSG						| Skip empty actions.
 * | Slap	| * NICK slaps MSG					| Slaps may lack a (valid) target.
 * | Nickchange	| -!- NICK is now known as NICK				|
 * | Join	| -!- NICK [HOST] has joined CHAN			|
 * | Part	| -!- NICK [HOST] has left CHAN [MSG]			| Part message may be absent, or empty due to normalization.
 * | Quit	| -!- NICK [HOST] has quit [MSG]			| Quit message may be empty due to normalization.
 * | Mode	| -!- mode/CHAN [+o-v NICK NICK] by NICK		| Only check for combinations of ops (+o) and voices (+v).
 * | Mode	| -!- ServerMode/CHAN [+o-v NICK NICK] by NICK		| "
 * | Topic	| -!- NICK changed the topic of CHAN to: MSG		| Skip empty topics.
 * | Kick	| -!- NICK was kicked from CHAN by NICK [MSG]		| Kick message may be empty due to normalization.
 * +------------+-------------------------------------------------------+-> */


function Parser_irssi() {
  this.type = "irssi"; 
  Parser.call(this);
}

// inherit Parser
Parser_irssi.prototype = new Parser();
 
// correct the constructor pointer because it points to Person
Parser_irssi.prototype.constructor = Parser_irssi;
Parser_irssi.prototype.parse_line = function (i_line) {
	
	var message_type;
	if (matches = i_line.match(/^(\d+):(\d+) < ([a-zA-Z0-9-_]+?)> (.+?)$/))  {// normal line
		message_type = "message";
	}
	else if (matches = i_line.match(/^(\d+):(\d+) -\!- ([a-zA-Z0-9-_]+?) \[.+?\] has joined .+?$/)) { // joined line
		message_type = "join";
	}
	else if (matches = i_line.match(/^(\d+):(\d+) -\!- ([a-zA-Z0-9-_]+?) \[.+?\] has quit .+?$/)) { // quit line
		message_type = "quit";
	}
	else if (matches = i_line.match(/^(\d+):(\d+) /)) { // unknown line
		message_type = "unknown";
		matches[3] = "";
		matches[4] = "";
	}
	else if (matches = i_line.match(/^--- Log (.+?) (\d+):(\d+):(\d+) /)) { // log open/close
		message_type = "log open/close";
		matches[1] = matches[2];
		matches[2] = matches[3];
		matches[3] = "";
		matches[4] = "";
	}
	else
	  return null;
	
	
	return new log_line(
					new Date(0,0,0,matches[1],matches[2]),   // time
					matches[3], // user 
					matches[4],  // text
					message_type, // type
					i_line);  // full line
}

///////////////////////
// Autres fonctions
///////////////////////


