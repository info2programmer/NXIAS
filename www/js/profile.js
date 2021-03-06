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
        // app.receivedEvent('deviceready');
        var element = document.getElementById('deviceProperties');

        // This Code For Logout
        $('#btnLogout').click(function () {
            // alert();
            var userdata = localStorage.getItem('uname');
            // var userdata = localStorage.email;
            // console.log(userdata);
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

        // This Function Get All Data From Server
        var urls = "https://bebongstore.com/nxias/manage_api/profile_view";
        var userdata = localStorage.getItem('uname');
        // console.log(userdata);
        var datas = { 'email': userdata };
        $.ajax({
            type: "post",
            url: urls,
            data: datas,
            dataType: "json",
            beforeSend: function () {
                // Animate loader off screen
                $(".se-pre-con").show();
            },
            success: function (response) {
                $('#namef').text(response.stu_arr.name);
                $('#mailf').text(response.stu_arr.email);
                $('#nof').text(response.stu_arr.mobile_num);
                $('#qualif').text(response.stu_arr.qualification);
                $('#modef').text(response.stu_arr.mode);
                $('#statef').text(response.stu_arr.state);
                $('#cityf').text(response.stu_arr.city);
                $('#coursef').text(response.stu_arr.course);
                $(".se-pre-con").hide();
            }
        });
		
		
		// This Function Get Image From Server
        var urls = "https://bebongstore.com/nxias/manage_api/image_view";
        var userdata = localStorage.getItem('uname');
        // console.log(userdata);
        var datas = { 'email': userdata };
        $.ajax({
            type: "post",
            url: urls,
            data: datas,
            dataType: "json",
            success: function (response) {
				pfURL = "http://bebongstore.com/nxias/uploads/student/";
				if(response.status) {
					$("#pimage").attr("src",pfURL+response.prof_image);
				} else {
					$("#pimage").attr("src",pfURL+response.prof_image);
				}
            }
        });

        // *************************************************************************************
        // This Section For Edit Button click
        
        // Name Edit Button click
        $('#btnFnameEdit').click(function () { 
            $('#btnFnameSubmit').css('display', 'block');            
            $('#btnFnameEdit').css('display', 'none');            
            $('#txtFname').css('display', 'block');  
            $('#txtFname').val($('#namef').text());  
            $('#namef').css('display', 'none');          
        });

        // Phone Edit Button Click
        $('#btnPhoneEdit').click(function () {
            $('#btnPhoneSubmit').css('display', 'block');
            $('#btnPhoneEdit').css('display', 'none');
            $('#txtPhone').css('display', 'block');
            $('#txtPhone').val($('#nof').text());
            $('#nof').css('display', 'none');
        });

        // Qualification Edit Button Click
        $('#btnQualificationEdit').click(function () {
            $('#btnQualificationSubmit').css('display', 'block');
            $('#btnQualificationEdit').css('display', 'none');
            $('#txtQualification').css('display', 'block');
            $('#txtQualification').val($('#qualif').text());
            $('#qualif').css('display', 'none');
        });


        

        // Mode Edit Button Click
        // $('#btnModeEdit').click(function () {
        //     $('#btnModeSubmit').css('display', 'block');
        //     $('#btnModeEdit').css('display', 'none');
        //     $('#ddlMode').css('display', 'block');
        //     $('#modef').css('display', 'none');
        //     var modeValue = $('#modef').text();
        //     $("#ddlMode option[value='" + modeValue + "']").attr("selected", "selected");
        //     // alert($('#modef').text());
        //     // $('.ddlMode[value=' + $('#modef').text()+']').attr('selected', 'selected');
        //     $('#modef').css('display', 'none');
        // });

        // State Edit Button Click
        $('#btnStateEdit').click(function () {
            $('#btnStateSubmit').css('display', 'block');
            $('#btnStateEdit').css('display', 'none');
            $('#ddlState').css('display', 'block');
            $('#statef').css('display', 'none');
            var modeValue = $('#statef').text();
            $("#ddlState option[value='" + modeValue + "']").attr("selected", "selected");
            // alert($('#modef').text());
            // $('.ddlMode[value=' + $('#modef').text()+']').attr('selected', 'selected');
            $('#statef').css('display', 'none');
        });

        // City Edit Button Click
        $('#btnCityEdit').click(function () {
            $('#btnCitySave').css('display', 'block');
            $('#btnCityEdit').css('display', 'none');
            $('#ddlCity').css('display', 'block');
            $('#cityf').css('display', 'none');
            var modeValue = $('#cityf').text();
            $("#ddlCity option[value='" + modeValue + "']").attr("selected", "selected");
            // alert($('#modef').text());
            // $('.ddlMode[value=' + $('#modef').text()+']').attr('selected', 'selected');
            $('#cityf').css('display', 'none');
        });

        // Course Edit Button Click
        // $('#btnCourseEdit').click(function () {
        //     $('#btnCourseSubmit').css('display', 'block');
        //     $('#btnCourseEdit').css('display', 'none');
        //     $('#ddlCouese').css('display', 'block');
        //     $('#coursef').css('display', 'none');
        //     var modeValue = $('#coursef').text();
        //     $("#ddlCouese option[value='" + modeValue + "']").attr("selected", "selected");
        //     // alert($('#modef').text());
        //     // $('.ddlMode[value=' + $('#modef').text()+']').attr('selected', 'selected');
        //     $('#coursef').css('display', 'none');
        // });


        // *************************************************************************************
        // This Section For Update Profile

        // Update Name Here
        $('#btnFnameSubmit').click(function () { 
            var name = $('#txtFname').val();
            var updateFld = 'name';
			var labelName = 'namef';
            if(name==""){
                $('#txtFname').css('border-color', 'red');
            }
            else{
                updateProfile(name, updateFld, labelName);
            }
        });


        // Update Phone Here
        $('#btnPhoneSubmit').click(function () {
            var phone = $('#txtPhone').val();
            var updateFld = 'mobile_num';
			var labelName = 'nof';
            if (phone == "") {
                $('#txtPhone').css('border-color', 'red');
            }
            else {
                updateProfile(phone, updateFld, labelName);
            }
        });

        // Update Qualification Here
        $('#btnQualificationSubmit').click(function () {
            var qualification = $('#txtQualification').val();
            var updateFld = 'qualification';
			var labelName = 'qualif';
            if (qualification == "") {
                $('#txtQualification').css('border-color', 'red');
            }
            else {
                updateProfile(qualification, updateFld, labelName);
            }
        });

        // Update Mode Here
        // $('#btnModeSubmit').click(function () {
        //     var mode = $('#ddlMode').val();
        //     var updateFld = 'mode';
		//		var labelName = 'namef';
        //     if (mode == "") {
        //         $('#ddlMode').css('border-color', 'red');
        //     }
        //     else {
        //         updateProfile(name, updateFld, labelName);
        //     }
        // });

        // Update State Here
        $('#btnStateSubmit').click(function () {
            var state = $('#ddlState').val();
            var updateFld ='state';
			var labelName = 'statef';
            if (state == "") {
                $('#ddlState').css('border-color', 'red');
            }
            else {
                updateProfile(state, updateFld, labelName);
            }
        });

        // Update City Here
        $('#btnCitySave').click(function () {
            var city = $('#ddlCity').val();
            var updateFld = 'city';
			var labelName = 'cityf';
            if (city == "") {
                $('#ddlCity').css('border-color', 'red');
            }
            else {
                updateProfile(city, updateFld, labelName);
            }
        });

        // // Update Course Here
        // $('#btnCourseSubmit').click(function () {
        //     var course = $('#ddlCouese').val();
        //     if (course == "") {
        //         $('#ddlCouese').css('border-color', 'red');
        //     }
        //     else {
        //         $.ajax({
        //             type: "method",
        //             url: "url",
        //             data: "data",
        //             dataType: "dataType",
        //             success: function (response) {

        //             }
        //         });
        //     }
        // });


        // ***********************************************************************************************
        // This Function For Image Upload
        
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    
};


function updateProfile(updateValue,updateFld,labelName){
    var urls ="https://bebongstore.com/nxias/manage_api/profile_update";
    datas = { 'update_value': updateValue, 'field': updateFld, 'email': localStorage.email,'labelName':labelName};
    $.ajax({
        type: "POST",
        url: urls,
        data: datas,
        dataType: 'json',
        beforeSend: function () {
            // $('#btnLogin').prop('disabled', true);
            // Loading Status will be shown here
        },
        success: function (response) {
            if (response.status==1){
                //alert(updateFld + ' Change To ' + updateValue+' Successfully');
                window.location.href = "profile.html";				
				//$('#'+labelName).val(updateValue);
            }
        }
    });
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