
var dataset;
var length_data
var reference = {'H_AB':['H', 'AB'],
                 'HR_G':['HR', 'G'],
                 'R_G':['R','G'],
                 'BB_G':['BB', 'G'],
                 'SO_G':['SO','G']
                }

var time = [1871, 2017] 

// select specific column of data
// value corresponds to value stored in button (see html)
var dataSelection = 0;

// constants defined here
var HITS_PER_AB = 0;
var HOME_RUNS_PER_GAME = 1;
var RUNS_PER_GAME = 2;
var WALKS_PER_GAME = 3;
var STRIKE_OUTS_PER_GAME = 4;
var OBP = 5;

// chart properties
var margin = {
        top: 80,
        right: 20,
        bottom: 50,
        left: 100
    },

width = 1000 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

// button click activities
function wireButtonClickEvents() 
{
    d3.selectAll("#buttonClass .button").on("click", function () {
        dataSelection = d3.select(this).attr("data-val");
        console.log(dataSelection);
        if (dataSelection == HITS_PER_AB)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            $("#variance").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "H_AB", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Hits/AB (1871-2017)",
                "Year",
                "Yearly Average of Hits/AB"
                );
            drawBarGraphInteractive(
                dataset, 
                "Year", 
                "H_AB", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Hits/AB (1871-2017)",
                "Year",
                "Yearly Average of Hits/AB",
                time
                );
        }
        else if (dataSelection == HOME_RUNS_PER_GAME)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            $("#variance").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "HR_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Homeruns/Game (1871-2017)",
                "Year",
                "Yearly Average of Homeruns/Game"
                );
            drawBarGraphInteractive(
                dataset, 
                "Year", 
                "HR_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Homeruns/Game (1871-2017)",
                "Year",
                "Yearly Average of Homeruns/Game",
                time
                )
        }
        else if (dataSelection == RUNS_PER_GAME)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            $("#variance").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "R_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Runs/Game (1871-2017)",
                "Year",
                "Yearly Average of Runs/Game"
                );
            drawBarGraphInteractive(
                dataset, 
                "Year", 
                "R_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Runs/Game (1871-2017)",
                "Year",
                "Yearly Average of Runs/Game",
                time
                )
        }
        else if (dataSelection == WALKS_PER_GAME)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            $("#variance").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "BB_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Walks/Game (1871-2017)",
                "Year",
                "Yearly Average of Walks/Game"
                );
            drawBarGraphInteractive(
                dataset, 
                "Year", 
                "BB_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Walks/Game (1871-2017)",
                "Year",
                "Yearly Average of Walks/Game",
                time
                )
        }
        else if (dataSelection == STRIKE_OUTS_PER_GAME)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            $("#variance").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "SO_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Strike-outs/Game (1871-2017)",
                "Year",
                "Yearly Average of Strike/Game"
            );
            drawBarGraphInteractive(
                dataset, 
                "Year", 
                "SO_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Strike-outs/Game (1871-2017)",
                "Year",
                "Yearly Average of Strike/Game",
                time
            )
        }
        else if (dataSelection == OBP)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            $("#variance").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "OBP", 
                "#interactive", 
                "#005a7d",
                "Yearly Average On-Bat Percentage (1871-2017)",
                "Year",
                "Yearly Average OBP"
            );
            drawBarGraphInteractive(
                dataset, 
                "Year", 
                "OBP", 
                "#interactive", 
                "#005a7d",
                "Yearly Average On-Bat Percentage (1871-2017)",
                "Year",
                "Yearly Average OBP",
                time
            )
        }
    });
}

$(document).ready(function () 
{
    loadData();
    listener();
});

function loadData() 
{
    d3.csv('data/Teams_wraw.csv', function(data) 
    {
        dataset =  data
        data.forEach(function(d) {
            d.Year = parseInt(d.Year)

            d.H = parseFloat(d.H)
            d.HR = parseFloat(d.HR)
            d.AB = parseFloat(d.AB)
            d.R = parseFloat(d.R)
            d.G = parseFloat(d.G)
            d.BB = parseFloat(d.BB)
            d.SO = parseFloat(d.SO)
            d.HBP = parseFloat(d.HBP)
            d.SF = parseFloat(d.SF)

            d.BB_G = parseFloat(d.BB_G)
            d.H_AB = parseFloat(d.H_AB)
            d.HR_G = parseFloat(d.HR_G)
            d.R_G = parseFloat(d.R_G)
            d.SO_G = parseFloat(d.SO_G)
            d.OBP = parseFloat(d.OBP)
        })
        
        length_data = dataset.length

        drawLineGraph(
            data, 
            "Year", 
            "HR_G", 
            "#HR_G", 
            "#003f5c",
            "Yearly Average of Homeruns/Game (1871-2017)",
            "Year",
            "Yearly Average of Homeruns/Game"
            )
        drawLineGraph(
            data, 
            "Year", 
            "H_AB", 
            "#H_AB", 
            "#003f5c",
            "Yearly Average of Hits/AB (1871-2017)",
            "Year",
            "Yearly Average of Hits/AB"
            )
        drawLineGraph(
            data, 
            "Year", 
            "BB_G", 
            "#W_G", 
            "#2f4b7c",
            "Yearly Average of Walks/Game (1871-2017)",
            "Year",
            "Yearly Average of Walks/Game"
            )
        drawLineGraph(
            data, 
            "Year", 
            "SO_G", 
            "#SO_G", 
            "#2f4b7c",
            "Yearly Average of Strike-outs/Game (1871-2017)",
            "Year",
            "Yearly Average of Strike/Game"
            )
        drawLineGraph(
            data, 
            "Year", 
            "HR_G", 
            "#HR_G_STEROIDS", 
            "#665191",
            "Yearly Average of Homeruns/Game (1871-2017)",
            "Year",
            "Yearly Average of Homeruns/Game"
            )
        
        drawLineGraph(
            data, 
            "Year", 
            "R_G", 
            "#R_G_STEROIDS", 
            "#665191",
            "Yearly Average of Runs/Game (1871-2017)",
            "Year",
            "Yearly Average of Runs/Game"
            )
        drawLineGraphInteractive(
            data, 
            "Year", 
            "H_AB", 
            "#interactive", 
            "#005a7d",
            "Yearly Average of Hits/AB (1871-2017)",
            "Year",
            "Yearly Average of Hits/AB"
            )
        drawBarGraphInteractive(
            data, 
            "Year", 
            "H_AB", 
            "#variance", 
            "#005a7d",
            "Yearly Average of Hits/AB (1871-2017)",
            "Year",
            "Yearly Average of Hits/AB",
            time
            )
        wireButtonClickEvents();
    })
}

function drawLineGraph(
    dataset, 
    xAttr, 
    yAttr, 
    chartID, 
    color,
    chartTitle,
    xLabel,
    yLabel
    ) 
{  
    minX = d3.min(dataset, function(d) {return d[xAttr]})
    maxX = d3.max(dataset, function(d) {return d[xAttr]})

    minY = d3.min(dataset, function(d) {return d[yAttr]})
    maxY = d3.max(dataset, function(d) {return d[yAttr]})
    
    var xScale = d3.scaleLinear()
                   .domain([minX, maxX]) 
                   .range([0, width])
                   .nice();
    
    var yScale = d3.scaleLinear()
                   .domain([minY, maxY])
                   .range([height, 0])
                   .nice();

    var chart = d3.select(chartID).append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
    
    var xAxis = chart.append("g")
                     .attr("transform", "translate(0, " + height + ")")
                     .call(d3.axisBottom(xScale));

    var yAxis = chart.append("g")
                     .call(d3.axisLeft(yScale));
    
    // add line
    var lineGen = d3.line(dataset)
                    .x(function(d) { return xScale(d[xAttr]); })
                    .y(function(d) { return yScale(d[yAttr]); });
    
    chart.append('svg:path')
         .attr('d', lineGen(dataset))
         .attr('stroke', color)
         .attr('stroke-width', 3)
         .attr('fill', 'none');

    // Chart title
    chart.append("text")
         .attr("x", (width / 2))             
         .attr("y", 0 - (margin.top / 5))
         .attr("text-anchor", "middle")  
         .style("font-size", "25px")
         .style("font-weight", "bold") 
         .text(chartTitle);

    // x axis label
    chart.append("text")
         .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + 40) + ")")
         .style("text-anchor", "middle")
         .text(xLabel);

    // y axis label
    chart.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", -50)
         .attr("x",0 - (height / 2))
         .attr("dy", "1em")
         .style("text-anchor", "middle")
         .text(yLabel);  
}

// the last visualization
function drawLineGraphInteractive(
    dataset, 
    xAttr, 
    yAttr, 
    chartID, 
    color,
    chartTitle,
    xLabel,
    yLabel
    ) 
{  
    height = 300; 

    minX = d3.min(dataset, function(d) {return d[xAttr]})
    maxX = d3.max(dataset, function(d) {return d[xAttr]})

    minY = d3.min(dataset, function(d) {return d[yAttr]})
    maxY = d3.max(dataset, function(d) {return d[yAttr]})
    
    
    var xScale = d3.scaleLinear()
                   .domain([minX, maxX]) 
                   .range([0, width]);
    
    var yScale = d3.scaleLinear()
                   .domain([minY, maxY])
                   .range([height, 0]);

    var chart = d3.select(chartID).append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
    
    var xAxis = chart.append("g")
                     .attr("transform", "translate(0, " + height + ")")
                     .call(d3.axisBottom(xScale));

    var yAxis = chart.append("g")
                     .call(d3.axisLeft(yScale));
    
    // add line
    var lineGen = d3.line(dataset)
                    .x(function(d) { return xScale(d[xAttr]); })
                    .y(function(d) { return yScale(d[yAttr]); });
    
    chart.append('svg:path')
         .attr('d', lineGen(dataset))
         .attr('stroke', color)
         .attr('stroke-width', 3)
         .attr('fill', 'none');

    // Chart title
    chart.append("text")
         .attr("x", (width / 2))             
         .attr("y", 0 - (margin.top / 5))
         .attr("text-anchor", "middle")  
         .style("font-size", "25px")
         .style("font-weight", "bold") 
         .text(chartTitle);

    // x axis label
    chart.append("text")
         .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + 40) + ")")
         .style("text-anchor", "middle")
         .text(xLabel);

    // y axis label
    chart.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", -50)
         .attr("x",0 - (height / 2))
         .attr("dy", "1em")
         .style("text-anchor", "middle")
         .text(yLabel);   
}

// Time is an array/list
function average_calc(A, B, time){
  var factor_a = 0;
  var factor_b = 0;

  for (var i = 0; i < length_data; i++) {
    if (dataset[i]['Year'] >= time[0] && dataset[i]['Year'] <= time[1]){
      factor_a += dataset[i][A]
      factor_b += dataset[i][B]

    }
  }
  return factor_a/factor_b
}

function OBP_calc(time){
  var total_H = 0
  var total_AB = 0
  var total_HBP = 0;
  var total_SF = 0

  for (var i = 0; i < length_data; i++) {
    if (dataset[i]['Year'] >= time[0] && dataset[i]['Year'] <= time[1]){
      total_H += dataset[i]['H']
      total_AB += dataset[i]['AB']
      total_HBP += dataset[i]['HBP']
      total_SF += dataset[i]['SF']
    }
  }
  return (total_H + total_HBP + total_SF)/(total_AB + total_H + total_HBP + total_SF)
}

function drawBarGraphInteractive(
    dataset, 
    xAttr, 
    yAttr, 
    chartID, 
    color,
    chartTitle,
    xLabel,
    yLabel,
    time
    ) 
{  
    if (yAttr == 'OBP'){average = OBP_calc(time)}
      else {average = average_calc(reference[yAttr][0], reference[yAttr][1], time)}

    height = 300; 

    minX = d3.min(dataset, function(d) {return d[xAttr]})
    maxX = d3.max(dataset, function(d) {return d[xAttr]})

    minY = d3.min(dataset, function(d) {return d[yAttr]})
    maxY = d3.max(dataset, function(d) {return d[yAttr]})
    
    
    var xScale = d3.scaleBand()
                   .domain(_.range(minX, maxX+1)) 
                   .range([0, width]);
    
    var yScale = d3.scaleLinear()
                   .domain([minY, maxY])
                   .range([height, 0]);

    var chart = d3.select(chartID).append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
    
    var xAxis = chart.append("g")
                     .attr('id', 'AXIS')
                     .attr("transform", "translate(0, " + yScale(average) + ")")
                     .call(d3.axisBottom(xScale))
                     .selectAll("text")
                      .attr("transform", "rotate(-90)")
                      .attr("dy", "0.3em")
                      .attr("y", 0)
                      .attr("dx", "-2em") 
                      .attr("font-size", "0.8em");

    var yAxis = chart.append("g")
                     .call(d3.axisLeft(yScale));


    //Draw bars
    // chart.selectAll(".bar")
    //         .data(dataset)
    //         .enter()
    //         .append("rect")
    //         .attr("class", "bar") 
    //         .attr("id", function (d) { return "bar" + d.Year; })//NEW
    //         .attr("x", function (d) { return xScale(d[xAttr]); })
    //         .attr("width", xScale.bandwidth()-2)
    //         .attr("y", function (d) { return yScale(d[yAttr]); })
    //         .attr("height", function (d) { return height - yScale(d[yAttr]); })
    
    //Draw bars
    chart.selectAll(".bar")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", "bar") 
            .attr("id", function (d) { return "bar" + d.Year; })//NEW
            .attr("x", function (d) { return xScale(d[xAttr]); })
            .attr("width", xScale.bandwidth()-2)
            .attr("y", function (d) {
              if (d[yAttr] - average <= 0){return yScale(average);}
              else {return yScale(d[yAttr])}
              })
            .attr("height", function (d) {
              if (d[yAttr] - average <= 0){return yScale(d[yAttr]) - yScale(average);}
              else {return Math.abs(yScale(d[yAttr]) - yScale(average))}
              })
            .attr("fill", function (d) {
              if (d[yAttr] - average <= 0){return 'blue';}
              else {return 'red'}
              })
    

    // Chart title
    chart.append("text")
         .attr("x", (width / 2))             
         .attr("y", 0 - (margin.top / 5))
         .attr("text-anchor", "middle")  
         .style("font-size", "25px")
         .style("font-weight", "bold") 
         .text(chartTitle);

    // x axis label
    chart.append("text")
         .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + 40) + ")")
         .style("text-anchor", "middle")
         .text(xLabel);

    // y axis label
    chart.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", -50)
         .attr("x",0 - (height / 2))
         .attr("dy", "1em")
         .style("text-anchor", "middle")
         .text(yLabel);   
}

function variance_mod(time){
    var constant_to_y = {0: 'H_AB',
                         1: 'HR_G',
                         2: 'R_G',
                         3: 'BB_G',
                         4: 'SO_G',
                         5: 'OBP'
                        };
    
    attribute = constant_to_y[dataSelection]

    if (attribute == 'OBP'){average = OBP_calc(time)}
      else {average = average_calc(reference[attribute][0], reference[attribute][1], time)}
    
    console.log(average)

    minY = d3.min(dataset, function(d) {return d[attribute]})
    maxY = d3.max(dataset, function(d) {return d[attribute]})

    var yScale = d3.scaleLinear()
               .domain([minY, maxY])
               .range([height, 0]);

    d3.select('#AXIS')
      .transition()
      .attr('transform', 'translate(0,'+ yScale(average) + ')')

    d3.selectAll('.bar')
      .transition()
      .attr("y", function (d) {
        if (d[attribute] - average <= 0){return yScale(average);}
        else {return yScale(d[attribute])}
        })
      .attr("height", function (d) {
        if (d[attribute] - average <= 0){return yScale(d[attribute]) - yScale(average);}
        else {return Math.abs(yScale(d[attribute]) - yScale(average))}
        })
      .attr("fill", function (d) {
        if (d[attribute] - average <= 0){return 'blue';}
        else {return 'red'}
        })
}

function listener(){
  console.log('Listener loaded')
  var numInputs = document.querySelectorAll('input[type=number]')
  var _changeInterval = null

    numInputs.forEach(function (input) {
      input.addEventListener('change', function (d) {
        if (d.target.value == '') {
          d.target.value = 1871
        }
      })
    })

    $('#yearA')
        .keyup(function() {
          clearInterval(_changeInterval)
          _changeInterval = setInterval(function() {
            clearInterval(_changeInterval);
            time[0] = parseInt($('#yearA').val());
            variance_mod(time);
            }, 400);
        })

    $('#yearB')
        .keyup(function() {
          clearInterval(_changeInterval)
          _changeInterval = setInterval(function() {
            clearInterval(_changeInterval);
            time[1] = parseInt($('#yearB').val());
            variance_mod(time);
            }, 400);
        })
}