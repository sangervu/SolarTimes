var distances = [];

function getLocation() {
	
var MathNew = {
		
		deg2rad: function(deg)
		{
		return deg*(Math.PI)/180;
		},

		rad2deg: function(rad)
		{
		return rad*180/(Math.PI);
		},
		
		roundDesimal_1: function (rnd) {
		    rnd = rnd * 10;
		    rnd = Math.round(rnd);
		    rnd = rnd/10;
		return rnd;
		},
		
		trueTan: function(y, x)
		{
		var alfa = y/x;
        	alfa = Math.atan(alfa)*180/(Math.PI);
        //if (y >= 0 & x > 0)
        	//alfa = y/x;
        if (y >= 0 & x < 0)
        	alfa = alfa + 180;
        if (y < 0 & x > 0)
        	alfa = alfa + 360;
        if (y < 0 & x < 0)
        	alfa = alfa + 180;
        return alfa;
		},
};	
	//Sites in Finland, Get nearest location
	//Helsinki
	var lat2 = 60.20;
	var lon2 = 24.96;
	getDistance(lat2, lon2);
	distances[distances.length] = Math.round(distance);
	
	//Jokioinen 	
	var lat2 = 60.81;
	var lon2 = 23.50;
	getDistance(lat2, lon2);
	distances[distances.length] = Math.round(distance);
	
	//Jyv�skyl� 	
	var lat2 = 62.40;
	var lon2 = 25.68;
	getDistance(lat2, lon2);
	distances[distances.length] = Math.round(distance);
	
	//Sotkamo 	
	var lat2 = 64.11;
	var lon2 = 28.34;
	getDistance(lat2, lon2);
	distances[distances.length] = Math.round(distance);
	
	//Sodankyl� 	
	var lat2 = 67.14;
	var lon2 = 26.90;
	getDistance(lat2, lon2);
	distances[distances.length] = Math.round(distance);
	
	//Ut�
	var lat2 = 59.78;
	var lon2 = 21.37;
	getDistance(lat2, lon2);
	distances[distances.length] = Math.round(distance);
	getShortestDistance();
	
	//Kokem�ki Tulkkila
	var lat2 = 61.25;	
	var lon2 = 22.35;
	getDistance(lat2, lon2);
	distances[distances.length] = Math.round(distance);
	getShortestDistance();
	
	//Portugali Funchal
	var lat2 = 32.643;	
	var lon2 = -16.922;
	getDistance(lat2, lon2);
	distances[distances.length] = Math.round(distance);
	getShortestDistance();
	
	//Italia Monte Rosa
	var lat2 = 45.9;	
	var lon2 = 7.86;
	getDistance(lat2, lon2);
	distances[distances.length] = Math.round(distance);
	getShortestDistance();

function getDistance(lat2,lon2){
	var R = 6371; // km	
	var lat1 = document.getElementById('lat').innerHTML;
	var lon1 = document.getElementById('lon').innerHTML;

	var lat1Rad = MathNew.deg2rad(lat1);
	//var lon1Rad = MathNew.deg2rad(lon1);
	var lat2Rad = MathNew.deg2rad(lat2);
	var deltaLatRad = MathNew.deg2rad(lat2-lat1);
	var deltaLonRad = MathNew.deg2rad(lon2-lon1);

	var a = Math.sin(deltaLatRad/2) * Math.sin(deltaLatRad/2) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLonRad/2) * Math.sin(deltaLonRad/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	return distance = R * c;
	};
	
function getShortestDistance (){
	distances.sort(function(a, b){return a-b;});
	document.getElementById("dist").innerHTML = distances[0];
	};
	
	//Select the nearest site by comparing to the shortest distance 
	//Jokioinen 	
	var lat2 = 60.81;
	var lon2 = 23.50;
	getDistance(lat2, lon2);
	distance = Math.round(distance);
	if (distance == distances[0]){
	document.getElementById('kuva').src = "http://cdn.fmi.fi/legacy-fmi-fi-content/products/global-ultraviolet-index/plot.php?location=jokioinen&lang=fi&day=0";
	document.getElementById('lat2').innerHTML = lat2;
	document.getElementById('lon2').innerHTML = lon2;
	document.getElementById('site').innerHTML = "Jokioinen";
	}
	//Jyv�skyl� 	
	var lat2 = 62.40;
	var lon2 = 25.68;
	getDistance(lat2, lon2);
	distance = Math.round(distance);
	if (distance == distances[0]){
	document.getElementById('lat2').innerHTML = lat2;
	document.getElementById('lon2').innerHTML = lon2;
	document.getElementById('site').innerHTML = "Jyv&#228;skyl&#228;";
	document.getElementById('kuva').src = "http://cdn.fmi.fi/legacy-fmi-fi-content/products/global-ultraviolet-index/plot.php?location=jyv-skyl&lang=fi&day=0";
	}
	//Sotkamo 	
	var lat2 = 64.11;
	var lon2 = 28.34;
	getDistance(lat2, lon2);
	distance = Math.round(distance);
	if (distance == distances[0]) {
	document.getElementById('lat2').innerHTML = lat2;
	document.getElementById('lon2').innerHTML = lon2;
	document.getElementById('site').innerHTML = "Sotkamo";
	document.getElementById('kuva').src = "http://cdn.fmi.fi/legacy-fmi-fi-content/products/global-ultraviolet-index/plot.php?location=sotkamo&lang=fi&day=0";
	}
	//Sodankylä
	var lat2 = 67.14;
	var lon2 = 26.90;
	getDistance(lat2, lon2);
	distance = Math.round(distance);
	if (distance == distances[0]){
	document.getElementById('lat2').innerHTML = lat2;
	document.getElementById('lon2').innerHTML = lon2;
	document.getElementById('site').innerHTML = "Sodankyl&#228;";
	document.getElementById('kuva').src = "http://cdn.fmi.fi/legacy-fmi-fi-content/products/global-ultraviolet-index/plot.php?location=sodankyl&lang=fi&day=0";
	}
	//Utö
	var lat2 = 59.78;
	var lon2 = 21.37;
	getDistance(lat2, lon2);
	distance = Math.round(distance);
	if (distance == distances[0]){
	document.getElementById('lat2').innerHTML = lat2;
	document.getElementById('lon2').innerHTML = lon2;
	document.getElementById('site').innerHTML = "Ut&#246;";
	document.getElementById('kuva').src = "http://cdn.fmi.fi/legacy-fmi-fi-content/products/global-ultraviolet-index/plot.php?location=ut&lang=fi&day=0";
	}
	//Helsinki
	var lat2 = 60.20;
	var lon2 = 24.96;
	getDistance(lat2, lon2);
	distance = Math.round(distance);
	if (distance == distances[0]){
	document.getElementById('lat2').innerHTML = lat2;
	document.getElementById('lon2').innerHTML = lon2;
	document.getElementById('site').innerHTML = "Helsinki";
	document.getElementById('kuva').src = "http://cdn.fmi.fi/legacy-fmi-fi-content/products/global-ultraviolet-index/plot.php?location=helsinki&lang=fi&day=0";
	}
	//Funchal Madeira
	var lat2 = 32.643;	
	var lon2 = -16.922;
	getDistance(lat2, lon2);
	distance = Math.round(distance);
	if (distance == distances[0]){
	document.getElementById('lat2').innerHTML = lat2;
	document.getElementById('lon2').innerHTML = lon2;
	document.getElementById('site').innerHTML = "Funchal";
	document.getElementById('kuva').src = "http://cdn.fmi.fi/legacy-fmi-fi-content/products/global-ultraviolet-index/plot.php?location=funchal&lang=fi&day=0";
	}
	//Monte Rosa
	var lat2 = 45.9;	
	var lon2 = 7.86;
	getDistance(lat2, lon2);
	distance = Math.round(distance);
	if (distance == distances[0]){
	document.getElementById('lat2').innerHTML = lat2;
	document.getElementById('lon2').innerHTML = lon2;
	document.getElementById('site').innerHTML = "Monte Rosa";
	document.getElementById('kuva').src = "http://cdn.fmi.fi/legacy-fmi-fi-content/products/global-ultraviolet-index/plot.php?location=monte-rosa&lang=fi&day=0";
	}
}