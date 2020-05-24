from django.contrib import admin

# Register your models here.


from django.contrib import admin
from .models import *


admin.site.register(BookingRoomInfo)
admin.site.register(BookingRooms)
admin.site.register(UserRegistration)