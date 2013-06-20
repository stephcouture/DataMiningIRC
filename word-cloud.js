/* This is modified from http://www.jasondavies.com/wordcloud/ (BSD License) */

// assumes D3 and layout are loaded
// <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
// <script src="https://raw.github.com/jasondavies/d3-cloud/master/d3.layout.cloud.js"></script>

var fill = d3.scale.category20();
var fontSize;
function drawWordCloud(selector, data) {
	d3.select(selector).html('');
	fontSize = d3.scale.log()
                    .domain([d3.min(data, function(d) {return d.size}), d3.max(data, function(d) {return d.size})])
                    .range([6, 100]);;
	d3.layout.cloud().size([600, 600])
	      .words(data)
	      .rotate(function() { return ~~(Math.random() * 5) * 30 - 60; })
	      .font("Impact")
	      .fontSize(function(d) { return fontSize(+d.size); })
	      .on("end", function() {
	                  d3.select(selector).append("svg")
	                          .attr("width", 600)
	                          .attr("height", 600)
	                        .append("g")
	                          .attr("transform", "translate(150,150)")
	                        .selectAll("text")
	                          .data(data)
	                        .enter().append("text")
	                                          .on("click", function(d) {
	                                                  var user = $("#users #user_"+d.text);
	                                                  // FIXME: this isn't working
	                                                  /*
	                                                  if (user) {
	                                                          if (user.hasClass("ui-selected")) {
	                                                                  user.removeClass("ui-selected").addClass("ui-selecting")
	                                                          }
	                                                          else {
	                                                                  user.addClass("ui-selecting");
	                                                          }
	                                                          console.warn($("#users").data("selectable"))
	                                                         $("#users").data("selectable")._mouseStop(null);
	                                                 }
	                                                  */
	                                          })
	                          .style("font-size", function(d) { return d.size + "px"; })
	                          .style("font-family", "Impact")
	                          .style("fill", function(d, i) { return fill(i); })
	                          .attr("text-anchor", "middle")
	                          .attr("transform", function(d) {
	                            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	                          })
	                          .text(function(d) { return d.text; });
	      })
	      .start();	
}