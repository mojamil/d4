var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// setup x
var xValue = function(d) { return d.calories;}, // x value of given data
    xScale = d3.scaleLinear().range([0, width]),
    //mapping value to x axis
    xMap = function(d) { return xScale(xValue(d));},
    xAxis = d3.axisBottom(xScale);
//alert(xScale(1))

// setup y
var yValue = function(d) { return d.protein;}, // y value of given data
    yScale = d3.scaleLinear().range([height, 0]),
    yMap = function(d) { return yScale(yValue(d));},
    yAxis = d3.axisLeft(yScale);

// add the graph canvas to the body of the webpage
var svg = d3.select("body").append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var activey="protein"
var activex="calories"
d3.csv('/static/data/cereal.csv')
.then(function(data){
  var fields=Object.keys(data[0]).slice(3,11)

  for (var i=0;i<fields.length;i++) {
    document.getElementById(fields[i]+"x").addEventListener('click',(e)=>{
      console.log(e)
      activex=fields[i]
    });
    document.getElementById(fields[i]+"y").addEventListener('click',(e)=>{
      console.log(e)
      activey=fields[i]
    });
  }
});

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
    .attr("class", "label")
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
    .attr("class", "label")
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
      .style("fill", "red")

  });
function update(){
  //Needs to be created
}