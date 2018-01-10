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
		$(".se-pre-con").show();
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
				$(".se-pre-con").hide();
                pfURL = "http://bebongstore.com/nxias/uploads/student/";
                if (response.status) {
                    $("#pimage").attr("src", pfURL + response.prof_image);
                } else {
                    $("#pimage").attr("src", pfURL + response.prof_image);
                }
            }
        });

        // This Code For Logout
        $('#btnLogout').click(function () {
            // alert();
            var userdata = localStorage.getItem('uname');
            // var userdata = localStorage.email;
            // console.log(userdata);
            var datas = { 'email': userdata };
            $.ajax({
                type: "post",
                url: "https://bebongstore.com/nxias/manage_api/logout",
                data: datas,
                success: function (response) {
                    da = $.parseJSON(response);
                    if (da.status == 1) {
                        localStorage.email = "";
                        localStorage.login = "false";
                        window.location.href = "beforelogin.html";
                    }
                }
            });

        });

        // app.receivedEvent('deviceready');
		$.ajax({
            type: "post",
            url: "https://bebongstore.com/nxias/manage_api/get_question",
            dataType: "json",
            success: function (response) {
                // var da = $.parseJSON(response);
                if (response.status == 1) {
                    $.each(response.questions, function (val, text) {
                        var title = text.title;
						var question = text.content;
						$('#allquestion').append('<div style="font-size:30px;" class="contentname"><span style="color:#000000; font-weight:bold; text-transform:uppercase;"> <i class="fa fa-file-pdf-o" style="color:#FF2424; font-size:40px;"></i> &nbsp;'+title+'</span><span class="pull-right"><a href="http://bebongstore.com/nxias/uploads/question/'+question+'" target="_parent"><button class="btn btn-warning" style="font-size:30px;">View</button></a></span></div><hr class="style13">');
                    });
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