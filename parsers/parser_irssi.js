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

function Parser_irssi() {
  this.type = "irssi"; 
  Parser.call(this);
}

// inherit Parser
Parser_irssi.prototype = new Parser();
 
// correct the constructor pointer because it points to Person
Parser_irssi.prototype.constructor = Parser_irssi;
Parser_irssi.prototype.parse_line = function (i_line) {
	if (matches = i_line.match(/^(\d+):(\d+) < (.+?)> (.+?)$/))  {// normal line
		matches[5] = "message";
		return matches;
	}
	else if (matches = i_line.match(/^(\d+):(\d+) -\!- (.+?) \[.+?\] has joined .+?$/)) { // joined line
		matches[4] = "join";
	    matches[5] = "join";
		return matches;
	}
	else if (matches = i_line.match(/^(\d+):(\d+) -\!- (.+?) \[.+?\] has quit .+?$/)) { // joined line
		matches[4] = "quit";
	    matches[5] = "quit";
		return matches;
	}

	else
	  console.warn("no matches");
}

///////////////////////
// Autres fonctions
///////////////////////


