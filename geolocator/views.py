from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
import re
import openpyxl
from geopy.exc import GeocoderTimedOut
from openpyxl.utils.exceptions import InvalidFileException
from geopy.geocoders import MapQuest
from geolocator.utils import validate_address
from geolocator.utils import parse_excel

def index(request):
    if request.method == "POST":
        output = {}
        try:
            try:
                excel_file = request.FILES.get("xl")
                extention = excel_file.name.split('.')[1]
                if extention not in settings.VALID_EXCEL_EXTENSIONS:
                    output['error'] = "Please upload valid excel file"
                    return JsonResponse(output)
            except:
                output['error'] = "Not able to load Excel. Make sure you are uploading valid excel file"
                return JsonResponse(output,safe=False)                
            op = parse_excel(excel_file)
            output['data'] = op        
            return JsonResponse(output,safe=False)
        except GeocoderTimedOut as e:
            output['error'] = "Geocoding service Timed Out. Please wait for a while or make sure you are connected to internet"
            return JsonResponse(output,safe=False)
        except Exception as e:
            output['error'] = "Internal Server Error"
            return JsonResponse(output,safe=False)
    return render(request, 'geolocator/index.html')
        
    