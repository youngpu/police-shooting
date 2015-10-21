// Function to draw your map
var drawMap = function() {
  // Create map and set view
	var map = L.map('map').setView([40, -100], 5);
  // Create a tile layer variable using the appropriate url
	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  // Add the layer to your map
  	layer.addTo(map);
  // Execute your function to get data
  	getData(map);

}

// Function for getting data
var getData = function(map) {
  // Execute an AJAX request to get the data in data/response.js
	$.ajax({
		url: "data/response.json",
		type: "get",
		success: function(dat) {
			data = dat;
			customBuild(data, map);
		},
		dataType: "json"	
	});
  // When your request is successful, call your customBuild function
}

// Loop through your data and add the appropriate layers and points
var customBuild = function(data, map) {
	// Be sure to add each layer to the map	
	var white = new L.layerGroup([]);
	var black = new L.layerGroup([]);
	var asian = new L.layerGroup([]);
	var indian = new L.layerGroup([]);
	var hawaiian = new L.layerGroup([]);
	var unknown = new L.layerGroup([]);	
	var armedMale = 0;
	var unarmedMale = 0;
	var armedFemale = 0;
	var unarmedFemale = 0;
	
	var whiteMen = 0;
	var whiteWomen = 0;
	var otherMen = 0;
	var otherWomen = 0;

	for(var i = 0; i < data.length; i++) {
		
		var race = data[i]["Race"];
		var outcome = data[i]["Hit or Killed?"];	
		var gender = data[i]["Victim's Gender"];
		var armed = data[i]["Armed or Unarmed?"];
		
		if (outcome == "Killed") {               
			var circle = new L.circleMarker([data[i].lat, data[i].lng], {
				color: '#FF1919',
				fillOpacity: 0.4,
			});
			circle.setRadius(7);
		}
		else {
			var circle = new L.circleMarker([data[i].lat, data[i].lng], {
				color: 'Black',
				fillOpacity: 0.4,
			});
			circle.setRadius(6);
		}
		
		if (race == "White") {
			circle.addTo(white);
		} else if (race == "Black or African American") {
			circle.addTo(black);
		} else if (race == "Asian") {
			circle.addTo(asian);
		} else if (race == "American Indian or Alaska Native") {
			circle.addTo(indian);
		} else if (race == "Native Hawaiian or Other Pacific Islander") {
			circle.addTo(hawaiian);
		} else {
			circle.addTo(unknown);				
		}				
		
		circle.bindPopup(data[i].Summary + " (" + "read more".link(data[i]["Source Link"]) + ")");	
		
		if (armed == "Armed") {
			if (gender == "Male") {
				armedMale++;
			} else {
				armedFemale++;
			}
		} else {
			if (gender == "Male") {
				unarmedMale++;
			} else {
				unarmedFemale++;
			}
		}

		if (race == "White") {
			if (gender == "Male") {
				whiteMen++;
			} else {
				whiteWomen++;
			}
		} else {
			if (gender == "Male") {
				otherMen++;
			} else {
				otherWomen++;
			}
		}

	}
	
	var raceLayers = {
		"Unknown": unknown,		
		"White": white, 
		"Black or African American": black, 
		"Asian": asian, 
		"American Indian or Alaska Native": indian, 
		"Native Hawaiian or Other Pacific Islander": hawaiian
	}

	L.control.layers(null, raceLayers).addTo(map);  

	document.getElementById("whiteMen").innerHTML = whiteMen;
	document.getElementById("whiteWomen").innerHTML = whiteWomen;
	document.getElementById("otherMen").innerHTML = otherMen;
	document.getElementById("otherWomen").innerHTML = otherWomen;	
}

  



