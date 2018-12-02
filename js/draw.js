
var dataset;
var dataSelection;

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
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "H_AB", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Hits/AB (1871-2017)",
                "Year",
                "Yearly Average of Hits/AB"
                )
        }
        else if (dataSelection == HOME_RUNS_PER_GAME)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "HR_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Homeruns/Game (1871-2017)",
                "Year",
                "Yearly Average of Homeruns/Game"
                )
        }
        else if (dataSelection == RUNS_PER_GAME)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "R_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Runs/Game (1871-2017)",
                "Year",
                "Yearly Average of Runs/Game"
                )
        }
        else if (dataSelection == WALKS_PER_GAME)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "BB_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Walks/Game (1871-2017)",
                "Year",
                "Yearly Average of Walks/Game"
                )
        }
        else if (dataSelection == STRIKE_OUTS_PER_GAME)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "SO_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Strike-outs/Game (1871-2017)",
                "Year",
                "Yearly Average of Strike/Game"
            )
        }
    });
}

$(document).ready(function () 
{
    loadData(); 
});

function loadData() 
{
    d3.csv('data/Teams.csv', function(data) 
    {
        dataset =  data
        data.forEach(function(d) {
            d.Year = parseInt(d.Year)
            d.BB_G = parseFloat(d.BB_G)
            d.H_AB = parseFloat(d.H_AB)
            d.MOVING_AVG_CRITERIA = parseFloat(d.MOVING_AVG_CRITERIA)
            d.R_G = parseFloat(d.R_G)
            d.SO_G = parseFloat(d.SO_G)
        })
        
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
    height = 500; 

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


