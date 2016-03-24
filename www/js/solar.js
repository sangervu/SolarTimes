function getUVI() {
	
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	
	var timeZone_h = date.getTimezoneOffset()/60;
	var julian = 367 * year - Math.floor((7 * (year + (month+1 + 9) / 12)) / 4) - Math.floor((3 * ( (year + (month+1 - 9) / 7) / 100 + 1)) / 4) + Math.floor(275 * (month+1) / 9 + day + 1721028.5);
	var T = (julian - 2451545.)*0.000027378507871321;
	
	var longitude = document.getElementById('lon').innerHTML;
	var latitude = document.getElementById('lat').innerHTML;
	
	var MathNew = {
		    deg2rad: function(deg)
		    {
		    return deg*(Math.PI)/180;
		    },
	
		    rad2deg: function(rad)
		    {
		    return rad*180/(Math.PI);
		    },
		    
		    minHour: function(hour)
		    {
		    while (hour >=24) {
		        hour = hour - 24;
		        }
		    while (hour < 0) {
		        hour = hour + 24;
		        }
		    return hour;
		    },
		    
		    minDegree: function(min)
			{
			while (min >= 360.) {
		       min = min - 360.;
		       }
		    while (min < 0.){
		       min = min + 360.;
		       }
		    return min;
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
			
			roundDesimal_1: function (rnd) {
			    rnd = rnd * 10;
			    rnd = Math.round(rnd);
			    rnd = rnd/10;
			    return rnd;
			},
		};
	
	var Lo_rad = MathNew.deg2rad(MathNew.minDegree((280.46646+36000.76983*T+0.0003032*T*T)));
	var M_rad = MathNew.deg2rad(MathNew.minDegree((357.52911 + 35999.05029*T - 0.0001537*T*T)));
	var C_rad = MathNew.deg2rad((1.914602-0.004817*T-0.000014*T*T)*Math.sin(M_rad)+(0.019993-0.000101*T)*Math.sin(2*M_rad)+ 0.000289*Math.sin(3*M_rad));
	
	var epsilon_rad = MathNew.deg2rad(23 + 26./ 60.+ 21.448 / 3600 - 46.815 / 3600 * T - 0.00059 / 3600 * T*T + 0.001813 *T*T*T);
	
	var x = Math.cos(Lo_rad + C_rad);
    var y = Math.cos(epsilon_rad) * Math.sin(Lo_rad + C_rad);
	
    var alfaSun_rad = MathNew.deg2rad(MathNew.trueTan(y,x));
    var deltaSun_rad = (Math.asin(Math.sin(epsilon_rad) * Math.sin(Lo_rad + C_rad)));
    var deltaSun_deg = MathNew.rad2deg(deltaSun_rad);
	
	var stellarTime_hour = MathNew.minHour((24110.54841+8640184.812866*T+0.093104*(T*T)-0.0000062*(T*T*T))/3600);
	var timeStellarLocal_deg = MathNew.minDegree((stellarTime_hour + 1.002737908*(hour + timeZone_h + minute/60) + longitude/15)*360/24);
	
	var hour_rad = MathNew.deg2rad(timeStellarLocal_deg) - alfaSun_rad;
	//var hour_deg = MathNew.rad2deg(hour_rad);
	var latitude_rad = MathNew.deg2rad(latitude);
	
	var elevation_rad = (Math.asin(Math.sin(deltaSun_rad) * Math.sin(latitude_rad) + Math.cos(hour_rad) * Math.cos(deltaSun_rad) * Math.cos(latitude_rad)));
	//var elevation_deg = MathNew.rad2deg(elevation_rad);
	var elevationMax_deg = 90 + deltaSun_deg - latitude;
	var elevationMax_rad = MathNew.deg2rad(elevationMax_deg);
		
	var a = 2.696056; var b = 5.474571; var c = -0.09888; var d = 0.040392;
	var m = 1./Math.cos(Math.asin(6371./6393.*Math.sin((Math.PI/2 - elevation_rad))));
	var m_max = 1./Math.cos(Math.asin(6371./6393.*Math.sin((Math.PI/2 - elevationMax_rad))));

	var uvIndex = 1.25 * Math.pow(Math.cos(Math.PI/2 - elevation_rad), a) * Math.exp(b + c*m + d*m*m)/25.;
	var uvIndexMax = 1.25 * Math.pow(Math.cos(Math.PI/2 - elevationMax_rad), a) * Math.exp(b + c*m_max + d*m_max*m_max)/25.;
	
	if (isNaN(uvIndex))
		uvIndex = 0;
	if (isNaN(uvIndexMax))
		uvIndexMax = 0;
	
	// Set background color based on UVI index
		if (uvIndex < 11)
		setBgColorById ("rgb(153,140,255)");
		if (uvIndex < 10)
		setBgColorById ("rgb(181,76,255)");
		if (uvIndex < 9)
		setBgColorById ("rgb(255,0,153)");
		if (uvIndex < 8)
		setBgColorById ("rgb(216,0,29)");
		if (uvIndex < 7)
		setBgColorById ("rgb(232,44,14)");
		if (uvIndex < 6)
		setBgColorById ("rgb(248,89,0)");
		if (uvIndex < 5)
		setBgColorById ("rgb(248,135,0)");
		if (uvIndex < 4)
		setBgColorById ("rgb(248,182,0)");
		if (uvIndex < 3)
		setBgColorById ("rgb(160,206,0)");
		if (uvIndex < 2)
		setBgColorById ("rgb(78,180,0)");
		if (uvIndex < 1)
		setBgColorById ("rgb(190,190,190)");
	
	document.getElementById('uvi').value = MathNew.roundDesimal_1(uvIndex);
	document.getElementById('uvi_max').value = MathNew.roundDesimal_1(uvIndexMax);
	document.getElementById('sun_power').value = MathNew.roundDesimal_1(SunPower(elevation_rad));
	}

function SunPower(elevation) {
    var sunPower = 1350.0 * Math.sin(elevation) * Math.pow(0.78,(1/Math.sin(elevation)));
    //var sunPower = 1100 * Math.exp(-0.17/Math.sin(elevation));
    if(elevation < 0)
        sunPower = 0;
    return sunPower;
    }

function setBgColorById(sColor) {
 var elem;
 if (document.getElementById) {
  if (elem=document.getElementById('uvi_color')) {
   if (elem.style) {
    elem.style.backgroundColor=sColor;
    return 1;  // success
   }
  }
 }
 return 0;  // failure
}
	//UVI color code = sColor
	//0 rgb(190,190,190)
	//1 rgb(78,180,0)
	//2 rgb(160,206,0)
	//3 rgb(247,228,0)
	//4 rgb(248,182,0)
	//5 rgb(248,135,0)
	//6 rgb(248,89,0)
	//7 rgb(232,44,14)
	//8 rgb(216,0,29)
	//9 rgb(255,0,153)
	//10 rgb(181,76,255)
	//11 rgb(153,140,255)
	//12 rgb(133,120,235)
	//13 rgb(113,100,215)
	//14 rgb(93,80,195)
	//15 rgb(73,60,175)
	//16 rgb(  )
	//17 rgb(  )
	//18 rgb(  )
