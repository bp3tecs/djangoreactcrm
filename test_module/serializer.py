from rest_framework import serializers

from test_module.models import Test_module
from common.serializer import (
    ProfileSerializer,
    BillingAddressSerializer,
    AttachmentsSerializer,
    OrganizationSerializer
)
from teams.serializer import TeamsSerializer
from contacts.serializer import ContactSerializer


class Test_moduleSerializer(serializers.ModelSerializer):
    
    #date = serializers.DateField()
    org = OrganizationSerializer()
    contact = ContactSerializer()
    class Meta:
        model = Test_module
        fields = (
            "id",
           
            "name",
            "mobilenumber",
            "title",
            "contact",
            #"contactname",
            "org"
        )


class CreateTest_moduleSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        request_obj = kwargs.pop("request_obj", None)
        super().__init__(*args, **kwargs)
        self.org = request_obj.org
        #date = serializers.DateField()
        contact = ContactSerializer()
        org = OrganizationSerializer()

    class Meta:
        model = Test_module
        fields = (
            "name",
            "mobilenumber",
            "title",
    "org",

"contact",    
#"contactname"
            
        )

    