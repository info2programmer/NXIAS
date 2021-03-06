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

        // This Code For Logout
        $('#btnLogout').click(function () {
            // alert();
			$(".se-pre-con").show();
            var userdata = localStorage.getItem('uname');
            // var userdata = localStorage.email;
            // console.log(userdata);
            var datas = { 'email': userdata };
            $.ajax({
                type: "post",
                url: "https://bebongstore.com/nxias/manage_api/logout",
                data: datas,
                success: function (response) {
					$(".se-pre-con").hide();
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
            url: "https://bebongstore.com/nxias/manage_api/get_subject",
            dataType: "json",
            success: function (response) {
                // var da = $.parseJSON(response);
                if (response.status == 1) {
					$('#subject').append($('<option></option>').val('').html('Select Subject'));
                    $.each(response.subjects, function (val, text) {
                        var subject = text.subject;
                        $('#subject').append($('<option></option>').val(subject).html(subject));
                    });
                }
            }
        }); 
		
		$('#subject').change(function () { 
            $('#section').empty();
            $('#chapter').empty();
			$('#topic').empty();
            var datas = { 'subject': $('#subject').val()};
            $.ajax({
                type: "post",
                url: "https://bebongstore.com/nxias/manage_api/get_section",
                data:datas,
                dataType: "json",
                success: function (response) {
                    // var da = $.parseJSON(response);
                    if (response.status == 1) {
						$('#section').append($('<option></option>').val('').html('Select Section'));
                        $.each(response.sections, function (val, text) {
                            var section = text.section;
                            $('#section').append($('<option></option>').val(section).html(section));
                        });
                    }
                }
            });
		});
			$('#section').change(function () { 
            $('#chapter').empty();
			$('#topic').empty();
            var datas = { 'section': $('#section').val(), 'subject': $('#subject').val()};
            $.ajax({
                type: "post",
                url: "https://bebongstore.com/nxias/manage_api/get_chapter",
                data:datas,
                dataType: "json",
                success: function (response) {
                    // var da = $.parseJSON(response);
                    if (response.status == 1) {
						$('#chapter').append($('<option></option>').val('').html('Select Chapter'));
                        $.each(response.chapters, function (val, text) {
                            var chapter = text.chapter;
                            $('#chapter').append($('<option></option>').val(chapter).html(chapter));
                        });
                    }
                }
            });
			});
			$('#chapter').change(function () { 
			$('#topic').empty();
            var datas = { 'section': $('#section').val(), 'subject': $('#subject').val(), 'chapter': $('#chapter').val()};
            $.ajax({
                type: "post",
                url: "https://bebongstore.com/nxias/manage_api/get_topic",
                data:datas,
                dataType: "json",
                success: function (response) {
                    // var da = $.parseJSON(response);
                    if (response.status == 1) {
                        $.each(response.topics, function (val, text) {
                            var topic = text.topic;
                            $('#topic').append($('<option></option>').val(topic).html(topic));
                        });
                    }
                }
            });
			});
			
			$('#studsrch').click(function () { 
		
       		var subject = $('#subject').val();
            var section = $("#section").val();
            var chapter = $("#chapter").val();
			var topic = $("#topic").val();
            var datas = { 'subject': subject, 'section': section, 'chapter': chapter, 'topic': topic };
            if (subject == "" || section== "" || chapter=="" || topic==""){
                if (mode == ""){
                    $('#subject').css('border-color', 'red');
                }
                if (state == "") {
                    $('#section').css('border-color', 'red');
                }
                if (city == "") {
                    $('#chapter').css('border-color', 'red');
                }
				if (course == "") {
                    $('#topic').css('border-color', 'red');
                }
            }
            else{
				$('#allsrchlist').empty();
                $.ajax({
                    type: "post",
                    url: "https://bebongstore.com/nxias/manage_api/searchstudymaterial",
                    data: datas,
					datatype:'json',
                    beforeSend: function () {
						$(".se-pre-con").show();
                        $('#studsrch').prop('disabled', true);
                    },
                    success: function (response) {
						$(".se-pre-con").hide();
                        $('#studsrch').prop('disabled', false);
						var da = $.parseJSON(response);
                        if (da.status == 1) {
							$('#allsrchlist').css('display','block');
                        $.each(da.materials, function (val, text) {
                            var title = text.title;
							var content = text.note_id;
                            $('#allsrchlist').append('<div style="font-size:30px;"><span style="color:#000000; font-weight:bold; text-transform:uppercase;"><i class="fa fa-file-pdf-o" style="color:#FF2424; font-size:40px;"></i> &nbsp;'+title+'</span> <span class="pull-right"><button class="btn btn-warning" style="font-size:30px;">View</button></span></div><hr class="style13">');
                        });
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