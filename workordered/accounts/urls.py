from django.conf.urls import url
from django.urls import path
from accounts.views import (
    register_user,
    verify_unique_payroll_number,
    confirm_if_technician,
    verify_unique_phone,
    get_current_user,
    verify_user_exists,
    reset_password)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView)


app_name = "accounts"

urlpatterns = [
    url(r"register-user", register_user, name="register_user"),
    url(r"verify-unique-payroll-number", verify_unique_payroll_number,
        name="verify_unique_payroll_number"),
    url(r"confirm-if-technician", confirm_if_technician,
        name="confirm_if_technician"),
    url(r"verify-unique-phone-number",
        verify_unique_phone, name="verify_unique_phone"),
    url(r"get-current-user", get_current_user, name="get_current_user"),

    # changing password
    url(r"verify-user-exists", verify_user_exists, name="verify_user_exists"),
    path("reset-password", reset_password, name="reset_password"),


    # for JWT
    path('api/login/', TokenObtainPairView.as_view(), name='obtain_token_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


]
