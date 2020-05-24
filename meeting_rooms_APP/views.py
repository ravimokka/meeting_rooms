from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.views import View
from .models import *
from .rooms_info import allRoomsInfo
import json
from django.core import serializers


class userLogin(View):
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):
        return render(request, "login.html")


class userRegistration(View):
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        req_data = request.body
        request_data = json.loads(req_data)
        name = request_data['name']
        email = request_data['email']
        password = request_data['password']
        data = UserRegistration.objects.create(name=name, email=email, password=password)
        data.save()
        json_data = [{'massage': 'user registered successfully'}]
        return JsonResponse({'data': json_data})


class loadHomePage(View):
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):
        orm_data = BookingRooms.objects.all()
        data = serializers.serialize('json', orm_data)
        res_data = json.loads(data)
        if res_data:
            pass
        else:
            rooms_info = allRoomsInfo()
            for i in rooms_info:
                room_num = i['room_num']
                img_name = i['img_name']
                seating = i['seating']
                booking_status = i['booking_status']
                data = BookingRooms.objects.create(room_num=room_num, img_name=img_name,
                                                   seating=seating, booking_status=booking_status)
                data.save()
        return render(request, "home_page.html")


class fetchAllRooms(View):
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        homePage = loadHomePage.get(self, request)
        req_data = request.body
        request_data = json.loads(req_data)
        email = request_data['email']
        password = request_data['password']
        data = UserRegistration.objects.filter(email=email)
        data = serializers.serialize('json', data)
        user_data = json.loads(data)
        if user_data:
            userId = user_data[0]['pk']
            emailID = user_data[0]['fields']['email']
            passWord = user_data[0]['fields']['password']
            if email == emailID and password == passWord:
                return JsonResponse({'data': {'userId': userId, 'email': email}})
            else:
                return JsonResponse({'data': {'massage': 'Invalid EmailID and Password'}})
        else:
            return JsonResponse({'data': {'massage': 'Invalid EmailID and Password'}})

    def get(self, request):
        homePage = loadHomePage.get(self, request)
        orm_data = BookingRooms.objects.all()
        data = serializers.serialize('json', orm_data)
        res_data = json.loads(data)
        if res_data:
            rooms_data = []
            sno = 0
            for i in res_data:
                sno += 1
                room_id = i['pk']
                room_num = i['fields']['room_num']
                img_name = i['fields']['img_name']
                seating = i['fields']['seating']
                booking_status = i['fields']['booking_status']
                user_id = i['fields']['user_id']
                records_dict = {'sno': sno, 'id': room_id, 'room_num': room_num, 'img_name': img_name,
                                'seating': seating, 'user_id': user_id,
                                'booking_status': booking_status}
                rooms_data.append(records_dict)
            return JsonResponse({'data': rooms_data})
        else:
            rooms_data = [{'massage': 'no records found'}]
            return JsonResponse({'data': rooms_data})


class bookingMeetingRoom(View):
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        req_data = request.body
        request_data = json.loads(req_data)
        name = request_data['name']
        email = request_data['email']
        phone = request_data['phone']
        arrive = request_data['arrive']
        depart = request_data['depart']
        room_id = request_data['room_id']
        user_id = request_data['userId']
        booking_status = request_data['booking_status']
        data = BookingRoomInfo.objects.create(name=name, email=email, phone=phone, arrive=arrive, depart=depart,
                                              booking_status=booking_status)
        data.save()
        r_data = BookingRooms.objects.filter(pk=room_id).update(booking_status=booking_status, user_id=user_id)
        return JsonResponse({'massage': 'Create Record Successfully'})


class AllBookingRoomsPage(View):
    def get(self, request):
        # homePage = loadHomePage.get(self, request)
        return render(request, "all_booking_rooms.html")


class AvailableBookingRoomsPage(View):
    def get(self, request):
        # homePage = loadHomePage.get(self, request)
        return render(request, "available_rooms.html")


class RoomsBookingInfo(View):
    def get(self, request):
        orm_data = BookingRoomInfo.objects.all()
        data = serializers.serialize('json', orm_data)
        res_data = json.loads(data)
        if res_data:
            rooms_data = []
            sno = 0
            for i in res_data:
                sno += 1
                room_id = i['pk']
                name = i['fields']['name']
                email = i['fields']['email']
                phone = i['fields']['phone']
                arrive = i['fields']['arrive']
                depart = i['fields']['depart']
                booking_status = i['fields']['booking_status']
                records_dict = {'sno': sno, 'id': room_id, 'name': name, 'email': email,
                                'phone': phone, 'arrive':arrive, 'depart':depart,
                                'booking_status': booking_status}
                rooms_data.append(records_dict)
            return JsonResponse({'data': rooms_data})
        else:
            rooms_data = [{'massage': 'no records found'}]
            return JsonResponse({'data': rooms_data})


