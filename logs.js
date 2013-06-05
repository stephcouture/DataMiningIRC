// 
// Objects for the logs
//

function irc_logs(loglines) {
	this.lines = loglines;
	this.user_list = [];
}


// Get an array of user lists indicating the number of message
irc_logs.prototype.get_user_list = function() {
	console.warn("Parser::get_user_names");
	
	if (this.users_list)
		return this.users_list;
	else {
	    for (var i=0;i<this.lines.length;i++) {
	    	if (typeof this.user_list[this.lines[i].user] == 'undefined')
    			this.user_list[this.lines[i].user] = 0;
    		
	    	if (this.lines[i].type == "message")
	    			this.user_list[this.lines[i].user]++;
	    }
	}
	    
	    return this.user_list;
}

irc_logs.prototype.selectall = function () {
	for (var i=0;i<this.lines.length;i++)
		this.lines[i].selected = true;
}
	
/////////////////////////////////////////////
// logs line object
/////////////////////////////////////////////
function log_line(time,user,text,type,full_line) {
	this.time = time;
	this.user = user;
	this.text = text;
	this.type = type;
	this.full_line = full_line;
	this.selected = true;
}

log_line.prototype.is_question = function() {
	console.log("is question");
	 var user_list = the_logs.get_user_list();
	 console.log("is question");
	 for (a_user in user_list) {
		if (this.text.contains(a_user)) {
			return true;
	    }
    }
    return false;
}

log_line.prototype.select = function() {
    this.selected = true;
}

log_line.prototype.deselect = function() {
    this.selected = false;
}
