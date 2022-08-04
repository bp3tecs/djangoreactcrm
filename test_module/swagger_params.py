from drf_yasg import openapi

organization_params_in_header = openapi.Parameter(
    'org', openapi.IN_HEADER, required=True, type=openapi.TYPE_INTEGER)

organization_params = [
    organization_params_in_header,
]

test_module_list_get_params = [
    organization_params_in_header,
    openapi.Parameter("name", openapi.IN_QUERY, type=openapi.TYPE_STRING),
    
]
test_module_create_post_params = [
    organization_params_in_header,
    
    openapi.Parameter(
        "name", openapi.IN_QUERY, required=True, type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        "title", openapi.IN_QUERY, required=True, type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        "mobilenumber",
        openapi.IN_QUERY,
        type=openapi.TYPE_NUMBER,
       
    ),
    openapi.Parameter("contact", openapi.IN_QUERY, type=openapi.TYPE_INTEGER),
    
    
]
