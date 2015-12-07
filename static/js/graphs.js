
function initChart(lineData) {

  /*var lineData = [{
    'x': 1,
    'y': 5
  }, {
    'x': 20,
    'y': 20
  }, {
    'x': 40,
    'y': 10
  }, {
    'x': 60,
    'y': 40
  }, {
    'x': 80,
    'y': 5
  }, {
    'x': 200,
    'y': 60
  }];*/
    
var data2 = [{
    'x': 1,
    'y': 10
  }, {
    'x': 25,
    'y': 60
  }, {
    'x': 40,
    'y': 50
  }, {
    'x': 60,
    'y': 30
  }, {
    'x': 80,
    'y': 40
  }, {
    'x': 100,
    'y': 2
}];
    

vis = d3.select("#visualisation"),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },  

     xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function (d) {
        return d.x;
      }),
      d3.max(lineData, function (d) {
        return d.x;
      })
    ]),

    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function (d) {
        return d.y;
      }),
      d3.max(lineData, function (d) {
        return d.y;
      })
    ]),

    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),

    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient("left")
      .tickSubdivide(true);


  vis.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis)
  .append("text")
    .attr("x", WIDTH / 2)
    .attr("y", MARGINS.bottom + 10)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Time");
  
  

  vis.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -HEIGHT/2)
   .attr("y", -MARGINS.bottom - 25)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Temperature");

  var lineFunc = d3.svg.line()
  .x(function (d) {
    return xRange(d.x);
  })
  .y(function (d) {
    return yRange(d.y);
  })
  .interpolate('basis');

vis.append("svg:path")
  .attr("d", lineFunc(lineData))
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  .attr("fill", "none");

/*vis.append('svg:path')
  .attr('d', lineFunc(data2))
  .attr('stroke','green' )
  .attr('stroke-width', 2)
  .attr('fill', 'none');*/
    
}
//InitChart();

