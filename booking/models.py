from django.db import models
import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True, editable=False)
    email = models.EmailField(unique=True, null=False, db_index=True)
    username = models.CharField(
        unique=True, null=False, db_index=True, max_length=100,)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    reset_password_token = models.CharField(
        db_index=True, max_length=100, null=True)
    reset_password_sent_at = models.DateTimeField(null=True)
    remember_created_at = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"


class BookingType(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True, editable=False)
    name = models.CharField(max_length=100, null=False)
    location = models.CharField(max_length=100)
    description = models.CharField(max_length=300, null=True)
    color = models.CharField(default="#000", max_length=100)
    duration = models.PositiveIntegerField(default=30)
    payment_required = models.BooleanField(default=False)
    price = models.PositiveIntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class Booking(models.Model):
    status = models.CharField(max_length=100)
    first_name = models.CharField(null=False, max_length=100)
    last_name = models.CharField(null=False, max_length=100)
    email = models.EmailField(null=False, max_length=100)
    start_at = models.DateTimeField()
    end_at = models.DateTimeField()
    customer_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    booking_type = models.ForeignKey(BookingType, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name} @ {self.start_at}"


class Schedule(models.Model):
    pass


class Availability(models.Model):
    pass
