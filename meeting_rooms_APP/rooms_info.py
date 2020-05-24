
def allRoomsInfo():
    all_rooms = [
                    {'room_num': 100, 'img_name': 'room1', 'booking_status': 1, 'seating': 6},
                    {'room_num': 101, 'img_name': 'room2', 'booking_status': 1, 'seating': 8},
                    {'room_num': 102, 'img_name': 'room3', 'booking_status': 1, 'seating': 8},
                    {'room_num': 103, 'img_name': 'room4', 'booking_status': 1, 'seating': 6},
                    {'room_num': 104, 'img_name': 'room5', 'booking_status': 1, 'seating': 10},
                    {'room_num': 105, 'img_name': 'room6', 'booking_status': 1, 'seating': 6},
                    {'room_num': 106, 'img_name': 'room7', 'booking_status': 1, 'seating': 10},
                    {'room_num': 107, 'img_name': 'room8', 'booking_status': 1, 'seating': 6},
                    {'room_num': 108, 'img_name': 'room9', 'booking_status': 1, 'seating': 8},
                    {'room_num': 109, 'img_name': 'room10','booking_status': 1, 'seating': 10}]
    return all_rooms


 # orm_data = BookingRooms.objects.all()
                # data = serializers.serialize('json', orm_data)
                # res_data = json.loads(data)
                # if res_data:
                #     rooms_data = []
                #     sno = 0
                #     for i in res_data:
                #         sno += 1
                #         room_id = i['pk']
                #         room_num = i['fields']['room_num']
                #         img_name = i['fields']['img_name']
                #         seating = i['fields']['seating']
                #         booking_status = i['fields']['booking_status']
                #         records_dict = {'sno': sno, 'userId': userId, 'id': room_id, 'room_num': room_num, 'img_name': img_name,
                #                         'seating': seating,
                #                         'booking_status': booking_status}
                #         rooms_data.append(records_dict)
                #     return JsonResponse({'data': {'userId':userId, 'email':email}})
                # else:
                #     rooms_data = [{'massage': 'no records found'}]
                # return JsonResponse({'data': rooms_data})