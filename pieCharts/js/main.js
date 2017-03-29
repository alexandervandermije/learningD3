var app = angular.module('D3App', []);
app.controller('myCtrl', function($scope) {
    
    $scope.dataset = [
            { label: 'Abulia', count: 10, changed: false },
            { label: 'Betelgeuse', count: 30, changed: false},
            { label: 'Cantaloupe', count: 30, changed: false},
            { label: 'Dijkstra', count: 30, changed: false}
        ];

    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal(d3.schemeCategory20b);

    var tooltip = d3.select('#donutChart')           
      .append('div')                            
      .attr('class', 'tooltip');                

    tooltip.append('div')                       
      .attr('class', 'label');                  

    tooltip.append('div')                        
      .attr('class', 'count');                   

    tooltip.append('div')                        
      .attr('class', 'percent');                 

    /* Donut Chart */

    var donutWidth = 75;
    var legendRectSize = 18;
    var legendSpacing = 4;
    
    var totalCount = 100;
    
    $scope.createPercentage = function()
    {
        totalCount = 0;
        $scope.dataset.forEach(function(dataEntry)
        {
            totalCount += dataEntry.count;
        })
        $scope.dataset.forEach(function(dataEntry)
        {
            dataEntry.percentage = (dataEntry.count/totalCount)*100;
        })
    }
    $scope.adjustInputs = function(input)
    {
        
        var amountToAdjust = totalCount - input.dataEntry.count;
        
        var amountInputs = 0;
        input.dataEntry.changed = true;
                
        $scope.dataset.forEach(function(dataEntry)
        {
            if(dataEntry.label != input.dataEntry.label /*&& dataEntry.changed == false*/)
            {
                amountInputs++;
            }
        })
        $scope.dataset.forEach(function(dataEntry)
        {
            if(dataEntry.label != input.dataEntry.label /*&& dataEntry.changed == false*/)
            {
                dataEntry.count = amountToAdjust/amountInputs;
            }
        })
    }

    $scope.addNewInput = function()
    {
        $scope.dataset.push({label:'enter a label here', count: 0})
    }

    var pie = d3.pie()// D3 Pie() function to turn normal data into pieChart
        .value(function(d) { return d.count; })
        .sort(null);
    
    var donutArc = d3.arc()
        .innerRadius(radius - donutWidth)  // Instead of zero, for a donut chart add a width and subtract from the radius
        .outerRadius(radius);

    $scope.createDonutChart = function()
    {   
        $("#donutChart").html("");
        
        var svgDonut = d3.select('#donutChart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

        var donutPath = svgDonut.selectAll('path')
            .data(pie($scope.dataset))
            .enter()
            .append('path')
            .attr('d', donutArc)
            .attr('fill', function(d, i) {
                return color(d.data.label);
            });
        
        var legend = svgDonut.selectAll('.legend') // select non-existing labels
            .data(color.domain()) // because we passed the paths through the color function before, we now have a domain consisting of the colors & corresponding labels
            .enter()
            .append('g')
            .attr('class', 'legend') // add the legend class
            .attr('transform', function(d, i) 
            { //  setting the location of the element
                var height = legendRectSize + legendSpacing;
                var offset =  height * color.domain().length / 2;
                var horz = -2 * legendRectSize;
                var vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });
        
        legend.append('rect') // add a rectangle to the created legend
            .attr('width', legendRectSize) // with a width, height and color
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color);

        legend.append('text') // add text to the legend
            .attr('x', legendRectSize + legendSpacing)// space the x and y of the text
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });// select corresponding text from the data in the legend element
        $scope.createPercentage();
    }
    $scope.createDonutChart();
    
    $scope.createPieChart = function()
    {
        var svgPie = d3.select('#pieChart') // select DOM element 
            .append('svg')// Set up SVG to draw on
            .attr('width', width) // Add a width and height to SVG
            .attr('height', height)
            .append('g')// Add G element
            .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')'); // transform said element to the middle of the SVG

        var arc = d3.arc() //  Arc Function for dealing with the arc of the pie chart
            .innerRadius(0)// setting inner radius to 0 for piechart
            .outerRadius(radius); // setting outer radius to certain height

        var pie = d3.pie()// D3 Pie() function to turn normal data into pieChart
            .value(function(d) { return d.count; })
            .sort(null);

        var path = svgPie.selectAll('path')// select (for now non-existing) paths
            .data(pie($scope.dataset)) // pass the data from the dataset through the D3 Pie() function
            .enter()// for every data entry,
            .append('path')// add a path
            .attr('d', arc)// with data passed through the arc function
            .attr('fill', function(d, i) {// color the path based on the data.label passed through the color function
                return color(d.data.label);
            });
    }
});

