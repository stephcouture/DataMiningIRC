// 
// Display a user wordcloud
// 

function users_wordcloud() {
	this.name = "user word cloud";
}

users_wordcloud.prototype.show = function () {
	
	// Build the set of users
	var tmpUsers = {};
	for (var i=0;i<the_logs.lines.length;i++) {
		if (the_logs.lines[i].selected) {
			console.log("selected");
			if (!tmpUsers[the_logs.lines[i].user])
				tmpUsers[the_logs.lines[i].user]=1;
			else 
				tmpUsers[the_logs.lines[i].user]++;
		}
	}
	
	console.log("avant data: "+tmpUsers);
	
	// Put in the form suitable to draw the cloud
	var data = [];
	for (user in tmpUsers) {
		data.push({text: user, size: tmpUsers[user]})
	}
	
	console.log("avant draw the cloud: "+data);
	
	// draw the cloud
	drawWordCloud("#preview", data);
}

atool = new users_wordcloud();
the_visulizers[atool.name] = atool;