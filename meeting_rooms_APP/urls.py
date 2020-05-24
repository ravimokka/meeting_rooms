from django.urls import path

from django.views.decorators.csrf import csrf_exempt
from .views import *

urlpatterns = [
                  path('', csrf_exempt(userLogin.as_view()), name="userLogin"),
                  path('RegistrationAPI', csrf_exempt(userRegistration.as_view()), name="userRegistration"),
                  path('homePageAPI', csrf_exempt(loadHomePage.as_view()), name="loadHomePage"),
                  path('allRoomsAPI', csrf_exempt(fetchAllRooms.as_view()), name="fetchAllRooms"),
                  path('bookingAPI', csrf_exempt(bookingMeetingRoom.as_view()), name="bookingMeetingRoom"),
                  path('allBookingAPI', csrf_exempt(AllBookingRoomsPage.as_view()), name="AllBookingRoomsPage"),
                  path('availableRoomsAPI', csrf_exempt(AvailableBookingRoomsPage.as_view()), name="AvailableBookingRoomsPage"),
                  path('RoomsInfoAPI', csrf_exempt(RoomsBookingInfo.as_view()), name="RoomsBookingInfo"),

              ]