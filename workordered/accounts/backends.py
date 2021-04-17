from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
# from django.core.exceptions import ObjectDoesNotExist


User = get_user_model()


class PayrollNumberBackend():
    def authenticate(self, request, username=None, password=None, **kwargs):

        try:
            user_data = request.data
            payroll_number = user_data["username"]
            password = user_data["password"]
        except KeyError:
            # exit if there is no data, payroll, or password
            return None

        try:
            user = User.objects.get(payroll_number=payroll_number)
        # prefer to use Model.DoesNotExist over ObjectDoesNotExist
        except User.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexistent user (#20760).
            # more secure though not the best
            User().set_password(password)
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user

    def user_can_authenticate(self, user):
        """
        Reject users with is_active=False. Custom user models that don't have
        that attribute are allowed.
        """
        is_active = getattr(user, 'is_active', None)
        return is_active or is_active is None

    def get_user(self, user_id):
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
        return user if self.user_can_authenticate(user) else None
