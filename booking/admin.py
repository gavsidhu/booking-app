from django.contrib import admin
from .models import Booking, User, BookingType, Account


@admin.register(Booking)
class PersonAdmin(admin.ModelAdmin):
    pass

@admin.register(BookingType)
class CourseAdmin(admin.ModelAdmin):
    pass

@admin.register(User)
class GradeAdmin(admin.ModelAdmin):
    pass

@admin.register(Account)
class GradeAdmin(admin.ModelAdmin):
    pass