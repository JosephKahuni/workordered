from accounts.models import User
from rest_framework import serializers


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "fullname", "username", "payroll_number",
                  "phone_number", "alternative_phone_number", "group", "field", "date_joined", "date_edited",
                  "last_login", "password", "is_active", "is_superuser", "is_admin"]


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'payroll_number', 'phone_number',
                  'alternative_phone_number', 'group', 'password']

class GetAllUSersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","first_name", "last_name", "payroll_number"]
