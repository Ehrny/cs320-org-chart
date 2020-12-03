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
#        "moved_employee": employee_id,
#        "to_manager": employee_id2,
#        "from_manager" : employee_id3,

#        "approvals": {
#             "employee_id" : False,
#             "employee_id2" : False
#        }
#   }


# takes a request dictionary and checks that it does not already exist 
# as well as checking that the dictinary contains all needed types
def validate_request(db :pymongo.MongoClient, request_dict: dict):
    doc = db["Requests"].find_one({"to_manager": request_dict["to_manager"],
    "from_manager": request_dict["from_manager"],
    "moved_employee": request_dict["moved_employee"]})

    if (doc == None):
        # request_keys = request_dict.keys()
        # if ("type" in request_keys and "company_id" in request_keys and
        #     "to_manager" in request_keys and "from_manager" in request_keys and
        #     "approvals" in request_keys):
        return 1

    return -1

#change the approval to true
#check if approvals is all true and approve if needed then delete request
def approve_request(db: pymongo.MongoClient, request_dict: dict, approval_id: str):

    doc = db["Requests"].find_one({"to_manager": request_dict["to_manager"],
                        "company_id" : request_dict["company_id"],
                       "from_manager": request_dict["from_manager"],
                       "moved_employee": request_dict["moved_employee"]})
    doc["approvals"][approval_id] = True

    # UPDATE THE ACTUAL REQUEST HERE
    db["Requests"].update({"to_manager": request_dict["to_manager"],
                        "company_id" : request_dict["company_id"],
                       "from_manager": request_dict["from_manager"],
                       "moved_employee": request_dict["moved_employee"]}, doc)

    allApproved = True
    for approval in doc["approvals"]:
        if (doc["approvals"][approval] == False):
            allApproved = False

    if (allApproved):
        #moving the employee and fixing the employees under
        doc = db["Employees"].update_one({"employee_id": request_dict["moved_employee"],
                                          "company_id" : request_dict["company_id"], "manager_id": request_dict["from_manager"]},
                                         {'$Set': {"manager_id" : request_dict["to_manager"]}})

        employees_under = db["Employees"].find(
            {"managerId": request_dict["moved_employee"], "companyId": request_dict["company_id"]}
        )
        # loop through current managers workers and call the edit their manager
        for employee in employees_under:
            db["Employees"].update(employee, {'$set': {"managerId": request_dict["from_manager"]}})

        db["Requests"].delete_many({ "company_id" : request_dict[company_id], "moved_employee": request_dict["employee_id"]})

        if (doc):
            return 1
    else:
        return 1
    return -1



# removes the request for a request if denied by a manager as it can no longer be approved
def deny_request(db: pymongo.MongoClient, request_dict: dict):
    doc = db["Requests"].delete_one({"to_manager": request_dict["to_manager"], "company_id" : request_dict["company_id"],
                           "from_manager": request_dict["from_manager"],
                           "moved_employee": request_dict["moved_employee"]})
    if (doc):
        return 1
    return -1


# find all approvals that need to be approved or denied by sent employee
def get_requests(db :pymongo.MongoClient, approval_id: str, company_id: int):
    list1 = []
    cursor1 = db["Requests"].find({"company_id": company_id, "approvals."+approval_id : False})

    for request in cursor1:
        list1.append(request)

    return list1

# checks to see if request is valid before adding it to the approvals dictionary
def create_request(db: pymongo.MongoClient, request_dict: dict):
    if(validate_request(db, request_dict) != 1):
        return -1
    #add double check that request is not already contained
    if (len(request_dict["approvals"]) == 0):
        request_dict["approvals"][request_dict["to_manager"]] = False
        request_dict["approvals"][request_dict["from_manager"]] = False

    db["Requests"].insert_one(request_dict)
    return 1
