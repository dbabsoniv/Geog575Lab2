//variables for data join
var attrArray = ["id","adm1_code","state","barley%","bean%","chickpea%","corn%","cotton%","flaxseed%","maple%","oat%","peanut%","potato%","rice%","soybean%","sugarcane%","sunflower%","taro%","tobacco%","wheat%"]; //list of attributes
var expressed = attrArray[3]; //initial attribute

//begin script when window loads
window.onload = setMap();

//set up choropleth map
function setMap(){
	
    //////// MAP, PROJECTION, PATH ////////
	//map frame dimensions
	var width = window.innerWidth * 0.5,
        height = 460;
	//create new svg container for the map
	var map = d3.select("body")
		.append("svg")
		.attr("class", "map")
		.attr("width", width)
		.attr("height", height);
    //create AlbersUSA projection centered on USA
    var projection = d3.geoAlbersUsa()
        .scale(500)//was 1300
        .translate([487.5, 305])
	var path = d3.geoPath()
		.projection(projection);

    //////// QUEUE BLOCKS ////////
	//use Promise.all to parallelize asynchronous data loading
	var promises = [];
	promises.push(d3.csv("data/cropDataCSV.csv")); //load attributes from csv
	//promises.push(d3.json("data/EuropeCountries.topojson")); //load background spatial data
	promises.push(d3.json("data/UsaStatesTopoJson5.topojson")); //load choropleth spatial data
	Promise.all(promises).then(callback);

    
	function callback(data){
        csvData = data[0];
        usaStates = data[1];

        setGraticule(map, path);
        
        //translate states TopoJSON
        var statesFeature = topojson.feature(usaStates, usaStates.objects.states).features;
        console.log(statesFeature);
        console.log(csvData);
        
        //join csv data to GeoJSON enumeration units
        statesFeature = joinData(statesFeature, csvData);
        
        //create the color scale
        var colorScale = makeColorScale(csvData);

        //add enumeration units to the map
        setEnumerationUnits(statesFeature, map, path, colorScale);
        
        //add coordinated visualization to the map
        setChart(csvData, colorScale);
        
	};
};


//////// GRATICULE ////////
function setGraticule(map, path) {
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
};


function joinData(statesFeature, csvData){
    //loop through csv to assign each set of csv attribute values to geojson states
    for (var i=0; i<csvData.length; i++){
        var csvState = csvData[i]; //the current state
        var csvKey = csvState.state; //the CSV state name //was the CSV primary key

        //loop through geojson states to find correct state
        for (var a=0; a<statesFeature.length; a++){

            var geojsonProps = statesFeature[a].properties; //the current state geojson properties
            var geojsonKey = geojsonProps.name; //the geojson key-> the stateFeature Name

            //where primary keys match, transfer csv data to geojson properties object
            if (geojsonKey == csvKey){

                //assign all attributes and values
                attrArray.forEach(function(attr){
                    var val = parseFloat(csvState[attr]); //get csv attribute value
                    geojsonProps[attr] = val; //assign attribute and value to geojson properties
                });
            };
        };
    };
    
    return statesFeature;
};

function setEnumerationUnits(statesFeature, map, path, colorScale) {
    //add US States to map
    var states = map.selectAll(".states")
        .data(statesFeature)
        .enter()
        .append("path")
        .attr("class", function(d){
            return "state " + d.properties.name;
        })
        .attr("d", path)
        .style("fill", function(d){
            return colorScale(d.properties[expressed]);
        })
        .style("stroke", "#000")
        .style("stroke-width", "3px")
        .style("stroke-linecap", "round");
};

//function to create color scale generator
function makeColorScale(data){
    var colorClasses = [
        "#ffffd4",
        "#fee391",
        "#fec44f",
        "#fe9929",
        "#d95f0e",
        "#993404"
    ];

    //create color scale generator
    var colorScale = d3.scaleQuantile()
        .range(colorClasses);

    //build array of all values of the expressed attribute
    var domainArray = [];
    for (var i=0; i<data.length; i++){
        var val = parseFloat(data[i][expressed]);
        domainArray.push(val);
    };

    //assign array of expressed values as scale domain
    colorScale.domain(domainArray);

    return colorScale;
};

//function to create coordinated bar chart
function setChart(csvData, colorScale){
    //chart frame dimensions
    var chartWidth = window.innerWidth * 0.425,
        chartHeight = 460;

    //create a second svg element to hold the bar chart
    var chart = d3.select("body")
        .append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight)
        .attr("class", "chart");
    
       //create a scale to size bars proportionally to frame
    var yScale = d3.scaleLinear()
        .range([0, chartHeight])
        .domain([0, 105]);

    //Example 2.4 line 8...set bars for each province
    var bars = chart.selectAll(".bars")
        .data(csvData)
        .enter()
        .append("rect")
        .attr("class", function(d){
            return "bars " + d.adm1_code;
        })
        .attr("width", chartWidth / csvData.length - 1)
        .attr("x", function(d, i){
            return i * (chartWidth / csvData.length);
        })
        .attr("height", function(d){
            return yScale(parseFloat(d[expressed]));
        })
        .attr("y", function(d){
            return chartHeight - yScale(parseFloat(d[expressed]));
        })
        /*//Example 2.5 line 23...end of bars block
        .style("fill", function(d){
            return choropleth(d, colorScale);
        })*/;
};