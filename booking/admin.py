from django.contrib import admin
from .models import Booking, User, BookingType


@admin.register(Booking)
class PersonAdmin(admin.ModelAdmin):
    pass

@admin.register(BookingType)
class CourseAdmin(admin.ModelAdmin):
    pass

@admin.register(User)
class GradeAdmin(admin.ModelAdmin):
    pass