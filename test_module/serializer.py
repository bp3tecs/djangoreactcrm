from rest_framework import serializers
from test_module.models import Test_module
from common.serializer import (
    ProfileSerializer,
    BillingAddressSerializer,
    AttachmentsSerializer,
    OrganizationSerializer
)
from teams.serializer import TeamsSerializer


class Test_moduleSerializer(serializers.ModelSerializer):
    
    date_of_birth = serializers.DateField()
    org = OrganizationSerializer()

    class Meta:
        model = Test_module
        fields = (
            "id",
           
            "name",
            "date_of_birth",
            "organization",
           
            "org"
        )



    