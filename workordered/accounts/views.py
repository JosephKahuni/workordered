# from django.shortcuts import render
from django.contrib.auth.models import Group
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from technicians.models import Engineering

from accounts.serializers import UserRegistrationSerializer, GetAllUSersSerializer

User = get_user_model()

# from rest_framework.parsers import JSONParser


@api_view(["GET"])
@permission_classes((AllowAny,))
def verify_unique_payroll_number(request):
    # request.query_params returns the HttpParams sent from front end, as QueryDict.
    # dict() converts QueryDict to regular python dict
    response_if_okay = {
        "message": "payroll number available"
    }
    response_if_taken = {"message": "payroll number taken"}
    response_if_no_payroll_number = {"message": "no payroll number"}
    try:
        payroll_number = request.query_params.dict()['payroll_number']
    except KeyError:
        payroll_number = None
    if not payroll_number is None:
        try:
            user_obj = User.objects.get(payroll_number=payroll_number)
        except ObjectDoesNotExist:
            user_obj = None
        if user_obj is None:
            return Response(response_if_okay, status=status.HTTP_200_OK)
        return Response(response_if_taken, status=status.HTTP_200_OK)
    return Response(response_if_no_payroll_number, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes((AllowAny,))
def confirm_if_technician(request):
    is_technician = {"message": "technician"}
    is_not_technican = {"message": "not technician"}
    no_payroll_number = {"message": "no payroll number"}

    payroll_number = request.query_params.dict()['payroll_number']

    if payroll_number:
        try:
            technician = Engineering.objects.get(payroll_number=payroll_number)
        except ObjectDoesNotExist:
            technician = None
        if not technician is None:
            return Response(is_technician, status=status.HTTP_200_OK)
        return Response(is_not_technican, status=status.HTTP_200_OK)
    return Response(no_payroll_number, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes((AllowAny,))
def verify_unique_phone(request):
    is_registered = {"message": "phone registered"}
    is_available = {"message": "phone available"}
    no_phone = {"message": "no phone"}
    phone_number = request.query_params.dict()["phone_number"]
    if phone_number:
        try:
            phone = User.objects.get(Q(phone_number=phone_number) | Q(
                alternative_phone_number=phone_number))
        except ObjectDoesNotExist:
            phone = None
        if not phone is None:
            return JsonResponse(is_registered, safe=False)
        return JsonResponse(is_available, safe=False)
    return JsonResponse(no_phone, safe=False)


@api_view(["POST"])
@permission_classes((AllowAny,))
def register_user(request):
    # user registration data received from ng
    data = request.data

    # capitalize the first and last names of the user
    data["first_name"] = data["first_name"].capitalize()
    data["last_name"] = data["last_name"].capitalize()

    # enable saving NULL in the alt_phone field incase none was provided
    alt_phone = data["alternative_phone_number"]
    if alt_phone:
        alt_phone = str(alt_phone)
    else:
        alt_phone = None

    phone = data["phone_number"]

    payroll_number = data["payroll_number"]
    user_group = data['group']

    user_data = {"first_name": data["first_name"],
                 "last_name": data["last_name"],
                 "payroll_number": str(payroll_number),
                 "phone_number": phone,
                 "alternative_phone_number": alt_phone,
                 "password": data["password"]}

    # check if the user is a technician, for later saving
    try:
        technician = Engineering.objects.get(payroll_number=payroll_number)
    except ObjectDoesNotExist:
        technician = None

    # save users based on their group and pass if any error occurs while saving.
    try:
        if technician:
            if str(payroll_number) == str(1031):
                User.objects.create_superuser(**user_data).groups.add(Group.objects.get(
                    name="admin"), Group.objects.get(name="eng. stores"), Group.objects.get(name="technicians"))
            elif technician.field in list(("Electrical", "Mechanical")):
                user_data["field"] = technician.field
                User.objects.create_technician(
                    **user_data).groups.add(Group.objects.get(name="technicians"))
            elif technician.field == "Eng. Stores":
                User.objects.create_engineering_store(**user_data).groups.add(
                    Group.objects.get(name="technicians"), Group.objects.get(name="eng. stores"))
            elif technician.field == "Supervisor":
                User.objects.create_engineering_supervisor(**user_data).groups.add(
                    Group.objects.get(name="eng. supervisors"), Group.objects.get(name="supervisors"))
            elif technician.field == "Manager":
                User.objects.create_engineering_manager(**user_data).groups.add(
                    Group.objects.get(name="eng. manager"), Group.objects.get(name="managers"))

        elif user_group == "Operators":
            User.objects.create_operator(
                **user_data).groups.add(Group.objects.get(name="operators"))

        elif user_group == "Supervisors" and not technician:
            User.objects.create_production_supervisor(**user_data).groups.add(
                Group.objects.get(name="supervisors"), Group.objects.get(name="pdn. supervisors"))

        elif user_group == "Managers":
            User.objects.create_manager(
                **user_data).groups.add(Group.objects.get(name="managers"))

        elif user_group == "QA":
            User.objects.create_QA(
                **user_data).groups.add(Group.objects.get(name="QA"))

        elif user_group == "Office Staff":
            User.objects.create_office_staff(
                **user_data).groups.add(Group.objects.get(name="office staff"))

        elif user_group == "Distribution":
            User.objects.create_distribution(
                **user_data).groups.add(Group.objects.get(name="distribution"))

    except:
        pass

    # get user object if saved successfully
    try:
        user_obj = User.objects.get(payroll_number=payroll_number)

    except ObjectDoesNotExist:
        user_obj = None

    # append fullname and username to the user
    if user_obj:
        generate_other_names(user_obj)
        response = {"message": user_obj.username}

    else:
        response = {"message": "error occured"}

    return Response(response, status=status.HTTP_202_ACCEPTED)

# utility function for user registration


def generate_other_names(user_obj):
    first_f = list(user_obj.first_name.split(" ", 1)[0])[0]
    first_s = user_obj.last_name.split(" ", 1)[0]

    second_f = list(user_obj.last_name.split(" ", 1)[0])[0]
    second_s = user_obj.first_name.split(" ", 1)[0]

    third_f = list(user_obj.first_name.split(" ", 1)[0])[0]
    third_lower_s = user_obj.last_name.lower().split(" ", 1)[0]

    fourth_f = list(user_obj.last_name.split(" ", 1)[0])[0]
    fourth_lower_s = user_obj.first_name.lower().split(" ", 1)[0]

    fifth_lower_f = list(user_obj.first_name.lower().split(" ", 1)[0])[0]
    fifth_lower_s = user_obj.last_name.lower().split(" ", 1)[0]

    sixth_lower_f = list(user_obj.last_name.lower().split(" ", 1)[0])[0]
    sixth_lower_s = user_obj.first_name.lower().split(" ", 1)[0]

    # final_option = third_f + third_lower_s + str( -) + user_obj.payroll_number

    first_username = first_f + first_s
    second_username = second_f + second_s
    third_username = third_f + third_lower_s
    fourth_username = fourth_f + fourth_lower_s
    fifth_username = fifth_lower_f + fifth_lower_s
    sixth_username = sixth_lower_f + sixth_lower_s
    final_username = third_username + "-" + user_obj.payroll_number

    def generate_username():
        usernames = [first_username, second_username, third_username, fourth_username, fifth_username,
                     sixth_username, final_username]

        for username in usernames:
            if not User.objects.filter(username=username).exists():
                return username

    # generate a username and fullname for a new user
    user_obj.username = generate_username()
    user_obj.fullname = user_obj.first_name + " " + user_obj.last_name
    user_obj.save()


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def get_users(request):

    users = User.objects.all()

    data = request.data

    print("\n\n\n THIS IS THE TEST URL")
    print(data)
    print(request.user)
    print("\n\n\n")

    serialized_data = GetAllUSersSerializer(users, many="true")

    return Response(serialized_data.data)


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def get_current_user(request):
    user = request.user
    if user:
        user = {
            "fullname": user.fullname,
            "username": user.username
        }
        return Response(user)
    return Response("no user", status=status.HTTP_401_UNAUTHORIZED)


@api_view(["POST"])
@permission_classes((AllowAny,))
def verify_user_exists(request):
    username = request.data['username']
    phone_number = request.data['phone_number']

    invalid_credentials = {
        'message': 'invalid user credentials'
    }
    user_found = {
        'mesage': 'user found'
    }
    no_credentials = {
        'message': 'no credentials'
    }

    if username and phone_number:
        try:
            user = User.objects.get(
                Q(username=username) | Q(payroll_number=username))
        except User.DoesNotExist:
            user = None
        if user is None or phone_number != user.phone_number:
            return Response(invalid_credentials)
        return Response(user_found)
    return Response(no_credentials)


@api_view(["POST"])
@permission_classes((AllowAny,))
def reset_password(request):
    username = request.data['username']
    password = request.data['password']

    if username and password:
        try:
            user = User.objects.get(
                Q(username=username) | Q(payroll_number=username))
        except User.DoesNotExist:
            user = None
        if not user is None:
            user.set_password(password)
            user.save()
            password_changed = {
                'message': 'password successfully changed'
            }
            return Response(password_changed)
        invalid_user = {
            'message': 'invalid user credentials'
        }
        return Response(invalid_user)
    no_user = {
        'message': 'no credentials'
    }
    return Response(no_user)
