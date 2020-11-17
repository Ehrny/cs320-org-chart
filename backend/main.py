from flask import Flask, request
import employees
import importfiles
import search
import pymongo
import config; config.load_config(".env")

app = Flask(__name__)

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


# @app.route('/company/<company_id>/login', methods=['POST'])
# def route_login(company_id: str):
#     username: str = request.args.get("username", "")
#     password: str = request.args.get("password", "")
#     return employees.login(int(company_id), username, password)


if __name__ == "__main__":
    app.run(debug=True)