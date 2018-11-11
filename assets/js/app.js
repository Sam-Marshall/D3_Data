var svgWidth = 960;
var svgHeight = 660;
var data = '../../data/data.csv';

var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
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
});