import links
import pymongo
import json
import jwt
import datetime

# We might consider moving this to be per connection, but for now this is fine.
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["OrgChart"]

# Return a tree of employees with depth tree depth rooted with employee_doc
def employee_tree(employee_doc: dict, tree_depth: int):
    employee_id = employee_doc["employeeId"]
    company_id = employee_doc["companyId"]
    is_manager = bool(employee_doc["isManager"])
    link_to_manager = links.get("company/{}/employee/{}/manager".format(company_id, employee_id))
    link_to_employees = links.get("company/{}/employee/{}".format(company_id, employee_id))

    employees = None if not is_manager else link_to_employees if tree_depth == 0 else [
        employee_tree(employee, tree_depth - 1)
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

def employee_by_id(company_id: int , employee_id: int, tree_depth: int):
    employee_doc: dict = db["Employees"].find_one(
       {"employeeId": employee_id}
    )
    return employee_tree(employee_doc, tree_depth)

def employee_manager_by_id(company_id: int, employee_id: int, levels: int, tree_depth: int):
    pass # TODO

def employee_by_auth_token(company_id: int, auth_token: str, tree_depth: int):
    return employee_by_id(0, 0, tree_depth) # TODO

def employee_manager_by_auth_token(company_id: int, auth_token: str, levels: int, tree_depth: int):
    return employee_manager_by_id(0, 0, levels, tree_depth) # TODO

def login(company_id: int, username: str, password: str):
    pload = {'company_id': company_id, 'username': username, 'password': password}
    employee_found : dict = db["Employees"].find_one_or_404(pload)
    r = requests.post(path, pload) #path is the website url, which at this point I do not have.
    if(r.status_code == '404'):
        print("Username/password incorrect, please try again")
        auth_token, employee_id = -1, -1
    elif(r.status_code == '200'):
        auth_token, employee_id = "KSihH4DasdSg4ht6yFJfxzKSyuwADsvJFK8L", 10 #replace fake auth token and eid with real ones

    return auth_token # very real auth token that is not fake.

def encode_auth_token(company_id: int, username: int):
    """
    Generates the auth_token
    """
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + timedelta(days = 0, hours = 1, seconds = 0)
            'iat': datetime.datetime.utcnow()
            'cid': company_id
            'uid': username
        }
        return jwt.encode(payload, app.config.get('SECRET_KEY'), algorithm='HS256')
    except Exception as e:
        return e

@staticmethod
def decode_auth_token(auth_token):
    """
    Decodes the auth token
    """
    try:
        payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
        return payload['username']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'

