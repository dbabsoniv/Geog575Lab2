/* Javascript by David Babson IV, 2022 */



window.onload = setMap();

function setMap(){
    
	//map frame dimensions
	var width = 960,
		height = 460;

	//create new svg container for the map
	var map = d3.select("body")
		.append("svg")
		.attr("class", "map")
		.attr("width", width)
		.attr("height", height);

	//create Albers equal area conic projection centered on France
	var projection = d3.geoAlbers()
		.center([0, 46.2])
		.rotate([-2, 0])
		.parallels([43, 62])
		.scale(2500)
		.translate([width / 2, height / 2]);

	var path = d3.geoPath()
		.projection(projection);

	//use Promise.all to parallelize asynchronous data loading
    
    
    
	var promises = [];
	promises.push(d3.csv("data/cropDataCSV.csv")); //load attributes from csv
	promises.push(d3.json("data/UsaStatesTopoJson.topojson")); //load shoropleth spatial data
	//promises.push(d3.json("data/FranceRegions.topojson")); //load background spatial data
	Promise.all(promises).then(callback);

	function callback(data){

		csvData = data[0];
		states = data[1];
		//france = data[2];
        
        
        
        
        
        /*
		//create graticule generator
		var graticule = d3.geoGraticule()
			.step([5, 5]); //place graticule lines every 5 degrees of longitude and latitude

		//create graticule background
		var gratBackground = map.append("path")
			.datum(graticule.outline()) //bind graticule background
			.attr("class", "gratBackground") //assign class for styling
			.attr("d", path) //project graticule

		//create graticule lines	
		var gratLines = map.selectAll(".gratLines") //select graticule elements that will be created
			.data(graticule.lines()) //bind graticule lines to each element to be created
		  	.enter() //create an element for each datum
			.append("path") //append each element to the svg as a path element
			.attr("class", "gratLines") //assign class for styling
			.attr("d", path); //project graticule lines

		//translate europe TopoJSON
		var europeCountries = topojson.feature(europe, europe.objects.EuropeCountries),
			franceRegions = topojson.feature(france, france.objects.FranceRegions).features;
		
		//add Europe countries to map
		var countries = map.append("path")
			.datum(europeCountries)
			.attr("class", "countries")
			.attr("d", path);

		//add France regions to map
		var regions = map.selectAll(".regions")
			.data(franceRegions)
			.enter()
			.append("path")
			.attr("class", function(d){
				return d.properties.adm1_code;
			})
			.attr("d", path);
            
            
	};
    */
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*
    Promise.all([
        d3.csv("/data/cropDataCSV"),
        d3.json("/data/UsaStatesTopoJson")
    ]).then(function(data) {
        console.log(data[0][0])
    });
    */
    
    
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
