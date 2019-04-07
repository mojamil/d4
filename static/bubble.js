// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleLinear().range([0, width])
          // .domain([new Date(2010, 6, 3), new Date(2012, 0, 1)])
          // .rangeRound([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var active = "Calories"; 

// number of bars created
var bars = 10;
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
var xValue = function(d) { return d[active];}
// set the parameters for the histogram
var histogram = d3.histogram()
    .value(function(d) {return d[active]; })
    // .domain(x.domain())
    .thresholds(bars);
// sets starting point of bar	
var start = 0;
// get the data
d3.csv('/static/data/cereal.csv')
    .then(function(data){
	data.forEach(function(d) {
	d[active] = +d[active]
	});
	// group the data for the bars
	var bins = histogram(data);
	console.log(bins);
  // Scale the range of the data in the y domain
  x.domain([d3.min(data, xValue) - 1, d3.max(data, xValue)])
  y.domain([0, d3.max(bins, function(d) { return d.length; })]);
console.log("yes")
  // append the bar rectangles to the svg element
  svg.selectAll("rect")
	.data(bins)
    .enter().append("rect")
    .attr("x", function(d){
		var old = start;
		start+=width/ bars;
		return old;
	})
	.attr("transform", function(d) {
		  return "translate(0"+"," + y(d.length) + ")"; })
      .attr("width", function(d) {return width/ bars})
      .attr("height", function(d) { return height - y(d.length); })
    .attr('fill', 'steelblue')
    .attr('stroke','white');

    // .attr("fill", function(d) { return colorScale(d.y) });
  // add the x Axis
  svg.append("g")
	.attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
// add text to x-axis
	svg.append("text")
	    .attr("class", "labelx")
	    .attr('id', 'xAxisLabel')
	    .attr("x", width)
	    .attr("y", height + margin.bottom)
	    .style("text-anchor", "end")
	    .text(active);
  // add the y Axis
  svg.append("g")
	.attr("class", "y-axis")
    .call(d3.axisLeft(y));
      
});

function update(){
	console.log(active);
    d3.csv('/static/data/cereal.csv')
	.then(function(data){
	    data.forEach(function(d) {
		d[active] = +d[active];
		//alert( d.calories )
		});
        var bins = histogram(data);
        y.domain([0, d3.max(bins, function(d) { return d.length; })]);
        x.domain([d3.min(data, xValue) - 1, d3.max(data, xValue)])
	    d3.select('.x-axis') // redraw the xAxis
		.transition().call(d3.axisBottom(x))
		d3.select('.y-axis') // redraw the yAxis
		.transition().call(d3.axisLeft(y));
		d3.select('#xAxisLabel')
		.transition() // change the yAxisLabel
		.text(active)
	    d3.selectAll('rect') // move the bars
		.data(bins)
		.transition().attr("height", function(d) { return height - y(d.length); })
		.attr("transform", function(d) {
		  return "translate(0"+"," + y(d.length) + ")"; })
		// .transition().duration(1000)
		.delay(function (d,i) {;return i*100})
		
		// .attr('cx',xMap);

	})
    //Needs to be created
};

var fields=NaN
d3.csv('/static/data/cereal.csv')
    .then(function(data){
	fields=Object.keys(data[0]).slice(3,12)
	for (var i=0;i<fields.length;i++) {
		// console.log("WORRRKINGGGG");
	    (function(i){
		document.getElementById(fields[i]).addEventListener('click',(e)=>{
			// console.log("pushed")
		    // console.log(e)
		    active=fields[i]
		    update()
		});
	    }(i))
	}
	});
