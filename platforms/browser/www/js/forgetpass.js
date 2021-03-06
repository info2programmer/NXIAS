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
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("offline", checkConnection, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        

        $('#btnforget').click(function () {
            if ($('#txtUsername').val() == ""){
                $('#txtUsername').css('border-color', 'red');
				
            }  
            else{
				$(".se-pre-con").show();
                var user_name=$('#txtUsername').val();
                var datas = { 'email': user_name};
                $.ajax({
                    type: "post",
                    url: "https://bebongstore.com/nxias/manage_api/forgotpassword",
                    data: datas,
                    // dataType: "dataType",
                    beforeSend: function () {
                        $('#btnforget').prop('disabled', true);
                    },
                    success: function (response) {
						$(".se-pre-con").hide();
                        da = $.parseJSON(response);
                        if (da.status==0){
                            // $('#msg').css('display','block');
							// $('#msg').css('color','red');
							// $('#txtUsername').val('');
							// $('#msg').text('Sorry! Please Try Again');
                            // $('#btnforget').prop('disabled', false);
                            
                            $('#msg').css('display', 'block');
                            $('#msg').css('color', 'red');
                            $('#txtUsername').val('');
                            $('#msg').text('Sorry! Mail Id Not Registered With Us');
                            $('#btnforget').prop('disabled', false);
                        }
						else if (da.status==1){
							$('#msg').css('display','block');
							$('#msg').css('color','green');
							$('#txtUsername').val('');
							$('#msg').text('Email Sent to Your Registered Email Id');
							$('#btnforget').prop('disabled', false);
							}
                        else{
                           
                        }
                    }
                });
            }       
       });
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
    
};

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


