var room_row_id = "";
var image_name = "";
var view_roomId = "";
var all_rooms_data = "";
var session_data = "";
var clear_session = "";


$(document).ready(function(){
    $(document).on("click","#totalTable tbody tr td button.btn", function() { // any button
        room_row_id = "";
        room_row_id = $(this).attr('row_id');
        session_data = "",
        session_data = JSON.parse(sessionStorage.getItem("session_data"));
        for(i = 0; i < all_rooms_data.length; ++i) {
             if (all_rooms_data[i]['user_id'] == session_data['userId'] ){
                    alert('user can reserve a meeting room')
                    $('#exampleModal').modal("hide");
             }
//             else{
//                return false
//             }
         }
    });

    $(document).on("click","#totalTable tbody tr td button.btn_rd",function() {
        view_roomId = "";
        view_roomId = $(this).attr('row_id');
        var imagesFolder = "static/images";
        $("#view_img img:last-child").remove()
        image_name = 'room1';
        $('#view_img').append('<img  class="im" src="' + imagesFolder + '/' + image_name + '.jpg" style="width:300px">');
        var i;
        var sno = 0;
        var view_details_data = $('.view_details_data');
        view_details_data.find('tr').remove();
        for(i = 0; i < all_rooms_data.length; ++i) {
             if (all_rooms_data[i]['id'] == view_roomId ){
             var clone = $('#template_view .view_table-form-list .view_table-row-form').clone();
             var sno = sno+1;
             var room_num = all_rooms_data[i]['room_num']
             var book_status = all_rooms_data[i]['booking_status']
             if(book_status == 2){
                bStatus = "this room already booking"
             }
             else{
                bStatus = "this room available"
             }
             $('.sno', clone).text(sno)
             $('.rStatus', clone).text(bStatus)
             $('.rNum', clone).text(all_rooms_data[i]['room_num'])
             $('.num_seats', clone).text(all_rooms_data[i]['seating'])
             view_details_data.append(clone);
             }
         }
    });

    $("#btn_save").click(function() {
       var row_id = $(this).attr('row_id');
       var name = $('#name').val();
       var email = $('#email').val();
       var phone = $('#phone').val();
       var arrive = $('#arrive').val();
       var depart = $('#depart').val();
       if ( (name && email && phone && arrive && depart) == ''){
         alert( 'Please fill the all fields')
       }
       else
       {
           var data = {}
           data['name'] = name;
           data['email'] = email;
           data['phone'] = phone;
           data['arrive'] = arrive;
           data['depart'] = depart;
           data['room_id'] = room_row_id;
           data['booking_status'] = 2;
           saveRoomBookingAPI(data);
       }
    });
     loadHomePageAPI();
      searchFunctionSno();
     searchFunctionRoomNum();
          $("#btn_logout a").click(function() {
            clear_session = sessionStorage.clear()
            if (clear_session == null){window.location.replace('/');}
            else{ return false}
        });



});

function loadHomePageAPI(){
data = 'test'
$.ajax({
           url: "/allRoomsAPI",
           type: "GET",
           contentType: 'application/json',
           data: JSON.stringify(data),
           success: function(data, testStatus, jqXHR){
            var text = data['a']
           if (testStatus == 'success'){
           console.log(data)
            var response_data = data.data;
            all_rooms_data = response_data;
              renderList(response_data);
           }
           },
           error: function(response){
             alert("Error:" + response);
           }
        });
}


function renderList(data){
     var imagesFolder = "static/images";
     var data_view = $('.view_data');
//     data_view.find('tr').remove();
        var i;
        var sno = 0;
        for(i = 0; i < data.length; ++i) {
             var clone = $('#template .table-form-list .table-row-form').clone();
             var img  = '<img  class="im" src="' + imagesFolder + '/' + data[i]["img_name"] + '.jpg">'
             if( data[i]['booking_status'] == 1){
                var sno = sno+1;
                var btnBooking = '<button type="button"   data-toggle="modal" data-target="#exampleModal" class="btn btn-primary btn-sm"  row_id ="'+data[i]['id']+'">Book Now</button>'
                var btnDetails = '<button type="button" data-toggle="modal" data-target="#viewModal"  class="btn1 btn-info btn-sm btn_rd" row_id ="'+data[i]['id']+'">Room Details</button>'
                    $('.sno', clone).text(sno)
                    $('.img', clone).append(img)
                       $('.room_num', clone).append(data[i]['room_num'])
                    $('.btn_book', clone).append(btnBooking)
                    $('.btn_detail', clone).append(btnDetails)
                    data_view.append(clone);
            }
             else{
             }

        }
}


function saveRoomBookingAPI(data){
$.ajax({
           url: "/bookingAPI",
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


function searchFunctionSno() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("totalTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function searchFunctionRoomNum() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput_room");
  filter = input.value.toUpperCase();
  table = document.getElementById("totalTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}