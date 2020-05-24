$(document).ready(function(){

    $('.userRegistration').hide();
    $(".btnSubmit").click(function() {
      $('.login_page').hide();
      $('.userRegistration').show();

    });

    $(".btnSubmitRegi").click(function() {
       var name = $('#name').val();
       var email = $('#email').val();
       var password = $('#password').val();
       if ( (name && email && password) == ''){
         alert( 'Please fill the all fields')
       }
       else if ( password.length < 8){
        alert('Password too short')
       }
       else
       {
           var data = {}
           data['name'] = name;
           data['email'] = email;
           data['password'] = password;
           userRegistrationAPI(data);
       }
    });

       $("#btn_login").click(function() {
       var email = $('#login_email').val();
       var password = $('#login_password').val();
       if ( (email && password) == ''){
         alert( 'Please enter Email ID and Password ')
       }
       else
       {
           var data = {}
           data['email'] = email;
           data['password'] = password;
           userLoginAPI(data);

       }
    });



});



function userRegistrationAPI(data){
$.ajax({
           url: "/RegistrationAPI",
           type: "POST",
           contentType: 'application/json',
           data: JSON.stringify(data),
           success: function(data, testStatus, jqXHR){
            var text = data['a']
           if (testStatus == 'success'){
            location.reload(true);
           }
           },
           error: function(response){
             alert("Error:" + response);
           }
        });
}



function userLoginAPI(data){
$.ajax({
           url: "/allRoomsAPI",
           type: "POST",
           contentType: 'application/json',
           data: JSON.stringify(data),
           success: function(data, testStatus, jqXHR){
            var text = data['a']
           if (testStatus == 'success'){
                if (data.data["massage"] == "Invalid EmailID and Password"){
                        alert("Invalid EmailID and Password")
                }else{
                        sessionStorage.setItem("session_data",JSON.stringify(data.data));
                        window.location.replace('homePageAPI');
                }
           }
           },
           error: function(response){
             alert("Error:" + response);
           }
        });
}


