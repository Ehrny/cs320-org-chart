from flask import Flask, request
import employees
import importfiles
import search
import pymongo
import json
import config; config.load_config(".env")

app = Flask(__name__)

# This could be changed to be by request if needed.
client = pymongo.MongoClient(config.MONGO_URL)
db = client[config.MONGO_DB]

@app.route('/')
def index():
    return 'todo: everything'

@app.route('/company/<company_id>/employee/<employee_id>')
def route_employee_by_id(company_id: str, employee_id: str):
    tree_depth: str = request.args.get("treeDepth", "0")
    return employees.employee_by_id(db, int(company_id), int(employee_id), int(tree_depth))

@app.route('/company/<company_id>/employee/<employee_id>/manager')
def route_employee_manager_by_id(company_id: str, employee_id: str):
    levels: str = request.args.get("levels", "1")
    tree_depth: str = request.args.get("treeDepth", "0")
    return employees.employee_manager_by_id(db, int(company_id), int(employee_id), int(levels), int(tree_depth))

@app.route('/import', methods=['POST'])
def route_import():
    content = request.json
    if content is None: return "invalid request"
    return importfiles.json(content)

@app.route('/company/<company_id>/search')
def route_search_all(company_id: str):
    query: str = request.args.get("q", "")
    return search.search_all(db, int(company_id), query)

@app.route('/company/<company_id>/search/<field>')
def route_search_field(company_id: str, field: str):
    query: str = request.args.get("q", "")
    return search.search_field(db, int(company_id), query, field)


# @app.route('/company/<company_id>/login', methods=['POST'])
# def route_login(company_id: str):
#     username: str = request.args.get("username", "")
#     password: str = request.args.get("password", "")
#     return employees.login(int(company_id), username, password)



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
@app.route('/import/company/<company_id>/drop_from_db/', methods = ['POST'])
def route_drop_employee_from_db(company_id : str):
    if (request.get_json() != None):
        employee_dict = request.get_json()
        if (int(company_id) == employee_dict.get("companyId")):
            return employees.drop_employee_from_db(db, employee_dict)
    return json.dumps({ "error": "unknown" })

#create an app.route for EDIT
@app.route('/import/company/<company_id>/employee/<employee_id>', methods = ['POST'])
def route_edit_employee(company_id : str, current_employee_id: str):
    if (request.get_json() != None):
        updated_employee = request.get_json()
        if (company_id == updated_employee.get(company_id)):
            return employees.edit_employee(db, current_employee_id, updated_employee)
    return json.dumps({ "error": "unknown" })


if __name__ == "__main__":
    app.run(debug=True)