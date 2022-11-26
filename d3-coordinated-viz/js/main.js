//begin script when window loads
window.onload = setMap();

//set up choropleth map
function setMap(){
	
	//map frame dimensions
	var width = 960,
		height = 640;

	//create new svg container for the map
	var map = d3.select("body")
		.append("svg")
		.attr("class", "map")
		.attr("width", width)
		.attr("height", height);

    //create AlbersUSA projection centered on USA
    var projection = d3.geoAlbersUsa()
        .scale(1300)
        .translate([487.5, 305])
    /*
	//create Albers equal area conic projection centered on France
	var projection = d3.geoAlbers()
		.center([0, 46.2])
		.rotate([-2, 0])
		.parallels([43, 62])
		.scale(2500)
		.translate([width / 2, height / 2]);*/

	var path = d3.geoPath()
		.projection(projection);

	//use Promise.all to parallelize asynchronous data loading
	var promises = [];
	promises.push(d3.csv("data/cropDataCSV.csv")); //load attributes from csv
	//promises.push(d3.json("data/EuropeCountries.topojson")); //load background spatial data
	promises.push(d3.json("data/UsaStatesTopoJson5.topojson")); //load choropleth spatial data
    promises.push(d3.json("data/FranceRegions.topojson"));
	Promise.all(promises).then(callback);

	function callback(data){
        
        csvData = data[0];
        usaStates = data[1];
        france = data[2];

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

        
        
        //translate states TopoJSON
        var statesFeature = topojson.feature(usaStates, usaStates.objects.states).features,
            franceRegions = topojson.feature(france, france.objects.FranceRegions).features;
        console.log(statesFeature);
        console.log(franceRegions);
        console.log(csvData);

        /*
		//translate europe TopoJSON
		var europeFeature = topojson.feature(europe, europe.objects.EuropeCountries),
			franceRegions = topojson.feature(france, france.objects.FranceRegions).features;
		*/
        
        
        
        
        //add US States to map
        var states = map.selectAll(".states")
            .data(statesFeature)
            .enter()
            .append("path")
            .attr("class", function(d) {
                  return d.properties.adm1_code;
            }).attr("d", path);
        
        
        /*
		//add Europe countries to map
		var countries = map.append("path")
			.datum(europeCountries)
			.attr("class", "countries")
			.attr("d", path);
        */
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
};