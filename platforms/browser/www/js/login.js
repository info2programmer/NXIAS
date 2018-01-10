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
        document.addEventListener("backbutton", onBackKeyDown, false); 
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
		// function onBackKeyDown(e) {
//			e.preventDefault();
//			navigator.notification.confirm("Are you sure you want to exit ?", onConfirm, "Confirmation", "Yes,No"); 
//			// Prompt the user with the choice
//		}
//
//		function onConfirm(button) {
//			if(button==2){//If User selected No, then we just do nothing
//				return;
//			}else{
//				navigator.app.exitApp();// Otherwise we quit the app.
//			}
//		}


		var lastTimeBackPress=0;
var timePeriodToExit=2000;

function onBackKeyDown(e){
    e.preventDefault();
    e.stopPropagation();
    if(new Date().getTime() - lastTimeBackPress < timePeriodToExit){
        navigator.app.exitApp();
    }else{
        window.plugins.toast.showWithOptions(
            {
              message: "Press again to exit.",
              duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
              position: "bottom",
              addPixelsY: -40  // added a negative value to move it up a bit (default 0)
            }
          );
        
        lastTimeBackPress=new Date().getTime();
    }
};

        $('#btnLogin').click(function () {
            if ($('#txtUsername').val() == "" || $('#txtPassword').val() ==""){
                $('#txtUsername').css('border-color', 'red');
                $('#txtPassword').css('border-color', 'red');
            }  
            else if ($('#txtUsername').val() == ""){
                $('#txtUsername').css('border-color', 'red');
            }   
            else if ($('#txtUsername').val() == "") {
                $('#txtPassword').css('border-color', 'red');
            }  
            else{
                var user_name=$('#txtUsername').val();
                var password = $('#txtPassword').val();
                var datas = { 'user_name': user_name, 'password': password};
               
                $.ajax({
                    type: "post",
                    url: "http://bebongstore.com/nxias/manage_api/login",
                    data: datas,
                    dataType: 'json',
                    beforeSend: function () {
                        $('#btnLogin').prop('disabled', true);
                    },
                    success: function (response) {
						
                        if (response.status==1){
                            
                            localStorage.setItem('name', response.student_arr.name);
                            localStorage.setItem('uname', response.student_arr.email);
                            
                            localStorage.login = "true";
                            localStorage.email = response.student_arr.email;
                            localStorage.name = response.student_arr.name;                            
                            window.location.href = "home.html";
                        }
                        else{
                            $('#txtUsername').css('border-color', 'red');
                            $('#txtPassword').css('border-color', 'red');
                            $('#txtUsername').val('');
                            $('#txtPassword').val('');
                            $('#btnLogin').prop('disabled', false);
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

// This DFunction To Get Current Location


