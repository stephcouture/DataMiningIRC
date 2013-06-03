// 
// Display a user wordcloud
// 

function display_users() {
	this.name = "display_users";
}

display_users.prototype.show = function () {
	    
    var user_list = the_logs.get_user_list();

    // Display a table with users
	var html = '<table><thead><tr><td>user name</td><td>nb lines</td><td></tr></thead><tbody>';
	for (a_user in user_list) {
			html+='<tr><td>'+a_user+'</td><td>'+user_list[a_user]+'</td><td></tr>';    						
	}
		html+='</tbody></table>';
                        
	    $('#preview').html(html);
	    
	return html;
}

atool = new display_users();
the_visulizers[atool.name] = atool;