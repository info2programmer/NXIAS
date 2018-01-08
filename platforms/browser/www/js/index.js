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
        var element = document.getElementById('deviceProperties');

        //element.innerHTML = 'Device Name: '     + device.name     + '<br />' + 
        //                            'Device Cordova: '  + device.cordova  + '<br />' + 
        //                            'Device Platform: ' + device.platform + '<br />' + 
        //                            'Device UUID: '     + device.uuid     + '<br />' + 
        //                            'Device Version: '  + device.version  + '<br />';
        var datas = { 'div_id': device.uuid, 'dev_name': device.name };
        //console.log(datas);
        $.ajax({
            type: "post",
            url: "http://spmgroupindia.com/NXIAS_APIS/reg.php",
            data: datas,
            dataType: "html",
            success: function (response) {
                // alert(response);
                // console.log(response);
				var resp = response.split('-');
                if (resp[0]==0){
					console.log(localStorage.email);
					console.log(localStorage.name);
				//	 window.setTimeout(function(){
//					 window.location.href = "beforelogin.html";
//					 }, 4000);
                }
                else{
					localStorage.email = resp[1];
					localStorage.name = resp[2];
					
					//  window.setTimeout(function(){
					//  window.location.href = "home.html";
					//  }, 4000);
                }
                
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
