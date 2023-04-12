from .models import Profile
from django.contrib import admin


class AdminProfile(admin.ModelAdmin):
    list_display = ('user', 'gender', 'phone_number', 'birth_date')


admin.site.register(Profile, AdminProfile)
