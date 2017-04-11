(function() {
    'use strict';

    function D3Graphs() {
        return {

            piechart: function (objName) {

                var dataset = {
                    apples: [53245, 28479, 19697, 24037, 40245],
                };

                var width = 270,
                    height = 250,
                    radius = Math.min(width, height) / 2;

                var color = d3.scale.category20();

                var pie = d3.layout.pie()
                    .sort(null);

                var arc = d3.svg.arc()
                    .innerRadius(radius - 100)
                    .outerRadius(radius - 50);

                var svg = d3.select(objName).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                var path = svg.selectAll("path")
                    .data(pie(dataset.apples))
                    .enter().append("path")
                    .attr("fill", function (d, i) {
                        return color(i);
                    })
                    .attr("d", arc);
            },
            barchart : function (objName) {
                var w = 270;
                var h = 236;

                var dataset = [
                    { key: 0, value: 5 },
                    { key: 1, value: 10 },
                    { key: 2, value: 13 },
                    { key: 3, value: 19 },
                    { key: 4, value: 21 },
                    { key: 5, value: 25 },
                    { key: 6, value: 22 },
                    { key: 7, value: 18 },
                    { key: 8, value: 15 },
                    { key: 9, value: 13 },
                    { key: 10, value: 11 },
                    { key: 11, value: 12 },
                    { key: 12, value: 15 },
                    { key: 13, value: 20 },
                    { key: 14, value: 18 },
                    { key: 15, value: 17 },
                    { key: 16, value: 16 },
                    { key: 17, value: 18 },
                    { key: 18, value: 23 },
                    { key: 19, value: 25 } ];

                var xScale = d3.scale.ordinal()
                    .domain(d3.range(dataset.length))
                    .rangeRoundBands([0, w], 0.05);

                var yScale = d3.scale.linear()
                    .domain([0, d3.max(dataset, function(d) {return d.value;})])
                    .range([0, h]);

                var key = function(d) {
                    return d.key;
                };

//Create SVG element
                var svg = d3.select(objName)
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

//Create bars
                svg.selectAll("rect")
                    .data(dataset, key)
                    .enter()
                    .append("rect")
                    .attr("x", function(d, i) {
                        return xScale(i);
                    })
                    .attr("y", function(d) {
                        return h - yScale(d.value);
                    })
                    .attr("width", xScale.rangeBand())
                    .attr("height", function(d) {
                        return yScale(d.value);
                    })
                    .attr("fill", function(d) {
                        return "rgb(0, 0, " + (d.value * 10) + ")";
                    })

                    //Tooltip
                    .on("mouseover", function(d) {
                        //Get this bar's x/y values, then augment for the tooltip
                        var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
                        var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

                        //Update Tooltip Position & value
                        d3.select("#tooltip")
                            .style("left", xPosition + "px")
                            .style("top", yPosition + "px")
                            .select("#value")
                            .text(d.value);
                        d3.select("#tooltip").classed("hidden", false)
                    })
                    .on("mouseout", function() {
                        //Remove the tooltip
                        d3.select("#tooltip").classed("hidden", false);
                    })	;

//Create labels
                svg.selectAll("text")
                    .data(dataset, key)
                    .enter()
                    .append("text")
                    .text(function(d) {
                        return d.value;
                    })
                    .attr("text-anchor", "middle")
                    .attr("x", function(d, i) {
                        return xScale(i) + xScale.rangeBand() / 2;
                    })
                    .attr("y", function(d) {
                        return h - yScale(d.value) + 14;
                    })
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "11px")
                    .attr("fill", "white");

                var sortOrder = false;
                var sortBars = function () {
                    sortOrder = !sortOrder;

                    sortItems = function (a, b) {
                        if (sortOrder) {
                            return a.value - b.value;
                        }
                        return b.value - a.value;
                    };

                    svg.selectAll("rect")
                        .sort(sortItems)
                        .transition()
                        .delay(function (d, i) {
                            return i * 50;
                        })
                        .duration(1000)
                        .attr("x", function (d, i) {
                            return xScale(i);
                        });

                    svg.selectAll('text')
                        .sort(sortItems)
                        .transition()
                        .delay(function (d, i) {
                            return i * 50;
                        })
                        .duration(1000)
                        .text(function (d) {
                            return d.value;
                        })
                        .attr("text-anchor", "middle")
                        .attr("x", function (d, i) {
                            return xScale(i) + xScale.rangeBand() / 2;
                        })
                        .attr("y", function (d) {
                            return h - yScale(d.value) + 14;
                        });
                };
// Add the onclick callback to the button
                d3.select("#sort").on("click", sortBars);
                d3.select("#reset").on("click", reset);
                function randomSort() {


                    svg.selectAll("rect")
                        .sort(sortItems)
                        .transition()
                        .delay(function (d, i) {
                            return i * 50;
                        })
                        .duration(1000)
                        .attr("x", function (d, i) {
                            return xScale(i);
                        });

                    svg.selectAll('text')
                        .sort(sortItems)
                        .transition()
                        .delay(function (d, i) {
                            return i * 50;
                        })
                        .duration(1000)
                        .text(function (d) {
                            return d.value;
                        })
                        .attr("text-anchor", "middle")
                        .attr("x", function (d, i) {
                            return xScale(i) + xScale.rangeBand() / 2;
                        })
                        .attr("y", function (d) {
                            return h - yScale(d.value) + 14;
                        });
                }
                function reset() {
                    svg.selectAll("rect")
                        .sort(function(a, b){
                            return a.key - b.key;
                        })
                        .transition()
                        .delay(function (d, i) {
                            return i * 50;
                        })
                        .duration(1000)
                        .attr("x", function (d, i) {
                            return xScale(i);
                        });

                    svg.selectAll('text')
                        .sort(function(a, b){
                            return a.key - b.key;
                        })
                        .transition()
                        .delay(function (d, i) {
                            return i * 50;
                        })
                        .duration(1000)
                        .text(function (d) {
                            return d.value;
                        })
                        .attr("text-anchor", "middle")
                        .attr("x", function (d, i) {
                            return xScale(i) + xScale.rangeBand() / 2;
                        })
                        .attr("y", function (d) {
                            return h - yScale(d.value) + 14;
                        });
                };
            },
            linegraph : function (objName) {

                var margin = {
                    top: 30,
                    right: 20,
                    bottom: 30,
                    left: 50
                };
                var width = 270 - margin.left - margin.right;
                var height = 230 - margin.top - margin.bottom;

                var parseDate = d3.time.format("%d-%b-%y").parse;

                var x = d3.time.scale().range([0, width]);
                var y = d3.scale.linear().range([height, 0]);

                var xAxis = d3.svg.axis().scale(x)
                    .orient("bottom").ticks(5);

                var yAxis = d3.svg.axis().scale(y)
                    .orient("left").ticks(5);

                var valueline = d3.svg.line()
                    .x(function (d) {
                        return x(d.date);
                    })
                    .y(function (d) {
                        return y(d.close);
                    });

                var svg = d3.select(objName)
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
                var data = [{
                    date: "1-May-12",
                    close: "58.13"
                }, {
                    date: "30-Apr-12",
                    close: "53.98"
                }, {
                    date: "27-Apr-12",
                    close: "67.00"
                }, {
                    date: "26-Apr-12",
                    close: "89.70"
                }, {
                    date: "25-Apr-12",
                    close: "99.00"
                }];

                data.forEach(function (d) {
                    d.date = parseDate(d.date);
                    d.close = +d.close;
                });

// Scale the range of the data
                x.domain(d3.extent(data, function (d) {
                    return d.date;
                }));
                y.domain([0, d3.max(data, function (d) {
                    return d.close;
                })]);

                svg.append("path") // Add the valueline path.
                    .attr("d", valueline(data));

                svg.append("g") // Add the X Axis
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g") // Add the Y Axis
                    .attr("class", "y axis")
                    .call(yAxis);


            }



        };
    }

    angular.module('graphs.d3graphs', [])
        .factory('D3Graphs', D3Graphs);
})();
