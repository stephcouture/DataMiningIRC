// 
// Display a user wordcloud
// 

function time_selector() {
	console.log("time_selector");
	this.name = "time_selector";
}

time_selector.prototype.show = function () {
    return 'Time: <input id="time" value="0:00-23:59">';
}

console.log("avant d'ajouter le selector");
aselector = new time_selector();
the_selectors[aselector.name] = aselector;

