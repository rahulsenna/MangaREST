from django.contrib.auth.models import User
from django import forms
from django.core import validators


class RegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    name = forms.CharField(required=False,
                           widget=forms.HiddenInput,
                           label='Name',
                           validators=[validators.MaxLengthValidator(0)]
                           )

    class Meta:
        model = User
        fields = ['username', 'password']
