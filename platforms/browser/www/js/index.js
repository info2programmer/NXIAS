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
        var element = document.getElementById('deviceProperties');

        //element.innerHTML = 'Device Name: '     + device.name     + '<br />' + 
        //                            'Device Cordova: '  + device.cordova  + '<br />' + 
        //                            'Device Platform: ' + device.platform + '<br />' + 
        //                            'Device UUID: '     + device.uuid     + '<br />' + 
        //                            'Device Version: '  + device.version  + '<br />';
       
        // Check Login Status Is Localstroage

        if (localStorage.login == "false"){
            // First Check Is Loged In In Database            

            window.setTimeout(function () {
                window.location.href = "beforelogin.html";
            }, 4000);
        }
        else{
            var datas = { 'user_email': localStorage.getItem('uname')};
            var urls ="https://bebongstore.com/nxias/manage_api/splash_screen_check";
            $.ajax({
                type: "post",
                url: urls,
                data: datas,
                dataType: "JSON",
                success: function (response) {
                    if (response.status == 0) {                        

                        window.setTimeout(function () {
                            window.location.href = "beforelogin.html";
                        }, 4000);
                    }
                    else {
                        localStorage.setItem('name', response.student_arr.name);
                        localStorage.setItem('uname', response.student_arr.email);

                        localStorage.email = response.student_arr.email;
                        localStorage.name = response.student_arr.name;
                        localStorage.login="true";

                        window.setTimeout(function () {
                            window.location.href = "home.html";
                        }, 4000);
                    }
                }
            });
        }
        
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

    alert('Connection type: ' + states[networkState]);
}
