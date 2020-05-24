from django.db import models


# Create your models here.

class UserRegistration(models.Model):
    name = models.CharField(max_length=20, null=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class BookingRooms(models.Model):
    room_num = models.IntegerField(default=0, blank=False)
    img_name = models.CharField(max_length=20, null=True)
    seating = models.IntegerField(default=0, blank=False)
    booking_status = models.CharField(max_length=20, default=0, null=True)
    user_id = models.IntegerField(default=0, blank=False)

    def __str__(self):
        return self.img_name


class BookingRoomInfo(models.Model):
    name = models.TextField(max_length=20, blank=False)
    email = models.EmailField(max_length=20, blank=False)
    phone = models.IntegerField(blank=False)
    arrive = models.CharField(max_length=20, null=True)
    depart = models.CharField(max_length=20, null=True)
    booking_status = models.CharField(max_length=20, null=True)

    def __str__(self):
        return self.name
