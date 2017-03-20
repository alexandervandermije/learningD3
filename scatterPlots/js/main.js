
// Variables used in making scatterplot
var w = 500;
var h = 300;
var padding = 30;

// random dataset setup
var dataset = [];
var numDataPoints = 50;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;

for (var i = 0; i < numDataPoints; i++) 
{
      var newNumber1 = Math.round(Math.random() * xRange);
      var newNumber2 = Math.round(Math.random() * yRange);
      dataset.push([newNumber1, newNumber2]);
}

//Create scale functions
var xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function(d) { return d[0]; })]) // Set the scale domain of possible data points.
      .range([padding, w - padding *2]);  // set a range that those values are transformed and fitted into in the data visualisation

var yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function(d) { return d[1]; })])
      .range([h - padding, padding]);

var rScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function(d) { return d[0]; })])
      .range([2, 5]);

// creating the axis, based on the scales created
var xAxis = d3.axisBottom()
      .ticks(5)
      .scale(xScale);

var yAxis = d3.axisLeft()
    .scale(yScale);

//Create SVG element/canvas
var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
// Create a circle at the dataset point
svg.selectAll("circle")
      .data(dataset)
      .enter()// for every dataset entry
      .append("circle")
      .attr("cx", function(d) {// set the central X position
            return xScale(d[0]);// to the data from the datapoint, to the xScale
      })
      .attr("cy", function(d) {// set central y position
            return yScale(d[1]); //  to the data, along the yScale
      })
      .attr("r", function(d) {
            return rScale(d[1]);
      });
// Adding text to next to the datapoints 

// svg.selectAll("text")
//       .data(dataset)
//       .enter()
//       .append("text")
//       .text(function(d) {
//             return d[0] + "," + d[1];
//       })
//       .attr("x", function(d) {
//             return xScale(d[0]);
//       })
//       .attr("y", function(d) {
//             return yScale(d[1]);
//       })
//       .attr("font-family", "sans-serif")
//       .attr("font-size", "11px")
//       .attr("fill", "red");

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding + ",0)")  //Assign "axis" class
      .call(yAxis);   