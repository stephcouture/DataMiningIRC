<?php

// the IRC data file to use
$file = isset($_REQUEST['file']) ? $_REQUEST['file'] : '';
$realfile = dirname(__FILE__) . "/logs/$file.txt";

if (isset($_REQUEST['query'])) {
	header("Content-type: plain/text");
	$all_lines = file($realfile);
	$matching_lines = preg_grep("/" . $_REQUEST['query'] . "/i", $all_lines);
	echo count($all_lines), ":", implode(",", array_keys($matching_lines));
	$return_lines = array_slice($matching_lines, 0, isset($_REQUEST['limit']) && $_REQUEST['limit'] ? $_REQUEST['limit'] : null);
	echo str_replace('>', '&gt;', str_replace('<', '&lt;', implode("", $return_lines)));
	exit;
}
else if (isset($_REQUEST['line'])) {
}

?>
<html>
	<head>
		<meta charset="utf-8">
		<style>
		.hi {background-color: yellow;}
		.histogram {border: thin solid #ccc;}
		img.fill {background-color: red;}
		img.fill {background-color: #ccc;}
		img.fill, img.empty {height: 1em;}
		</style>
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script>
		var fillQuery = null;
		function sendQuery(limit) {
			var query = $("#query").val();
			$.ajax({
			  type: "POST",
			  url: "<?php echo $_SERVER['PHP_SELF']; ?>",
			  data: { query: query, file: $("#file").val(), limit: limit}
			}).done(function( response ) {
				var output = "";
				var lines = response.split(/\n/);
				var data = lines.shift();
				var parts = data.split(':');
				var total = parts[0];
				var positions = parts[1].split(',');
				var lastPosition = 0;
				output+="<div><span class='histogram'>";
				for (var i=0, len=positions.length; i<len; i++) {
					output += '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="empty" style="width: '+ 1+parseInt(Math.log(positions[i]-lastPosition)) +'px;">';
					output += '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="fill" style="width: 1px;">';
					lastPosition = positions[i];
				}
				output+="</span></div>";
				var re = new RegExp("("+query+")", 'gi');
				for (var i=0; i<lines.length;i++) {
					output += "<span class='line' id='l"+i+"'>" + lines[i].replace(re, "<span class='hi'>$1</span>") + "</span>\n";
				}
				if (limit) {
					output += "\n…";
					fillQuery = setTimeout(function() {sendQuery();}, 1000);
				}
				$('#lines').html(output);
			});
		}
		$(document).ready(function() {
			$('#query').keyup(function() {
				sendQuery(20);
			});
		});
		</script>
	</head>
<body>
<div>
	<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="GET" onsubmit="return updateQuery()">
		Source: <select name="file" id="file"><?php
		foreach(glob(dirname(__FILE__) . "/logs/*txt") as $source) {
			$filename = substr(basename($source), 0, -4);
			echo "<option value='$filename'", ($file==$filename ? ' selected="selected"' : ''), ">$filename</option>";
		}
		?></select>
		Query: <input type="query" id="query" />
	</form>
</div>
<pre id="lines">
</pre>
</body>
</html>