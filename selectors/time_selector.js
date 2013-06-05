// 
// Display a user wordcloud
// 

function time_selector() {
	console.log("time_selector");
	this.name = "time_selector";
}

time_selector.prototype.show = function () {
    return 'Time: <input id="time" value="0:00-23:59">	<input type="button" value="apply" onclick="displayLogsDiv()">';
}

time_selector.prototype.restrict = function () {
	
    var timeValue = $("#time").val();
    var timeMatch = /^\s*(\d+)\:(\d+)\s*-\s*(\d+)\:(\d+)\s*$/.exec(timeValue);
    if (timeMatch) {
            timeStart = new Date(0,0,0,timeMatch[1],timeMatch[2]);
            timeEnd = new Date(0,0,0,timeMatch[3],timeMatch[4]);
            
    		for (var i=0;i<the_logs.lines.length;i++) {
    			if (the_logs.lines[i].time < timeStart || the_logs.lines[i].time > timeEnd)
    				the_logs.lines[i].deselect();		
    		}
    }
}

time_selector.prototype.reset = function () {
	$("#time").val("0:00-23:59");
}

console.log("avant d'ajouter le selector");
aselector = new time_selector();
the_selectors[aselector.name] = aselector;

