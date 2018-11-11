var svgWidth = 768;
var svgHeight = 528;
var data = '../../data/data.csv';

var chartMargin = {
    top: 30,
    right: 40,
    bottom: 30,
    left: 40
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("../../data/data.csv").then(function(stateData) {

    stateData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
    });

    console.log(stateData);

    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(stateData, d => d.poverty)])
        .range([8, chartWidth]);

    var yLinearScale = d3.scaleLinear()
        .domain([2, d3.max(stateData, d => d.healthcare)])
        .range([chartHeight, 2]);

    var bottomAxis = d3.axisBottom(xLinearScale).ticks(8);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(12);

    chartGroup.append("g")
        .call(leftAxis);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    var scatterGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter().append("circle")
        .attr("cy", d => { return yLinearScale(d.healthcare); })
        .attr("cx", (d, i) => { return xLinearScale(d.poverty); })
        .attr("r", 10)
        .style("opacity", 0.6);

    chartGroup.append("text").attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Lacks Healthcare (%)");

    chartGroup.append("text") // text label for the x axis
        .attr("x", (chartWidth / 2))
        .attr("y", chartHeight + chartMargin.bottom)
        .style("text-anchor", "middle")
        .text("In Poverty (%)");
});