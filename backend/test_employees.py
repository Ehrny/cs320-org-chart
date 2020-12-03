from pymongo.mongo_client import MongoClient
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

def test_employee_by_id_trivial(db: pymongo.MongoClient):
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

def test_add_edit_drop(db: pymongo.MongoClient):

    CEO = {
        "firstName" : "Erika",
        "lastName" : "Wilcox",
        "companyId" : 2,
        "password" : "wilcoxer",
        "positionTitle" : "CEO",
        "companyName" : "Tiger Microsystems",
        "isManager" : True,
        "employeeId" : 1,
        "email" : "Erika_Wilcox@tigermicrosystems.com",
        "startDate" : "1995-05-27"
    }

    employee1 = {
        "firstName" : "Salvatore",
        "lastName" : "Gallagher",
        "companyId" : 2,
        "password" : "gallaghersa",
        "positionTitle" : "Engineering Manager",
        "companyName" : "Tiger Microsystems",
        "isManager" : True,
        "employeeId" : 2,
        "managerId" : 1,
        "email" : "Salvatore_Gallagher@tigermicrosystems.com",
        "startDate" : "1999-05-25"
    }

    employee2 = {
        "firstName" : "Abdul",
        "lastName" : "Humphrey",
        "companyId" : 2,
        "password" : "humphreyab",
        "positionTitle" : "Engineering Manager",
        "companyName" : "Tiger Microsystems",
        "isManager" : True,
        "employeeId" : 3,
        "managerId" : 2,
        "email" : "Abdul_Humphrey@tigermicrosystems.com",
        "startDate" : "2010-09-22"
    }

    employee2_modified = {
        "firstName" : "Abdul2",
        "lastName" : "Humphrey",
        "companyId" : 2,
        "password" : "humphreyab",
        "positionTitle" : "Engineering Manager",
        "companyName" : "Tiger Microsystems",
        "isManager" : True,
        "employeeId" : 3,
        "managerId" : 2,
        "email" : "Abdul_Humphrey@tigermicrosystems.com",
        "startDate" : "2010-09-22"
    }

    #Add
    assert (employees.add_employee_to_db(db, CEO) == "success")
    assert (employees.add_employee_to_db(db, employee1) == "success")
    assert (employees.add_employee_to_db(db, employee2) == "success")

    # Check that employee has been added.
    assert (
        employees.employee_by_id(db, 2, 1, 0)["firstName"] == "Erika"
    )
    assert (
        employees.employee_by_id(db, 2, 2, 0)["firstName"] == "Salvatore"
    )
    assert (
        employees.employee_by_id(db, 2, 3, 0)["firstName"] == "Abdul"
    )

    #Edit
    assert (employees.edit_employee(db, employee2.get("companyId"), employee2.get("employeeId"), employee2_modified) == "success")
    
    assert (
        employees.employee_by_id(db, 2, 3, 0)["firstName"] == "Abdul2"
    )

    #Delete
    assert (employees.drop_employee_from_db(db, employee1) == "success")


def test_dropping_to_change_manager(db: pymongo.MongoClient):
    test_employee = {
        "firstName": "Please",
        "lastName": "Work",
        "companyName": "Tiger_Microsystems-emplyees.json",
        "positionTitle": "Data tester",
        "isManager": False,
        "email": "test@gmail.com",
        "employeeId": "0",
        "companyId": "1",
        "startDate": "sometime",
        "manager": "1",
        "managerId": 1,
        "employees": {},
        "actions": {}}
    test_employee_two = {
        "firstName": "Drop",
        "lastName": "Works",
        "companyName": "Tiger_Microsystems-emplyees.json",
        "positionTitle": "Data tester",
        "isManager": False,
        "email": "test@gmail.com",
        "employeeId": "100000",
        "companyId": "1",
        "startDate": "sometime",
        "manager": "0",
        "managerId": 0,
        "employees": {},
        "actions": {}}
    assert (employees.add_employee_to_db(db, test_employee)  == "success")
    assert (employees.add_employee_to_db(db, test_employee_two) == "success")
