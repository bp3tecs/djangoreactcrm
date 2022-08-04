import arrow
from django.db import models
from django.utils.translation import ugettext_lazy as _

from common.models import Address, Org, Profile




class Test_module(models.Model):
    
    name = models.CharField(_("Test name"), max_length=255)
    date_of_birth = models.DateField(null=True, blank=True)
    organization = models.CharField(_("Organization"), max_length=255,null=True )
   
    
   
    org = models.ForeignKey(
        Org, on_delete=models.SET_NULL, null=True, blank=True
    )
   

    def __str__(self):
        return self.name

   
    
