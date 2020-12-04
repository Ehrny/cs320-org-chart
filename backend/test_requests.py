import pytest
import pymongo
import json
import dns
import employees
import links
import manager_requests
import config; config.load_config(".testenv")


@pytest.fixture
def db():
    with open('testdata.json') as f:
        testdata = json.load(f)

    client = pymongo.MongoClient(config.MONGO_URL)
    db = client[config.MONGO_DB]

    db["Employees"].delete_many({})
    db["Employees"].drop_indexes()
    # db["Employees"].insert_many(testdata)
    db["Requests"].delete_many({})
    db["Requests"].drop_indexes()
    db["Requests"].insert_many(testdata)
    yield db
    db["Employees"].drop()
    db["Requests"].drop()

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
def test_adding_requests(db: pymongo.MongoClient):
    request_add = {
           "type" : "move",
            "company_id" : 1,
            "moved_employee": 3,
            "to_manager": 2,
            "from_manager" : 1,

            "approvals": {
                 "3" : False,
                 "1" : False
            }
    }
    # doc is not none without deleting extras in database? Might need to see y this is true
    # db["Requests"].delete_many({"company_id": 1, "moved_employee": 3, "to_manager": 2})
    doc = db["Requests"].find_one({"to_manager": 2,
                                   "company_id": 1,
                                   "from_manager": 1,
                                   "moved_employee": 3})
    assert (doc == None)
    assert (manager_requests.create_request(db, request_add) == 1)
    assert(db["Requests"].find_one({"type" : "move", "company_id" : 1,
            "moved_employee": 3, "to_manager": 2, "from_manager" : 1,
            "approvals": {
                 "3" : False,
                 "1" : False
            }}) != None)

def test_get_requests(db: pymongo.MongoClient):
    request1_add = {
        "type": "move",
        "company_id": 1,
        "moved_employee": 3,
        "to_manager": 2,
        "from_manager": 1,

        "approvals": {
            "2": False,
            "1": False
        }
    }
    request2_add = {
        "type": "move",
        "company_id": 1,
        "moved_employee": 4,
        "to_manager": 2,
        "from_manager": 1,

        "approvals": {
            "2": False,
            "1": False
        }
    }
    request3_add = {
        "type": "move",
        "company_id": 1,
        "moved_employee": 5,
        "to_manager": 2,
        "from_manager": 1,

        "approvals": {
            "2": False,
            "1": False
        }
    }
    request4_add = {
        "type": "move",
        "company_id": 1,
        "moved_employee": 6,
        "to_manager": 2,
        "from_manager": 1,

        "approvals": {
            "1": False
        }
    }
    request5_add = {
        "type": "move",
        "company_id": 1,
        "moved_employee": 7,
        "to_manager": 2,
        "from_manager": 1,

        "approvals": {
            "2": True,
            "1": False
        }
    }
    manager_requests.create_request(db, request1_add)
    manager_requests.create_request(db, request2_add)
    manager_requests.create_request(db, request3_add)
    manager_requests.create_request(db, request4_add)
    manager_requests.create_request(db, request5_add)
    request_list = manager_requests.get_requests(db, "2", 1)
    # assert((db["Requests"].find({"company_id": "1", "approvals": {"2": False}})).count == 4)
    assert(len(request_list) == 3)
    assert(request_list[0]["moved_employee"] == 3 or request_list[0]["moved_employee"] == 4 or request_list[0]["moved_employee"] == 5)
    assert(request_list[1]["moved_employee"] == 5 or request_list[1]["moved_employee"] == 4 or request_list[1]["moved_employee"] == 3)
    assert(request_list[2]["moved_employee"] == 5 or request_list[2]["moved_employee"] == 4 or request_list[2]["moved_employee"] == 3)

def test_deny_request(db: pymongo.MongoClient):
    request1_add = {
        "type": "move",
        "company_id": 1,
        "moved_employee": 3,
        "to_manager": 2,
        "from_manager": 1,

        "approvals": {
            "2": False,
            "1": False
        }
    }

    manager_requests.create_request(db, request1_add)
    manager_requests.deny_request(db, request1_add)
    list = manager_requests.get_requests(db, "2", 1)
    assert(len(list) == 0)

def test_approve_one(db: pymongo.MongoClient):
    request1_add = {
        "type": "move",
        "company_id": 1,
        "moved_employee": 3,
        "to_manager": 2,
        "from_manager": 1,

        "approvals": {
            "2": False,
            "1": False
        }
    }
    manager_requests.create_request(db, request1_add)
    manager_requests.approve_request(db, request1_add, "2")
    list = manager_requests.get_requests(db, "1", 1)
    print(list)
    assert(list[0]["approvals"]["2"] == True)
    assert(list[0]["approvals"]["1"] == False)



def test_approved_move(db: pymongo.MongoClient):
    #need to get the test employees
    request1_add = {
        "type": "move",
        "company_id": 2,
        "moved_employee": 2,
        "to_manager": 3,
        "from_manager": 1,

        "approvals": {
            "3": False,
        }
    }
    CEO = {
        "firstName": "Erika",
        "lastName": "Wilcox",
        "companyId": 2,
        "password": "wilcoxer",
        "positionTitle": "CEO",
        "companyName": "Tiger Microsystems",
        "isManager": True,
        "employeeId": 1,
        "email": "Erika_Wilcox@tigermicrosystems.com",
        "startDate": "1995-05-27"
    }

    employee1 = {
        "firstName": "Salvatore",
        "lastName": "Gallagher",
        "companyId": 2,
        "password": "gallaghersa",
        "positionTitle": "Engineering Manager",
        "companyName": "Tiger Microsystems",
        "isManager": True,
        "employeeId": 2,
        "managerId": 1,
        "email": "Salvatore_Gallagher@tigermicrosystems.com",
        "startDate": "1999-05-25"
    }

    employee2 = {
        "firstName": "Abdul",
        "lastName": "Humphrey",
        "companyId": 2,
        "password": "humphreyab",
        "positionTitle": "Engineering Manager",
        "companyName": "Tiger Microsystems",
        "isManager": True,
        "employeeId": 3,
        "managerId": 2,
        "email": "Abdul_Humphrey@tigermicrosystems.com",
        "startDate": "2010-09-22"
    }
    employees.add_employee_to_db(db, CEO)
    employees.add_employee_to_db(db, employee1)
    employees.add_employee_to_db(db, employee2)
    manager_requests.create_request(db, request1_add)
    manager_requests.approve_request(db, request1_add, "3")
    assert(db["Employees"].find({"firstName": "Abdul"})[managerId] == 1)
    assert (db["Employees"].find({"firstName": "Salvatore"})[managerId] == 1)

