/* Normal parser */

var parser_normal = {};

parser_normal.type = "normal";

parser_normal.format = function () { 
	return /^# (.+?) (<.+?>) (.+?)$/;
}

parser_normal.parse_line = function (i_line) {
	var format = /^# (.+?) (<.+?>) (.+?)$/;
	return format.exec(i_line);
}




