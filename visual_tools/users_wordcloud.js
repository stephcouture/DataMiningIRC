// 
// Display a user wordcloud
// 

function users_wordcloud() {
	this.name = "user word cloud";
}

users_wordcloud.prototype.show = function () {
	return "Here is the user word cloud";
}

atool = new users_wordcloud();
the_visulizers[atool.name] = atool;