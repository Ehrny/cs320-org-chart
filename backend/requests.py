import links
import pymongo
import json
import jwt
import datetime
import dns


#4+ main methods
#REQUEST EXAMPLE
#    request = {
#        "type" : "fire, add, move",
#        "company_id" : company_id,
#        "to_manager": employee_id,
#        "from_manager" : employee_id2,
#        "approvals": {
#             "employee_id" : False,
#             "employee_id2" : False
#        }
#   }
def validate_request():
    return 1
    pass


def approve_request():
    pass

def deny_request():
    pass

def get_requests():
    pass

def create_request(request_dict: dict):
    if (validate_request(request_dict) == -1):
        return -1
    
    pass