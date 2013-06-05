// 
// Display a terms wordcloud
// 

function terms_wordcloud() {
	this.name = "terms word cloud";
}

// See at the end of this page for the function that was implemented first by Stéfan (to remove when this is fix).
terms_wordcloud.prototype.show = function () {
	
	var tmpWords = {};
	var simpleWordsRegex = /\W+/;

	// compilate the tokens
	for (var i=0;i<the_logs.lines.length;i++) {
		if (the_logs.lines[i].selected) {
			var tokens = the_logs.lines[i].text.toLowerCase().split(simpleWordsRegex);
			for (var j=0, len=tokens.length; j<len; j++) {
				if (stopwords[tokens[j]]) {continue} // skip over stopwords
				if (!tmpWords[tokens[j]]) {tmpWords[tokens[j]]=0}
				tmpWords[tokens[j]]++;
			}
		}
	}
	
	// show word cloud for words
	console.warn(tmpWords)
	var data = [];
	for (word in tmpWords) {
		data.push({text: word, size: tmpWords[word]*10})
	}
	
	drawWordCloud("#preview", data);
			
}

atool = new terms_wordcloud();
the_visulizers[atool.name] = atool;

/* 
function getLogsTable(logs) {
        var html = '<table><thead><tr><td>Time</td><td>User</td><td>Text</td></tr></thead><tbody>';
        var hasSelectedUsers = $('#users .ui-selected').length>0;
        var timeValue = $("#time").val();
        var timeMatch = /^\s*(\d+)\:(\d+)\s*-\s*(\d+)\:(\d+)\s*$/.exec(timeValue);
        if (timeMatch) {
                timeStart = new Date(0,0,0,timeMatch[1],timeMatch[2]);
                timeEnd = new Date(0,0,0,timeMatch[3],timeMatch[4]);
        }
		var tmpUsers = {};
		var tmpWords = {};
		var simpleWordsRegex = /\W+/
        for (var i=0;i<logs.length;i++) {
			// we will build the word cloud with all users mentioned for selected time
			if (timeMatch && (logs[i].time < timeStart || logs[i].time > timeEnd)) {continue;}
			if (!tmpUsers[logs[i].user]) {tmpUsers[logs[i].user]=0}
			tmpUsers[logs[i].user]++
			var tokens = logs[i].text.toLowerCase().split(simpleWordsRegex);
			for (var j=0, len=tokens.length; j<len; j++) {
				if (stopwords[tokens[j]]) {continue} // skip over stopwords
				if (!tmpWords[tokens[j]]) {tmpWords[tokens[j]]=0}
				tmpWords[tokens[j]]++;
			}
            if (hasSelectedUsers && !users[logs[i].user]) {continue;} // skip for filtered users
            html+='<tr><td>'+logs[i].time.getHours()+':'+(logs[i].time.getMinutes()<10 ? '0' : '')+logs[i].time.getMinutes()+'</td><td>'+logs[i].user+'</td><td>'+logs[i].text+"</td></tr>";
        }
		
		// show word cloud for users
		var data = [];
		for (user in tmpUsers) {
			data.push({text: user, size: tmpUsers[user]})
		}
		drawWordCloud("#users_cloud", data);

		// show word cloud for words
		console.warn(tmpWords)
		var data = [];
		for (word in tmpWords) {
			data.push({text: word, size: tmpWords[word]})
		}
		drawWordCloud("#words_cloud", data);
		
        html+='</tbody></table>';
        return html;

}

*/

