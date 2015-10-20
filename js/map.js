// Function to draw your map
var drawMap = function() {
  // Create map and set view
	var map = L.map('map').setView([40, -100], 5)
  // Create a tile layer variable using the appropriate url
	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
  // Add the layer to your map
  	layer.addTo(map)
  // Execute your function to get data
  	getData(map)

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
	/*var male = new L.LayerGroup([]);
	var female = new L.LayerGroup([]);
	var unspecified = new L.LayerGroup([]);	

	var white = new L.LayerGroup([]);
	var black = new L.LayerGroup([]);
	var asian = new L.LayerGroup([]);
	var indian = new L.LayerGroup([]);
	var hawaiian = new L.LayerGroup([]);
	var unknown = new L.LayerGroup([]);	 

	var armedHit = 0;
	var armedKill = 0;
	var unarmHit = 0;
	var unarmKill = 0;*/
	var victimKilled = new L.LayerGroup([]);
	var victimHit = new L.LayerGroup([]);
	var armedMale = 0;
	var unarmedMale = 0;
	var armedFemale = 0;
	var unarmedFemale = 0;
	for(var i = 0; i < data.length; i++) {
		if (data[i]["Hit or Killed?"] === "Killed") {               
			var circle = new L.circleMarker([data[i].lat, data[i].lng], {
				color: '#2EFEF7',
				fillColor: '#2EFEF7'
			});
			circle.setRadius(9);
			circle.addTo(victimKilled);
		}
		else {
			var circle = new L.circleMarker([data[i].lat, data[i].lng], {
				stroke: true,
				weight: 3,
				opacity: 0.7,
				color: '#FFFFFF',
				fillColor: '#FFFFFF'
			});
			circle.setRadius(3);
			circle.addTo(victimHit);
		}
		
		circle.bindPopup(data[i]["Summary"]);
		
	}
	victimKilled.addTo(map);
	victimHit.addTo(map);	
	var layers = {
		"Killed Victim": victimKilled,
		"Hit/Unspecified Victim": victimHit
	};
	
	L.control.layers(null, layers).addTo(map);	


}

	// Once layers are on the map, add a leaflet controller that shows/hides layers
  



