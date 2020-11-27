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
#          "employee_id_moved" : employee_id
#        "approvals": {
#             "employee_id" : False,
#             "employee_id2" : False
#        }
#   }


# takes a request dictionary and checks that it does not already exist 
# as well as checking that the dictinary contains all needed types
def validate_request(request_dict: dict):
    doc = db["Requests"].find_one({"to_manager": request_dict["to_manager"],
    "from_manager": request_dict["from_manager"],
    "employee_id_moved": request_dict["employee_id"]})
    if (!doc):
        if (request_dict.has_key("type") and request_dict.has_key("company_id") and
            request_dict.has_key("to_manager") and request_dict.has_key("from_manager") and
            request_dict.has_key("approvals")):
            return 1
    return -1

#change the approval to true
#check if approvals is all true and approve if needed then delete request
def approve_request(db: pymongo.MongoClient, company_id: str, to_manager: str, from_manager: str, employee_moved: str, approval_id: str):

    doc = db["Requests"].find_one({"to_manager": request_dict["to_manager"],
                        "company_id" : request_dict[company_id],
                       "from_manager": request_dict["from_manager"],
                       "employee_id_moved": request_dict["employee_id"]})
    doc[approvals][approval_id] = True
    allApproved = True
    for approval in doc[approvals]:
        if approval == False:
            allAproved = False
   if (allAproved):
        doc = db["Employees"].update_one({"employee_id": employee_moved,  "company_id" : request_dict[company_id], "manager_id": from_manager},
                                         {'$Set': {"manager_id" : to_manager}})

        db["Requests"].delete_many({ "company_id" : request_dict[company_id], "employee_id_moved": request_dict["employee_id"]})
        if (doc):
            return 1
    else:
        return 1
    return -1


# removes the request for a request if denied by a manager as it can no longer be approved
def deny_request(db: pymongo.MongoClient, company_id: str, to_manager: str, from_manager: str, employee_moved: str, approval_id: str):
    doc = db["Requests"].delete_one({"to_manager": request_dict["to_manager"], "company_id" : request_dict[company_id],
                           "from_manager": request_dict["from_manager"],
                           "employee_id_moved": request_dict["employee_id"]})
    if (doc)
        return 1
    return -1

# find all approvals that need to be approved or denied by sent employee
def get_requests(db :pymongo.MOngoClient, employee_id, company_id):
    list = []
    cursor1 = db["Requests"].find({"company_id": company_id,"approvals": {employee_id : False}})
    for request in cursor1:
        list.append(request)
    return list

# checks to see if request is valid before adding it to the approvals dictionary
def create_request(db: pymongo.MongoClient, request_dict: dict):
    if (validate_request(request_dict) != -1):
        return -1
    #add double check that request is not already contained
    if (len(request_dict[approvals]) == 0):
        request_dict[approvals][request_dict["to_manager"]] = False
        request_dict[approvals][request_dict["from_manager"]] = False

    db["Requests"].insert_one(request_dict)
    return 1
