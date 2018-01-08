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
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        

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
                    url: "http://spmgroupindia.com/NXIAS_APIS/chklogin.php",
                    data: datas,
                    // dataType: "dataType",
                    beforeSend: function () {
                        $('#btnLogin').prop('disabled', true);
                    },
                    success: function (response) {
						var resp = response.split('-');
                        if (resp[0]!=0){
                            localStorage.setItem('name', resp[1]);
                            localStorage.setItem('uname', resp[0]);
                            expires.setFullYear(expires.getFullYear() + 10);
                            document.cookie = escape(uname) + "=" + escape(name) + "; expires =" + expires.toGMTString();
                            // expires.setFullYear(expires.getFullYear() + 10); 

                            localStorage.login = "true";
                            localStorage.email=resp[0];
							localStorage.name=resp[1];
                            // localStorage.name = response
                            window.location.href = "home.html";
                            // console.log(localStorage.email);
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


