from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField


from .models import User


class UserCreateFormAdmin(forms.ModelForm):

    password2 = forms.CharField(
        label="Confirm Password",
        widget=forms.PasswordInput,
    )

    password = forms.CharField(
        label="Password",
        widget=forms.PasswordInput,
    )

    class Meta:
        model = User
        fields = ["full_name", "username", "password", "password2"]


    def clean_password2(self):

        password1 = self.cleaned_data.get("password")
        password2 = self.cleaned_data.get("password2")

        if password1 and password2 and password2 != password1:
            raise ValueError("Passwords doesn't match!")

        return password2


    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()

        return user


class UserChangeFormAdmin(forms.ModelForm):

    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ["password", "full_name", "is_admin", "is_staff"]
