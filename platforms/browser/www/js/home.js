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
        document.addEventListener("backbutton", onBackKeyDown, false); 
        // This Function For Exit App
        function onBackKeyDown(e) {
            e.preventDefault();
            navigator.notification.confirm("Are you sure you want to exit ?", onConfirm, "Confirmation", "Yes,No");
            // Prompt the user with the choice
        }

        function onConfirm(button) {
            if (button == 2) {//If User selected No, then we just do nothing
                return;
            } else {
                navigator.app.exitApp();// Otherwise we quit the app.
            }
        }


        
        // This Function Get Image From Server
        var urls = "https://bebongstore.com/nxias/manage_api/image_view";
        var userdata = localStorage.getItem('uname');
        var datas = { 'email': userdata };
        $.ajax({
            type: "post",
            url: urls,
            data: datas,
            dataType: "json",
            success: function (response) {
                pfURL = "http://bebongstore.com/nxias/uploads/student/";
                if (response.status) {
                    $("#pimage").attr("src", pfURL + response.prof_image);
                } else {
                    $("#pimage").attr("src", pfURL + response.prof_image);
                }
            }
        });


        // This For Logout Button Click
        $('#btnLogout').click(function () {            
            var userdata = localStorage.email;
            var datas = {'email': userdata };
            $.ajax({
                type: "post",
                url: "https://bebongstore.com/nxias/manage_api/logout",
                data: datas,
                success: function (response) {
                    da = $.parseJSON(response);
                    if (da.status==1){
                        localStorage.email = "";
                        localStorage.login = "false";
                        window.location.href = "beforelogin.html";
                    }
                }
            });
            
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
