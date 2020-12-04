import pytest
import pymongo
import json
import dns
import search
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

    db["Employees"].create_index([
        ("firstName", "text"),
        ("lastName", "text"),
        ("positionTitle", "text"),
        ("companyName", "text"),
        ("email", "text"),
    ])

    yield db

    db["Employees"].drop()

def test_search_all_trivial(db):
    miquel = json.dumps({
        "results": [
            {
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
            }
        ]
    })

    res = search.search_all(db, 1, "Miquel")
    assert json.dumps(res) == miquel, "Search all should return correct format"

    lowercase_res = search.search_all(db, 1, "miquel")
    assert json.dumps(res) == miquel, "Search all should be case insensitive"

def test_search_field_trivial(db):
    miquel = {
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
    }
    
    firstname_results = {
        "results": [
            miquel
        ]
    }

    res = search.search_field(db, 1, "Miquel", "firstName")
    assert res["results"][0] == miquel, "Firstname should return correct result"
    res = search.search_field(db, 1, "miquel", "firstName")
    assert res["results"][0] == miquel, "Firstname should be case insensitive"

    res = search.search_field(db, 1, "Pineda", "lastName")
    assert res["results"][0] == miquel, "Lastname should return in order of employeeId"

    res = search.search_field(db, 1, "CEO", "positionTitle")
    assert res["results"][0] == miquel, "positionTitle should return correct result"
    
    res = search.search_field(db, 1, "Miquel_Pineda@cycloneaviation.com", "email")
    assert res["results"][0] == miquel, "email should return correct result"