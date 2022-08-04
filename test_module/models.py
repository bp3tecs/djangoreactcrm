import arrow
from django.db import models
from django.utils.translation import ugettext_lazy as _

from common.models import Address, Org, Profile
from contacts.models import Contact




class Test_module(models.Model):
    
    name = models.CharField(_("Test name"), max_length=255)
    mobilenumber = models.BigIntegerField(null=True, blank=True)
    title = models.CharField(_("title"), max_length=255,null=True )
   
    
   
    org = models.ForeignKey(
        Org, on_delete=models.SET_NULL, null=True, blank=True
    )
   
    contact = models.ForeignKey(Contact,related_name="Contact",on_delete=models.CASCADE,blank=True,null=True, )
    #contactname =  models.CharField(_("contactname"), max_length=255, null=True)

    def __str__(self):
        return self.name

   
    
