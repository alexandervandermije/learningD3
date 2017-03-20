var datasetBarChart1 = [ 25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
                14, 11, 22, 29, 11, 13, 12, 17, 18, 10,
                24, 18, 25, 9, 3 ];
var datasetSVGBarChart = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
//Width and height
var w = 500;
var h = 200;
var barPadding = 1;

d3.select("#barChart1").selectAll("div")
    .data(datasetBarChart1)
    .enter()
    .append("div")
	.attr("class", "bar")
	.style("height", function(d) {
	    var barHeight = d * 5;  //Scale up by factor of 5
	    return barHeight + "px";
	});

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

svg.selectAll("rect")
   .data(datasetSVGBarChart)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
    	return i * (w/datasetSVGBarChart.length); 
	})
   .attr("y", function(d)
   {
   		return h - d*4;
   })
   .attr("width", w / datasetSVGBarChart.length - barPadding)
   .attr("height", function(d)
   	{
   		var barHeight2 = d*5;
   		return barHeight2 + "px";
   	})
   .attr("fill", function(d) {
    	return "rgb(0, 0, " + (d * 10) + ")";
	});

svg.selectAll("text")
   .data(datasetSVGBarChart)
   .enter()
   .append("text")
   .text(function(d) {
        return d;
   })
    .attr("x", function(d, i) {
        return i * (w / datasetSVGBarChart.length) + (w / datasetSVGBarChart.length - barPadding) / 2;
    })
   .attr("y", function(d) {
        return h - (d * 4) + 14;              // +15
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white")
   .attr("text-anchor", "middle");