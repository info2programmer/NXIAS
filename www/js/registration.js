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
        document.addEventListener("offline", checkConnection, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // app.receivedEvent('deviceready');
		$('#btnReg').click(function () { 
									 
        //var element = document.getElementById('deviceProperties');

        //element.innerHTML = 'Device Name: '     + device.name     + '<br />' + 
        //                            'Device Cordova: '  + device.cordova  + '<br />' + 
        //                            'Device Platform: ' + device.platform + '<br />' + 
        //                            'Device UUID: '     + device.uuid     + '<br />' + 
        //                            'Device Version: '  + device.version  + '<br />';
        //var datas = { 'div_id': 1, 'dev_name': device.name };
		
       		var first_name = $('#name').val();
            var email = $("#email").val();
            var phn = $("#phn").val();
			var pass = $("#password").val();
			var cnfpass = $("#conf_pass").val();
			var qualification = $("#qualification").val();
            var datas = { 'name': first_name, 'email': email, 'phn': phn, 'pass': pass, 'cnfpass': cnfpass, 'qualification': qualification, 'regsub': 'regsubmit' };
            if (first_name == "" || email== "" || phn=="" || pass=="" || cnfpass=="" || qualification==""){
                if (first_name == ""){
                    $('#name').css('border-color', 'red');
                }
                if (email == "") {
                    $('#email').css('border-color', 'red');
                }
                if (phn == "") {
                    $('#phn').css('border-color', 'red');
                }
				if (pass == "") {
                    $('#password').css('border-color', 'red');
                }
				if (cnfpass == "") {
                    $('#conf_pass').css('border-color', 'red');
                }
				if (qualification == "") {
                    $('#qualification').css('border-color', 'red');
                }
            }
            else{
				$(".se-pre-con").show();
                $.ajax({
                    type: "post",
                    url: "https://bebongstore.com/nxias/manage_api/registration1",
                    data: datas,
					datatype:'json',
                    beforeSend: function () {
                        $('#btnReg').prop('disabled', true);
                    },
                    success: function (response) {
                        var da = $.parseJSON(response);
                        // console.log(d.status);
                        $('#btnReg').prop('disabled', false);
                        if (da.status==1){
							$('#msg').css('display','none');
                             window.location.href = "registration-next.html";   
                        }
                        else if (da.status == 2){
							navigator.notification.beep(1);
							showAlert();
							window.location.href = "login.html";
                        }
						else {
                            // console.log('Mismatch');
							navigator.notification.beep(1);
							showcnfpass();
							window.location.href = "registration.html"; 
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
function showAlert() {
    navigator.notification.alert(
        'Email Already Exist.Please Login.',  // message
        alertDismissed,         // callback
        'Already Registered !',            // title
        'OK'                  // buttonName
    );
}
function alertDismissed() {
    // do something
}
function showcnfpass() {
    navigator.notification.alert(
        'Password and Confirm Password Do Not Match.',  // message
        alertDismissed,         // callback
        'Mismatch!',            // title
        'OK'                  // buttonName
    );
}
// This Function For Check Internet Connection
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    // alert('Connection type: ' + states[networkState]);
    alert('No Internet Connection');
    // navigator.app.exitApp();
}