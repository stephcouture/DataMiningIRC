// 
// Objects for the logs
//

function irc_logs(loglines) {
	this.lines = loglines;
	this.user_list = [];
	this.user_regex = null; // this is created as needed
}

irc_logs.prototype.is_question =  function(log_line) {
	if (!this.user_regex) {
		var users = [];
		this.get_user_list(); // make sure it's loaded
		for (user in this.user_list) {users.push(user)}
		this.user_regex = new RegExp("\b" + users.join("|") + "\b");
	}
	return this.user_regex.test(isNaN(log_line) ? log_line : this.lines[log_line].text)
}

// Get an array of user lists indicating the number of message
irc_logs.prototype.get_user_list = function() {
	
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
	this.user = user.replace(/^\s+/,'').replace(/\s+$/,''); // TODO: make more efficient
	this.text = text;
	this.type = type;
	this.full_line = full_line;
	this.selected = true;
}

// TO BE DELETED
// log_line.prototype.is_question = function() {
// 
// 	 var user_list = the_logs.get_user_list();
// 	
// 	 for (a_user in user_list) {
// 	
// 		var reg=new RegExp(a_user+' |@|:',"gi");
// 		if (reg.test(this.text)) {
// 			console.log("text : "+this.text);
// 			console.log("user : "+a_user);
// 			return true;
// 	    }
//     }
//     return false;
// }

log_line.prototype.select = function() {
    this.selected = true;
}

log_line.prototype.deselect = function() {
    this.selected = false;
}
