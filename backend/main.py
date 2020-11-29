from flask import Flask, request, jsonify
import employees
import importfiles
import search
import pymongo
import json
import config; config.load_config(".env")
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# This could be changed to be by request if needed.
client = pymongo.MongoClient(config.MONGO_URL)
db = client[config.MONGO_DB]

@app.route('/')
def index():
    return 'todo: everything'


# Url: /company/<company_id>/employee/<employee_id>
# Method: GET
# Body: None
# Headers: Default
# URL parameters: treeDepth: int, the depth to which the object is populated
# Returns: Employee object for the given company and employee id, with a field employees which contains the next level in the tree
#          The object is populated to treeDepth employees deep
# Example: /company/1/employee/1?treeDepth=3
#          returns the CEO of company 1 and the three levels below them. (4 levels of employees overall.)
@app.route('/company/<company_id>/employee/<employee_id>')
def route_employee_by_id(company_id: str, employee_id: str):
    tree_depth: str = request.args.get("treeDepth", "0")
    return employees.employee_by_id(db, int(company_id), int(employee_id), int(tree_depth))

# Url: /company/<company_id>/employee/<employee_id>/manager
# Method: GET
# Body: None
# Headers: Default
# URL parameters: treeDepth: int, the depth to which the object is populated
#                 levels: int, the number of levels to go up the tree (1 level is the manager, 2 is the managers manager...)
# Returns: Employee object that is the manager of the employee with the given company and employee id, 
#          with a field employees which contains the next level in the tree.
#          The object is populated to treeDepth employees deep.
# Example: /company/1/employee/2?treeDepth=3/manager
#          returns the CEO of company 1 (who is the manager of employee 2) and the three levels below them. (4 levels of employees overall.)
@app.route('/company/<company_id>/employee/<employee_id>/manager')
def route_employee_manager_by_id(company_id: str, employee_id: str):
    levels: str = request.args.get("levels", "1")
    tree_depth: str = request.args.get("treeDepth", "0")
    return employees.employee_manager_by_id(db, int(company_id), int(employee_id), int(levels), int(tree_depth))

# Url: /company/<company_id>/employee/<employee_id>/manager
# Method: POST
# Body: Array of non-nested employee objects (format in testdata.json)
# Headers: content-type: "application/json"
# URL parameters: None
# Returns: "imported" on success, "failure" on failure
# Usage example (not in real syntax): /import, body: [{
#   "firstName" : "Miquel",
#   "lastName" : "Pineda",
#   "companyId" : 1,
#   "password" : "pinedami",
#   "positionTitle" : "CEO",
#   "companyName" : "Cyclone Aviation",
#   "isManager" : true,
#   "employeeId" : 1,
#   "email" : "Miquel_Pineda@cycloneaviation.com",
#   "startDate" : "2016-05-04"
# }], headers: { "content-type": "application/json"}
@app.route('/import', methods=['POST'])
def route_import():
    content = request.json
    if content is None: return "invalid request"
    return importfiles.json(content)

# Url: /company/<company_id>/search
# Method: GET
# Body: None
# Headers: default
# URL Parameters: q: string, the query with which to perform whole text search.
# Returns: an array of results (employee objects)
# Usage example : /company/1/search?q=miquel
@app.route('/company/<company_id>/search')
def route_search_all(company_id: str):
    query: str = request.args.get("q", "")
    return search.search_all(db, int(company_id), query)


# Url: /company/<company_id>/search/<field>
# Valid entries for <field>: firstName, lastName, positionTitle, email
# Method: GET
# Body: None
# Headers: default
# URL Parameters: q: string, the query with which to perform text search on the given field.
# Returns: an array of results (employee objects)
# Usage example : /company/1/search/firstName?q=miquel
@app.route('/company/<company_id>/search/<field>')
def route_search_field(company_id: str, field: str):
    query: str = request.args.get("q", "")
    return search.search_field(db, int(company_id), query, field)


@app.route('/company/login', methods=['POST'])
def route_login():
    # req = Flask.request.get_json(force=True)
    # username = req.get('username', None)
    # password = req.get('password', None)
    # username: str = request.form.get("username", None)
    # password: str = request.form.get("password", None)

    username: str = request.get_json()["username"]
    password: str = request.get_json()["password"]


    data = request.get_json()
    print("Username: ", username, "Password: ", password)

    retLoad = employees.login(db,username, password)
     # retVal.headers.add('Access-Control-Allow-Origin', '*')
    
    # print("this is the username: ",request.args)
    # retLoad = employees.login(username, password)
    # retVal = jsonify(retLoad)
    return data



#create a new request for transfer employee
@app.route('/import/company/<company_id>/create_request', methods = ['POST'])
def route_create_new_request(company_id: str):
    if (request.get_json() != None):
        request_dict = request.get_json()
        if (company_id == request_dict.get(company_id)):
            return request_dict.create_request(db, request_dict)
    return -1


#create an app.route for ADD
""" EXAMPLE CALL
fetch("/import/company/1/add_to_db", {
  method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "firstName" : "Miquel",
        "lastName" : "Pineda",
        "companyId" : 1,
        "password" : "pinedami",
        "positionTitle" : "CEO",
        "companyName" : "Cyclone Aviation",
        "isManager" : true,
        "employeeId" : 1,
        "email" : "Miquel_Pineda@cycloneaviation.com",
        "startDate" : "2016-05-04"
  })
}).then(res=>console.log(res));
"""
@app.route('/import/company/<company_id>/add_to_db', methods=['POST'])
def route_add_employee_to_db(company_id: str):
    #checks to make sure employee is in correct company
    if (request.get_json() != None):
        employee_dict = request.get_json()
        if (int(company_id) == employee_dict.get("companyId")):
            return employees.add_employee_to_db(db, employee_dict)
    return json.dumps({ "error": "no json body probably" })

#create an app.route for DROP
@app.route('/import/company/<company_id>/drop_from_db', methods = ['POST'])
def route_drop_employee_from_db(company_id : str):
    if (request.get_json() != None):
        employee_dict = request.get_json()
        if (int(company_id) == employee_dict.get("companyId")):
            return employees.drop_employee_from_db(db, employee_dict)
    return json.dumps({ "error": "unknown" })

#create an app.route for EDIT
@app.route('/import/company/<company_id>/employee/<employee_id>', methods = ['POST'])
def route_edit_employee(company_id : str, employee_id: str):
    if (request.get_json() != None):
        updated_employee = request.get_json()
        if (int(company_id) == updated_employee.get("companyId")):
            return employees.edit_employee(db, int(company_id), int(employee_id), updated_employee)
    return json.dumps({ "error": "unknown" })


if __name__ == "__main__":
    app.run(debug=True)