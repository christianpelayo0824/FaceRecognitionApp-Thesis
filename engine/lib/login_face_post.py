import requests
import json

BASE_LINK = "http://localhost:8080/api/resource/loginEmployee"


def login_employee_by_id(employee_id):
    requests.post(BASE_LINK + "/saveLoginEmployee/" + str(employee_id))


def get_all_login_employee():
    req = requests.get("http://localhost:8080/api/resource/loginEmployee/getAllLoginEmployee")
    print(req.json())


get_all_login_employee()
# login_employee_by_id(12345678)
