
function makeMap(data) {
    var width = 1500,
    height = 700;

    // projection-settings for mercator    
    var projection = d3.geo.mercator()
        // where to center the map in degrees
        .center([0, 50 ])
        // zoomlevel
        .scale(120)
        // map-rotation
        .rotate([0,0]);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var path = d3.geo.path()
        .projection(projection);

    var g = svg.append("g");

    d3.json("../resources/world-110m.json", function(error, topology) {
        g.selectAll("path")
            .data(topojson.feature(topology, topology.objects.countries)
                    .features)
            .enter()
            .append("path")
            .attr("d", path)

         svg.selectAll("circle")
		.data(data).enter()
		.append("circle")
		.attr("cx", function (d) { return projection(d['pos'])[0]; })
		.attr("cy", function (d) { return projection(d['pos'])[1]; })
		.attr("r", "3px")
        .attr("id", function (d) { return d['id'] });
		.attr("fill", "red")
        .attr("class", "pos")
        .on('click', circleClicked);
    });
}

function circleClicked(data) {
    console.log(data);
}
