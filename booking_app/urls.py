"""
URL configuration for booking_app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from booking import views
from rest_framework import routers
from booking.views import register, auth_login, auth_logout, get_booking_types, schedule_booking, refresh_account_link, create_payment_account

router = routers.DefaultRouter()
router.register(r'booking', views.BookingView, 'booking')
router.register(r'booking_type', views.BookingTypeView, 'booking_type')
router.register(r'user', views.UserView, 'user')
router.register(r'account', views.AccountView, 'account')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', register, name='register'),
    path('api/login/', auth_login, name='login'),
    path('api/logout/', auth_logout, name='logout'),
    path('api/booking_types/get_booking_types/',
         get_booking_types, name='get_booking_types'),
    path('api/bookings/schedule_booking/',
         schedule_booking, name='schedule_booking'),
    path('api/accounts/create_payment_account/', create_payment_account, name='create_payment_account'),
    path('api/accounts/refresh_account_link/', refresh_account_link, name='refresh_account_link')

]
