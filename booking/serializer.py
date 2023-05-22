from rest_framework import serializers
from .models import Booking, BookingType, User


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"


class BookingTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingType
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
