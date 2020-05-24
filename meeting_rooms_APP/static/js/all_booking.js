var room_row_id = "";
var image_name = "";
var view_roomId = "";
var all_rooms_data = "";
var clear_session = "";

$(document).ready(function(){
    loadAllBookingAPI()

       $("#btn_logout a").click(function() {
            clear_session = sessionStorage.clear()
            if (clear_session == null){window.location.replace('/');}
            else{ return false}
        });

});

function loadAllBookingAPI(){
data = 'test'
$.ajax({
           url: "/RoomsInfoAPI",
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
     var data_view = $('.all_booking_data');
//     data_view.find('tr').remove();
        var i;
        var sno = 0;
        for(i = 0; i < data.length; ++i) {
             var clone = $('#all_booking_template .all_booking_table-form-list .all_booking_table-row-form').clone();
             var sno = sno+1;
              if( data[i]['booking_status'] == 2){
                    $('.sno', clone).text(sno)
                    $('.name', clone).text(data[i]['name'])
                    $('.phone', clone).text(data[i]['phone'])
                    $('.email', clone).text(data[i]['email'])
                    $('.arrive', clone).text(data[i]['arrive'])
                    $('.depart', clone).text(data[i]['depart'])
                    data_view.append(clone);
               }
             else{
                   return false
              }
        }
}


