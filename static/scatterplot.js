var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
var activey="Protein"
var activex="Calories"
var jittered=false
// setup x
var xValue = function(d) { return d[activex];}, // x value of given data
    xScale = d3.scaleLinear().range([0, width]),
    //mapping value to x axis
    xMap = function(d) { return xScale(xValue(d));},
    xAxis = d3.axisBottom(xScale);
//alert(xScale(1))

// setup y
var yValue = function(d) { return d[activey];}, // y value of given data
    yScale = d3.scaleLinear().range([height, 0]),
    yMap = function(d) { return yScale(yValue(d))},
    yAxis = d3.axisLeft(yScale);

// add the graph canvas to the body of the webpage
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define the div for the tooltip
var tooltip = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

// show tooltip when mouse over dot
var mouseover = function(d,i) {

    tooltip.transition()		
                .duration(300)		
                .style("opacity", .9);		
    tooltip.html( d.name + " : (" + d[activex] + "," + d[activey] + ")" )
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 30) + "px");	

};

// set opacity of tooltip to 0 when mouse not over dot
var mouseleave = function(d,i) {
    tooltip
	.transition()
	.duration(300)
	.style("opacity", 0)
   
}

var fields=NaN
d3.csv('/static/data/cereal.csv')
    .then(function(data){
	fields=Object.keys(data[0]).slice(3,12)
	for (var i=0;i<fields.length;i++) {
	    (function(i){
		document.getElementById(fields[i]+"x").addEventListener('click',(e)=>{
		    console.log(e)
		    activex=fields[i]
		    updatex()
		});
		document.getElementById(fields[i]+"y").addEventListener('click',(e)=>{
		    console.log(e)
		    activey=fields[i]
		    updatey()
		});
	    }(i))
	}
	});
document.getElementById("jb").addEventListener('change',jitter)

var colorScale = d3.scaleSequential().domain([1,81]).interpolator(d3.interpolateViridis);
d3.csv('/static/data/cereal.csv')
    .then(function(data){
	data.forEach(function(d) {
	    d[activex] = +d[activex];
	    d[activey] = +d[activey];
	    //alert( d.calories )

	});
	document.getElementById("Brand").addEventListener('change',function(e){
	    selected=["explicitOriginalTarget"].label.substring(0,1);
	    sarr=data.filter(data["mfr"]==selected)
	    console.log(sarr);
	})

	//edit domains
	xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue)+1]);
	yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue)+1])

	// x-axis
	svg.append("g")
	    .attr("class", "x-axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);

	// add text to x-axis
	svg.append("text")
	    .attr("class", "labelx")
	    .attr('id', 'xAxisLabel')
	    .attr("x", width)
	    .attr("y", height + margin.bottom)
	    .style("text-anchor", "end")
	    .text("Calories");
	// y-axis
	svg.append("g")
	    .attr("class", "y-axis")
	    .call(yAxis);
	// add text to y-axis
	svg.append("text")
	    .attr("class", "labely")
	    .attr('id', 'yAxisLabel')
	    .attr("x", -100)
	    .attr("y", 4)
	    .text("Protein (g)");
	//add circles
	var bubbles=svg.selectAll(".dot")
	    .data(data)
	    .enter().append("circle")
	    .attr("class", "dot")
	    .attr("r", 6)
	    .attr("cx", xMap)
	    .attr("cy", yMap)
		.attr('fill',function (d,i) { return colorScale(i) })
		.style('stroke','black')
		.style('opacity',0.8)
	    .on("mouseover", mouseover )
		.on("mouseleave", mouseleave );
	});

function updatey(){
    d3.csv('/static/data/cereal.csv')
	.then(function(data){
	    data.forEach(function(d) {
		d[activey] = +d[activey];
		//alert( d.calories )

	    });
	    console.log(activey)
	    yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue)+1]);
	    d3.select('.y-axis') // redraw the yAxis
		.transition().duration(1000)
		.call(yAxis)
	    d3.select('#yAxisLabel')
		.transition() // change the yAxisLabel
		.text(activey)
	    d3.selectAll('circle') // move the circles
		.transition().duration(1000)
		.delay(function (d,i) { return i*100})
		.attr('cy',yMap);

	})
    //Needs to be created
}
function updatex(){
    d3.csv('/static/data/cereal.csv')
	.then(function(data){
	    data.forEach(function(d) {
		d[activex] = +d[activex];
		//alert( d.calories )

	    });
	    xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue)+1]);
	    d3.select('.x-axis') // redraw the yAxis
		.transition().duration(1000)
		.call(xAxis)
	    d3.select('#xAxisLabel')
		.transition() // change the yAxisLabel
		.text(activex)
	    d3.selectAll('circle') // move the circles
		.transition().duration(1000)
		.delay(function (d,i) { return i*100})
		.attr('cx',xMap);

	})
    //Needs to be created
}
function jitter(){
	if(!this.checked){
		xMap = function(d) { return xScale(xValue(d));},
		yMap = function(d) { return yScale(yValue(d));}
		jittered=false
	}
	else{
		xMap = function(d) { return xScale(xValue(d))+Math.random()*30;}
		yMap = function(d) { return yScale(yValue(d))+Math.random()*30;}
		jittered=true
	}
	d3.selectAll('circle') // move the circles
		.transition().duration(1000)
		.delay(function (d,i) { return i*100})
		.attr('cx',xMap)
		.attr('cy',yMap);
}
