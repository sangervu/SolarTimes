/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	deviceReadyDeferred : $.Deferred(),
	jqmReadyDeferred : $.Deferred(),
	// Application Constructor
	initialize : function() {
		this.bindEvents();
		$.when(this.deviceReadyDeferred, this.jqmReadyDeferred).then(
				this.frameworksInitialized);
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		$(document).on("mobileinit", function() {
			app.jqmReadyDeferred.resolve();
		});
	},
	// deviceready Event Handler
	onDeviceReady : function() {
		app.deviceReadyDeferred.resolve();
		 // onSuccess Callback
        //   This method accepts a `Position` object, which contains
        //   the current GPS coordinates
        //
        function onSuccess(position) {
        	var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			
			document.getElementById('lat').innerHTML = Math.round(latitude * 100) / 100;
			document.getElementById('lon').innerHTML = Math.round(longitude * 100) / 100;
			
			var geocoder ;
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(latitude, longitude);
            //alert("Else loop" + latlng);
            geocoder.geocode({'latLng': latlng}, function(results, status)
             {
                 //alert("Else loop1");
                 if (status == google.maps.GeocoderStatus.OK)
                  {
                         if (results[0])
                         {
                             var add= results[0].formatted_address ;
                             var  value=add.split(",");

                             count=value.length;
                             country=value[count-1];
                             state=value[count-2];
                             city=value[count-3];
                             document.getElementById('loc').innerHTML = state;
                             //alert("city name is: " + city);
                         }
                         else 
                         {
                   alert("address not found");
                         }
                 }
                  else
                 {
                 //document.getElementById("location").innerHTML="Geocoder failed due to: " + status;
                 //alert("Geocoder failed due to: " + status);
                 }
             });
        }

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

        // Options: throw an error if no update is received every 30 seconds.
        //
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
	},
	// jQM and PhoneGap initialized
	// place app initialization code here
	frameworksInitialized : function() {
		console.log('Frameworks initialized');
	}
};

app.initialize();
    