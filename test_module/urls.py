from django.urls import path
from test_module import views

app_name = "api_test_module"

urlpatterns = [
    path("", views.Test_moduleListView.as_view()),
    
]
