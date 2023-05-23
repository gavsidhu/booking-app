import json
from django.shortcuts import render
from rest_framework import viewsets
from .serializer import BookingSerializer, BookingTypeSerializer, UserSerializer
from .models import Booking, BookingType, User
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, DjangoModelPermissions
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist


class BookingView(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()
    authentication_classes=[SessionAuthentication]
    permission_classes=[DjangoModelPermissions]

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id', None)
        if user_id is not None:
            return Booking.objects.filter(user_id=user_id)
        else:
            return Booking.objects.all()


class BookingTypeView(viewsets.ModelViewSet):
    serializer_class = BookingTypeSerializer
    queryset = BookingType.objects.all()
    authentication_classes=[SessionAuthentication]
    permission_classes=[DjangoModelPermissions]

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id', None)
        username = self.request.query_params.get('username', None)
        if user_id is not None:
            return BookingType.objects.filter(user_id=user_id)
        elif username is not None:
            return BookingType.objects.filter(username=username)
        else:
            return BookingType.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def register(request):
    if request.method == 'POST':
        email = request.data['email']
        password = request.data['password']
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        username = request.data['username']

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "The username already exists. Please choose a different one."})

        user = User.objects.create_user(
            email, password, first_name=first_name, last_name=last_name, username=username)
        user.first_name = first_name
        user.last_name = last_name
        user.save()

        # Log in the user for session & csrf token
        login(request, user)

        # Get the csrf and session id in cookies
        csrf_cookie = request.META['CSRF_COOKIE']
        sessionid_cookie = request.session.session_key

        # Create the response with user details
        response_data = {"message": "success", 'status': 'success', "user_id": user.id, "email": user.email,
                         "username": user.username, "first_name": user.first_name, "last_name": user.last_name, }
        response = JsonResponse(response_data)

        # Set the csrf and session id cookies
        response.set_cookie('csrftoken', csrf_cookie, secure=True, samesite='None')
        response.set_cookie('sessionid', sessionid_cookie, secure=True, samesite='None')

        return response


@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def auth_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'success', "user_id": user.id, "email": user.email, "username": user.username, "first_name": user.first_name, "last_name": user.last_name, })
        else:
            return JsonResponse({'status': 'failure'})


@csrf_exempt
@api_view(['POST'])
def auth_logout(request):
    logout(request)
    return JsonResponse({'status': 'success'})


@csrf_exempt
@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def get_booking_types(request):
    user_id = request.query_params.get('user_id', None)
    username = request.query_params.get('username', None)
    booking_types = None

    if user_id is not None:
        booking_types = BookingType.objects.filter(user_id=user_id)
    elif username is not None:
        try:
            user = User.objects.get(username=username)
            booking_types = BookingType.objects.filter(user_id=user.id)
        except User.DoesNotExist:
            # Return an empty queryset if no user is found
            booking_types = BookingType.objects.none()
    else:
        booking_types = BookingType.objects.all()

    # Serialize the data
    booking_types_serializer = BookingTypeSerializer(booking_types, many=True)

    # Check if there are any booking types and get the related user
    if booking_types and len(booking_types) > 0:
        user = booking_types.first().user
        # Serialize the user
        user_serializer = UserSerializer(user)

        # Add serialized user to the response data
        response_data = {
            "user": {
                "id": user_serializer.data["id"],
                "first_name": user_serializer.data["first_name"],
                "last_name": user_serializer.data["last_name"],
            },
            "booking_types": booking_types_serializer.data
        }
    else:
        # Return empty data if there are no booking types
        response_data = {
            "user": None,
            "booking_types": []
        }

    return Response(response_data)


@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def schedule_booking(request):
    user_id = request.data.get('user', None)
    first_name = request.data.get('first_name', None)
    last_name = request.data.get('last_name', None)
    email = request.data.get('email', None)
    start_at = request.data.get('start_at', None)
    end_at = request.data.get('end_at', None)
    status = request.data.get("status", None)
    booking_type = request.data.get("booking_type", None)

    # Make sure bookings don't overlap
    overlapping_bookings = Booking.objects.filter(
        start_at__lt=end_at,
        end_at__gt=start_at,
    )

    if overlapping_bookings.exists():
        return JsonResponse({"status": "failure", "message": "Booking time overlap"})

    try:
        booking_type = BookingType.objects.get(id=booking_type)
    except ObjectDoesNotExist:
        return JsonResponse({"status": "failure", "message": "BookingType not found"})
    try:
        user = User.objects.get(id=user_id)
    except ObjectDoesNotExist:
        return JsonResponse({"status": "failure", "message": "User not found"})

    booking = Booking.objects.create(
        first_name=first_name,
        last_name=last_name,
        email=email,
        start_at=start_at,
        end_at=end_at,
        status=status,
        booking_type=booking_type,
        user_id=user.id
    )

    if booking is not None:
        # Serialize the data
        booking_serializer = BookingSerializer(booking, many=False)

        return JsonResponse({"status": "success", "booking": booking_serializer.data})
    else:
        return JsonResponse({"status": "failure"})
