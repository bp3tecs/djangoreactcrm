from multiprocessing import context
from rest_framework import status
from common.models import Attachments, Comment, Profile 
from test_module.models import Test_module, Profile
from teams.models import Teams
from django.db.models import Q
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from common.custom_auth import JSONWebTokenAuthentication
from test_module import swagger_params
from test_module.serializer import *
from rest_framework.views import APIView
from test_module.tasks_NU import send_email_to_assigned_user
from contacts.models import Contact
import json


class Test_moduleListView(APIView, LimitOffsetPagination):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    model = Test_module

   

    def get_context_data(self, **kwargs):
        params = (
            self.request.query_params
            if len(self.request.data) == 0
            else self.request.data
        )
        print(params)
        queryset = self.model.objects.filter(
            org=self.request.org).order_by("-id")
       # if self.request.profile.role != "ADMIN" and not self.request.profile.is_admin:
        

        if params:
            if params.get("name"):
                queryset = queryset.filter(
                    first_name__icontains=params.get("name")
                )
           

        context = {}
        results_test_module = self.paginate_queryset(
            queryset.distinct(), self.request, view=self
        )
        test_module = Test_moduleSerializer(results_test_module, many=True).data
        if results_test_module:
            offset = queryset.filter(id__gte=results_test_module[-1].id).count()
            if offset == queryset.count():
                offset = None
        else:
            offset = 0
        context.update(
            {
                "test_module_count": self.count,
                "offset": offset
            }
        )
        if params.get("contact"):
                assinged_to_list = json.load(
                    params.get("contact"))
                contacts = Contact.objects.filter(
                    id__in=assinged_to_list,org=self.request.org)
                #lead_obj.assigned_to.add(*contacts)
        contacts = Contact.objects.filter(org=self.request.org).values(
            "id",
                  "first_name"
        )
        #print('connnn'+contacts)
        context["test_module_obj_list"] = test_module
       
        context["per_page"] = params.get("per_page")
       

        return context

    @swagger_auto_schema(
        tags=["Test_module"], manual_parameters=swagger_params.test_module_list_get_params
    )
    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        return Response(context)

    @swagger_auto_schema(
        tags=["Test_module"], manual_parameters=swagger_params.test_module_create_post_params
    )
    
    def post(self, request, *args, **kwargs):
        params = request.query_params if len(
            request.data) == 0 else request.data
        test_module_serializer = CreateTest_moduleSerializer(
            data=params, request_obj=request
        )
        

        data = {}
        if not test_module_serializer.is_valid():
            data["testmodule_errors"] = test_module_serializer.errors
       
        if data:
            return Response(
                {"error": True, "errors": data},
                status=status.HTTP_400_BAD_REQUEST,
            )
       
        test_module_obj = test_module_serializer.save(
           
        )
       
        test_module_obj.org = request.org
        test_module_obj.save()

        

       
        return Response(
            {"error": False, "message": "Testmodule created Successfuly"},
            status=status.HTTP_200_OK,
        )