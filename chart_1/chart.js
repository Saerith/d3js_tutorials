var data = [3, 8, 12, 20, 28, 32, 55];

// function to linearly scale our represented data to our desired width, 500px
var scale = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 500]);

// selects all divs in class chart and appends them with new divs containing the specified style and text
d3.select('.chart')
    .selectAll('div')
        // selection.data joins the selection with the specified array of values ("data" in this case)
        // https://github.com/mbostock/d3/wiki/Selections#data
        .data(data)
    // enter returns a selection which contains a collection of nodes, one for each data element that doesn't belong to a DOM
    // https://github.com/mbostock/d3/wiki/Selections#enter
    .enter().append('div')
        .style('width', function(d) {
            return scale(d) + "px";
        })
        .text(function(d) {
            return d;
        });