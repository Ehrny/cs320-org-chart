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

    client = pymongo.MongoClient(config.MONGO_URL)
    db = client[config.MONGO_DB]
    yield db


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
                 3 : False,
                 1 : False
            }
    }
    assert (manager_requests.create_request(db, request_add) == 1)
    assert((db["Requests"].find_one({"company_id": 1, "moved_employee": 3, "to_employee": 2})) == request_add)

def test_get_requests(db: pymongo.MongoClient):
    request1_add = {
        "type": "move",
        "company_id": 1,
        "moved_employee": 3,
        "to_manager": 2,
        "from_manager": 1,

        "approvals": {
            2: False,
            1: False
        }
    }
    request2_add = {
        "type": "move",
        "company_id": 1,
        "moved_employee": 5,
        "to_manager": 2,
        "from_manager": 1,

        "approvals": {
            2: False,
            1: False
        }
    }
    request3_add = {
        "type": "move",
        "company_id": 1,
        "moved_employee": 4,
        "to_manager": 2,
        "from_manager": 1,

        "approvals": {
            2: False,
            1: False
        }
    }
    request4_add = {
        "type": "move",
        "company_id": 1,
        "moved_employee": 5,
        "to_manager": 2,
        "from_manager": 1,

        "approvals": {
            1: False
        }
    }
    request5_add = {
        "type": "move",
        "company_id": 1,
        "moved_employee": 5,
        "to_manager": 2,
        "from_manager": 1,

        "approvals": {
            2: True,
            1: False
        }
    }
    manager_requests.create_request(db, request1_add)
    manager_requests.create_request(db, request2_add)
    manager_requests.create_request(db, request3_add)
    manager_requests.create_request(db, request4_add)
    manager_requests.create_request(db, request5_add)
    request_list = requests.get_requests(db, 2, 1)
    assert(len(request_list) == 3)
    assert(request_list[0] == request1_add)
    assert(request_list[1] == request2_add)
    assert(request_list[2] == request3_add)

def test_deny_request(db: pymongo.MongoClient):
    request1_add = {
        "type": "move",
        "company_id": 1,
        "moved_employee": 3,
        "to_manager": 2,
        "from_manager": 1,

        "approvals": {
            2: False,
            1: False
        }
    }
    manager_requests.create_request(db, request1_add)
    manager_requests.deny_request(db, 1, 2, 1, 3, 2)
    list = manager_requests.get_requests(db, 2, 1)
    assert(len(list) == 0)

def test_approve_one(database_init):
    request1_add = {
        "type": "move",
        "company_id": 1,
        "moved_employee": 3,
        "to_manager": 2,
        "from_manager": 1,

        "approvals": {
            2: False,
            1: False
        }
    }
    manager_requests.create_request(db, request1_add)
    manager_requests.approve_request(db, 1, 2, 1, 3, 2)
    list = manager_requests.get_requests(db, 2 , 1)
    assert(list[0][approvals][2] == True)
    assert(list[0][approvals][1] == False)


#still need a test for approving final approval needed

def test_approved_move(db: pymongo.MongoClient):
    #need to get the test employees
    request1_add = {
        "type": "move",
        "company_id": 1,
        "moved_employee": 3,
        "to_manager": 2,
        "from_manager": 1,

        "approvals": {
            2: False,

        }
    }
    employee1 = {

    }
    employee2 = {}
    employee3 = {}
    manager_requests.create_request(db, request1_add)
    manager_requests.approve_request(db, 1, 2, 1, 3, 2)
    list = manager_requests.get_requests(db, 2, 1)
    #need to create employees in employee file to move people around to
    assert(True)