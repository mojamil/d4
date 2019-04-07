var svg = d3.select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = 250,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);
    var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius - 80);
    var color = d3.scaleOrdinal(["red","blue","green","yellow","orange","cyan","violet"]);
    var pie = d3.pie();
    document.getElementById("avg").addEventListener("click",update)
    document.getElementById("high").addEventListener("click",update)
    document.getElementById("mid").addEventListener("click",update)
    document.getElementById("low").addEventListener("click",update)
    var labels=["Protein","Fat","Sodium","Fiber","Carbo","Sugars","Potass"]
    var means=[]
      d3.csv('/static/data/cereal.csv')
      .then(function(data){
        labels.forEach(l => {
          var val=d3.mean(data, function(d) { return d[l]; })
          if(l=="Sodium" || l=="Potass"){
            val=Math.ceil(val/1000)
          }

          means.push(val);
        });


          // Generate the pie


          // Generate the arcs
          //Generate groups
          var arcs = g.selectAll("arc")
          .data(pie(means))
          .enter()
          .append("g")
          .attr("class", "arc")

          //Draw arc paths
          arcs.append("path")
          .attr("fill", function(d, i) {
          return color(i);
          })
          .attr("d", arc);
          arcs.append("text")
          .attr("transform", function(d) {
          return "translate(" + label.centroid(d) + ")";
          })
          .text(function(d,i) { return labels[i]; });
      });
function update(){
  var labels=["Protein","Fat","Sodium","Fiber","Carbo","Sugars","Potass"]
  var means=[]
  id=this.id
    d3.csv('/static/data/cereal.csv')
    .then(function(data){
      datas=data.sort(function(a,b){
        if(parseFloat(a.rating)<parseFloat(b.rating)){
          return 1
        }
        else if(parseFloat(a.rating)==parseFloat(b.rating)){
          return 0;
        }
        else{
          return -1
        }
      })
      var thirds=parseInt(datas.length/3)
      console.log(thirds)
      console.log(datas.slice(0,25));
      if(this.id=="avg"){
        
      }
      else if(id=="high"){
        data=datas.slice(0,thirds);
      }
      else if(id=="mid"){
        data=datas.slice(thirds,2*thirds);
      }
      else if(id=="low"){
        data=datas.slice(2*thirds,3*thirds);
      }
      labels.forEach(l => {

        var val=d3.mean(data, function(d) { return d[l]; })
        if(l=="Sodium" || l=="Potass"){
          val=Math.ceil(val/1000)
        }
        means.push(val);
      });
      //Generate groups
      var arcs = g.selectAll("arc")
      .data(pie(means))
      .enter()
      .append("g")
      .attr("class", "arc")
      //Draw arc paths
      arcs.append("path")
      .attr("fill", function(d, i) {
      return color(i);
      })
      .attr("d", arc);
      arcs.selectAll("path")
      .transition().duration(1000)
      .attr("d", arc);
      arcs.append("text")
      .attr("transform", function(d) {
      return "translate(" + label.centroid(d) + ")";
      })
      
      .text(function(d,i) { return labels[i]; });
      svg.selectAll("arc")
      .data(pie(means))
      .exit().remove();
    });
}