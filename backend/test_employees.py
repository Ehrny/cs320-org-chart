import pytest
import pymongo
import json
import dns
import employees
import links
import config; config.load_config(".testenv")


@pytest.fixture
def db():
    with open('testdata.json') as f:
        testdata = json.load(f)
    
    client = pymongo.MongoClient(config.MONGO_URL)
    db = client[config.MONGO_DB]
    
    db["Employees"].delete_many({})
    db["Employees"].drop_indexes()
    db["Employees"].insert_many(testdata)

    yield db

    db["Employees"].drop()

def test_employee_by_id_trivial(db):
    res = employees.employee_by_id(db, 1, 1, 0)
    assert json.dumps(res) == json.dumps({
        "firstName" : "Miquel",
        "lastName" : "Pineda",
        "companyName" : "TODO",
        "positionTitle" : "CEO",
        "isManager" : True,
        "email" : "Miquel_Pineda@cycloneaviation.com",
        "employeeId": 1,
        "companyId": 1,
        "startDate" : "2016-05-04",
        "manager": links.get("company/1/employee/1/manager"),
        "managerId": None,
        "employees": links.get("company/1/employee/1"),
        "actions": { # TODO
        }
    })