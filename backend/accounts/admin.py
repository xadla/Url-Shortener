from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


from .models import User
from .forms import UserChangeFormAdmin, UserCreateFormAdmin


class UserAdmin(BaseUserAdmin):

    form = UserChangeFormAdmin
    add_form = UserCreateFormAdmin


    list_display = ["full_name", "username", "is_admin"]

    list_filter = ["is_admin"]

    fieldsets = [
        (None, {"fields": ["username", "password"]}),
        ("Personal Info", {"fields": ["full_name"]}),
        ("Permissions", {"fields": ["is_admin", "is_staff"]})
    ]

    add_fieldsets = [
        (None, {"fields": ["full_name", "username", "password", "password2"]}),
    ]

    search_fields = ["username"]
    ordering = ["username"]
    filter_horizontal = []

    readonly_fields = ("created",)


admin.site.register(User, UserAdmin)
admin.site.unregister(Group)