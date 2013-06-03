/* ////////////////////////////////////////////////////////////////
// We put here some varied functions
// This could eventually be refactored to be object-oriented.
////////////////////////////////////////////////////////////////*/

function is_question(a_text) {
	 var user_list = the_logs.get_user_list();
	 for (a_user in user_list) {
		if (a_text.contains(a_user)) {
			return true;
	    }
     }
     return false;
}