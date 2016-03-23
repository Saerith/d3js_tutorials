//var data = [1, 1, 2, 3, 5, 8, 13, 21, 34];

// these are loaded before the download of other resources starts
var width = 500, barHeight = 20;

var x = d3.scale.linear()
    //.domain([0, d3.max(data)])
    .range([0, width]);

var chart = d3.select('.chart')
    .attr('width', width)
    //.attr('height', barHeight * data.length);


// tab separated values. These run after the download finishes.
d3.tsv('data.tsv', type, function(error, data) {

    // d is an object now, not a number. To return a number, we must refer to d.value
    x.domain([0, d3.max(data, function(d) { return d.value; })]);

    chart.attr('height', barHeight * data.length);

    // g is an element used to group svg shapes
    var bar = chart.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('transform', function(d, i) { return 'translate(0,' + i * barHeight + ')';});

    bar.append('rect')
        .attr('width', function(d) { return x(d.value); })
        // 1px separation between bars
        .attr('height', barHeight - 1);

    bar.append('text')
        .attr('x', function(d) { return x(d.value) - 3; })
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text(function(d) { return d.value; });
});

// runs while files are downloading
// type conversion function
function type(d) {
    d.value = +d.value; //coerce to number, kind of like a cast
    return d;
}


