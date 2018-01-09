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
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // app.receivedEvent('deviceready');

        // Page Onload State Generate 
        $.ajax({
            type: "post",
            url: "https://bebongstore.com/nxias/manage_api/get_state",
            dataType: "json",
            success: function (response) {
                // var da = $.parseJSON(response);
                if (response.status == 1) {
                    $.each(response.states, function (val, text) {
                        var state = text.state;
                        $('#state').append($('<option></option>').val(state).html(state));
                    });
                }
            }
        }); 

        // Page Onload Course Generate 
        
        
        // State Onchange Get City
        $('#state').change(function () { 
            $('#city').empty();
            $('#course').empty();
            var datas = { 'state': $('#state').val()};
            $.ajax({
                type: "post",
                url: "https://bebongstore.com/nxias/manage_api/get_city",
                data:datas,
                dataType: "json",
                success: function (response) {
                    // var da = $.parseJSON(response);
                    if (response.status == 1) {
                        $.each(response.cities, function (val, text) {
                            var city = text.city;
                            $('#city').append($('<option></option>').val(city).html(city));
                        });
                    }
                }
            });    
            
            $.ajax({
                type: "post",
                url: "https://bebongstore.com/nxias/manage_api/get_course",
                dataType: "json",
                data:datas,
                success: function (response) {
                    // var da = $.parseJSON(response);
                    if (response.status == 1) {
                        $.each(response.courses, function (val, text) {
                            var course_name = text.course_name;
                            $('#course').append($('<option></option>').val(course_name).html(course_name));
                        });
                    }
                    else{
                        $('#course').append($('<option></option>').val('').html('No Course Available'));
                    }
                }
            }); 
        });


		$('#logbtn').click(function () { 
            var location = getCurrentLocation();
            // console.log(location);
									 
        var element = document.getElementById('deviceProperties');

        //element.innerHTML = 'Device Name: '     + device.name     + '<br />' + 
        //                            'Device Cordova: '  + device.cordova  + '<br />' + 
        //                            'Device Platform: ' + device.platform + '<br />' + 
        //                            'Device UUID: '     + device.uuid     + '<br />' + 
        //                            'Device Version: '  + device.version  + '<br />';
        //var datas = { 'div_id': 1, 'dev_name': device.name };
		
       		var mode = $('#mode').val();
            var state = $("#state").val();
            var city = $("#city").val();
			var course = $("#course").val();
            var datas = { 'mode': mode, 'state': state, 'city': city, 'course': course, 'regsubf': 'regsubmitfinal', 'devicename': device.name, 'deviceuuid': device.uuid, 'deviceversion': device.version, 'reg_zone': location };
            if (mode == "" || state== "" || city=="" || course==""){
                if (mode == ""){
                    $('#mode').css('border-color', 'red');
                }
                if (state == "") {
                    $('#state').css('border-color', 'red');
                }
                if (city == "") {
                    $('#city').css('border-color', 'red');
                }
				if (course == "") {
                    $('#course').css('border-color', 'red');
                }
            }
            else{
                $.ajax({
                    type: "post",
                    url: "https://bebongstore.com/nxias/manage_api/registration2",
                    data: datas,
					datatype:'json',
                    beforeSend: function () {
                        $('#logbtn').prop('disabled', true);
                    },
                    success: function (response) {
                        $('#logbtn').prop('disabled', false);
                        var da = $.parseJSON(response);
                        //console.log(response);
                        var resp = response.split("-");
                        if (da.status=="1"){
                            $('#msg').css('display','none');
                            localStorage.setItem('name', da.name);
                            localStorage.setItem('uname', da.email);                            

                            localStorage.login = "true";
                            localStorage.email = da.email;
                            localStorage.name = da.name;
                            window.location.href = "home.html";   
                        }
						else {
							$('#msg').css('display','block');
							$('#msg').css('color','red');
							$('#msg').text('Slow Day! Please Try Again After Sometime');
						}
                    }
                });
            }
		});	
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
function onSuccess(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    // var element = document.getElementById('geolocation');
    // element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
    //     'Longitude: ' + position.coords.longitude + '<br />' +
    //     'Altitude: ' + position.coords.altitude + '<br />' +
    //     'Accuracy: ' + position.coords.accuracy + '<br />' +
    //     'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
    //     'Heading: ' + position.coords.heading + '<br />' +
    //     'Speed: ' + position.coords.speed + '<br />' +
    //     'Timestamp: ' + new Date(position.timestamp) + '<br />';
    var lat_long = latitude + ":" + longitude;
    return lat_long;
}

function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}
