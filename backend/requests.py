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
def validate_request(request_dict: dict):
    if (request_dict.has_key("type") and request_dict.has_key("company_id") and
        request_dict.has_key("to_manager") and request_dict.has_key("from_manager") and
        request_dict.has_key("approvals")):
        return 1
    return -1


def approve_request():
    pass

def deny_request():
    pass

def get_requests():

    pass

def create_request(db: pymongo.MongoClient, request_dict: dict):
    if (validate_request(request_dict) != -1):
        return -1
    if (len(request_dict[approvals]) == 0):
        request_dict[approvals][request_dict["to_manager"]] = False
        request_dict[approvals][request_dict["from_manager"]] = False
    db["Requests"].insert_one(request_dict)
    return 1