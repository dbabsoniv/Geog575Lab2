/* Javascript by David Babson IV, 2022 */



window.onload = setMap();

function setMap(){
    Promise.all([
        d3.csv("/data/cropDataCSV"),
        d3.json("/data/UsaStatesTopoJson")
    ]).then(function(data) {
        console.log(data[0][0])
    });
    
    /*
    d3.queue()
        .defer(d3.csv, "data/cropDataCSV")
        .defer(d3.json, "data/UsaStatesTopoJson.topojson")
        .await(callback);
    
    function callback(error, csvData, states) {
        console.log(error);
        console.log(csvData);
        console.log(states);
    }
    */
};



















/*
window.onload = function () {
    
    //SVG dimension variables
    var w = 900, h = 500;

    var container = d3.select("body") //get the <body> element from the DOM
        .append("svg") //put a new svg in the body
        .attr("width", w) //assign the width
        .attr("height", h) //assign the height
        .attr("class", "container") //assign a class name
        .style("background-color", "rgba(0,0,0,0.2)"); //svg background color

    //innerRect block
    var innerRect = container.append("rect")
        .datum(400) //a single value is a DATUM
        .attr("width", function(d){ //rectangle width
            return d * 2; //400 * 2 = 800
        })
        .attr("height", function(d){ //rectangle height
            return d; //400
        })
        .attr("class", "innerRect") //class name
        .attr("x", 50) //position from left on the x (horizontal) axis
        .attr("y", 50) //position from top on the y (vertical) axis
        .style("fill", "#FFFFFF"); //fill color
    
    var dataArray = [10, 20, 30, 40, 50];
    var cityPop = [
        { 
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
    ];
    
    
    
    
    
    var circles = container.selectAll(".circles") //but wait--there are no circles yet!
        .data(cityPop) //here we feed in an array
        .enter() //one of the great mysteries of the universe
        .append("circle") //add a circle for each datum
        .attr("class", "circles") //apply a class name to all circles
        .attr("id", function(d){
            return d.city;
        })
        .attr("r", function(d){
            //calculate the radius based on population value as circle area
            var area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){
            //use the index to place each circle horizontally
            return 90 + (i * 180);
        })
        .attr("cy", function(d){
            //subtract value from 450 to "grow" circles up from the bottom instead of down from the top of the SVG
            return 450 - (d.population * 0.0005);
        });
    
    
    
    
        var x = d3.scaleLinear()  //create the scale
        .range([90, 810]) //output min and max
        .domain([0, 3]); //input min and max
        .attr("cx", function(d, i){
            //use the scale generator with the index to place each circle horizontally
            return x(i);
        })
    
        var minPop = d3.min(cityPop, function(d){
            return d.population;
        });

        //find the maximum value of the array
        var maxPop = d3.max(cityPop, function(d){
            return d.population;
        });

        //scale for circles center y coordinate
        var y = d3.scaleLinear()
            .range([440, 95])
            .domain([
                minPop,
                maxPop
            ]);
    
    
    
    
    console.log(innerRect);
    //console.log("tried grabbing container");
    //console.log(container);
};
*/
