from flask import Flask, request, jsonify
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


@app.route('/company/login', methods=['POST'])
def route_login():
    username: str = request.args.get("username", "")
    password: str = request.args.get("password", "")
    retLoad = employees.login(username, password)
    retVal = jsonify(retLoad)
    return retVal


if __name__ == "__main__":
    app.run(debug=True)