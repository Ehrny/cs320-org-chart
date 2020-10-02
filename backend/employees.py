import links
import pymongo
import json

# We might consider moving this to be per connection, but for now this is fine.
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["OrgChart"]

def employee_by_id(company_id: int , employee_id: int, tree_depth: int):
    employee_doc: dict = db["Employees"].find_one(
       {"employeeId": employee_id}
    )
   
    is_manager = bool(employee_doc["isManager"])
    link_to_manager = links.get("company/{}/employee/{}/manager".format(company_id, employee_id))
    link_to_employees = links.get("company/{}/employee/{}".format(company_id, employee_id))

    employees = None if not is_manager else link_to_employees if tree_depth == 0 else [
        employee_by_id(company_id, int(employee["employeeId"]), tree_depth - 1)
        for employee in db["Employees"].find(
            {"managerId": employee_id, "companyId": company_id}
        )    
    ]

    return {
        "firstName": employee_doc["firstName"],
        "lastName": employee_doc["lastName"],
        "companyName": "TODO",
        "positionTitle": employee_doc["positionTitle"],
        "isManager": is_manager,
        "email": employee_doc["email"],
        "employeeId": employee_doc["employeeId"],
        "companyId": employee_doc["companyId"],
        "startDate": employee_doc["startDate"],
        "manager": link_to_manager,
        "employees": employees,
        "actions": { # TODO

        }
    }

def employee_manager_by_id(company_id: int, employee_id: int, levels: int, tree_depth: int):
    pass

def employee_by_auth_token(company_id: int, auth_token: str, tree_depth: int):
    return employee_by_id(0, 0, tree_depth)

def employee_manager_by_auth_token(company_id: int, auth_token: str, levels: int, tree_depth: int):
    return employee_manager_by_id(0, 0, levels, tree_depth)

def login(company_id: int, username: str, password: str):
    return "khansdfkjnsdfkjnasdfkhasdfknh" # very real auth token that is not fake.