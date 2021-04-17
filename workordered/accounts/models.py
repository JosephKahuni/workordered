from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin)


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, password, **other_fields):
        user = self.model(**other_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, password=None, **other_fields):
        other_fields.setdefault("is_admin", True)
        other_fields.setdefault("is_superuser", True)
        other_fields.setdefault("field", "Admin")
        other_fields.setdefault("group", "Technicians")
        return self.create_user(password, **other_fields)

    def create_operator(self, password=None, **other_fields):
        other_fields.setdefault("field", "Operator")
        other_fields.setdefault("group", "Operators")
        return self.create_user(password, **other_fields)

    def create_technician(self, field=None, password=None, **other_fields):
        other_fields.setdefault("field", field)
        other_fields.setdefault('group', "Technicians")
        return self.create_user(password, **other_fields)

    def create_engineering_store(self, password=None, **other_fields):
        other_fields.setdefault("field", "Engineering Store")
        other_fields.setdefault('group', "Technicians")
        return self.create_user(password, **other_fields)

    def create_engineering_supervisor(self, password=None, **other_fields):
        other_fields.setdefault("field", "Engineering Supervisor")
        other_fields.setdefault('group', "Supervisors")
        return self.create_user(password, **other_fields)

    def create_engineering_manager(self, password=None, **other_fields):
        other_fields.setdefault("field", "Engineering Manager")
        other_fields.setdefault('group', "Managers")
        return self.create_user(password, **other_fields)

    def create_production_supervisor(self, password=None, **other_fields):
        other_fields.setdefault("field", "Production Supervisor")
        other_fields.setdefault('group', "Supervisors")
        return self.create_user(password, **other_fields)

    def create_manager(self, password=None, **other_fields):
        other_fields.setdefault("field", "Manager")
        other_fields.setdefault('group', "Managers")
        return self.create_user(password, **other_fields)

    def create_QA(self, password=None, **other_fields):
        other_fields.setdefault("field", "Quality Assurance")
        other_fields.setdefault("group", "QA")
        return self.create_user(password, **other_fields)

    def create_office_staff(self, password=None, **other_fields):
        other_fields.setdefault("field", "Office Personnel")
        other_fields.setdefault("group", "Office Staff")
        return self.create_user(password, **other_fields)

    def create_distribution(self, password=None, **other_fields):
        other_fields.setdefault("field", "Distribution")
        other_fields.setdefault("group", "Distribution")
        return self.create_user(password, **other_fields)


class User(AbstractBaseUser, PermissionsMixin):
    payroll_number = models.CharField(max_length=15, unique=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    fullname = models.CharField(max_length=50, null=True)
    username = models.CharField(max_length=30, unique=True, null=True)
    phone_number = models.CharField(max_length=15, unique=True, null=True)
    alternative_phone_number = models.CharField(
        max_length=15, unique=True, null=True)
    group = models.CharField(max_length=30, null=True)
    field = models.CharField(max_length=35, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    date_edited = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = "username"

    REQUIRED_FIELDS = ["payroll_number", "first_name",
                       "last_name", "phone_number"]

    objects = UserManager()

    class Meta:
        verbose_name = "Users"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.first_name

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perm(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
