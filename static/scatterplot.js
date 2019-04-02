var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
var activey="Protein"
var activex="Calories"
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
    yMap = function(d) { return yScale(yValue(d));},
    yAxis = d3.axisLeft(yScale);

// add the graph canvas to the body of the webpage
var svg = d3.select("body").append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
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
var colorScale = d3.scaleSequential().domain([1,81]).interpolator(d3.interpolateViridis);
d3.csv('/static/data/cereal.csv')
  .then(function(data){
    data.forEach(function(d) {
    d[activex] = +d[activex];
    d[activey] = +d[activey];
    //alert( d.calories )

  });
  
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
    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 6)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .attr('fill',function (d,i) { return colorScale(i) })

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
