// 
// Objects for the logs
//

function irc_logs(loglines) {
	console.log("logs constructor");
	this.lines = loglines;
	this.user_list = [];
}

irc_logs.prototype.add_line = function () {
    return 'Time: <input id="time" value="0:00-23:59">';
}

irc_logs.prototype.get_user_list = function() {
	console.warn("Parser::get_user_names");
	
	if (this.users_list)
		return this.users_list;
	else {
	    for (var i=0;i<this.lines.length;i++) {
	    	if (this.user_list[this.lines[i].user])
	    		this.user_list[this.lines[i].user]++;
	    	else
	    		this.user_list[this.lines[i].user] = 1;
	    }
	    return this.user_list;
	}
}
	
////
// logs line object
///

