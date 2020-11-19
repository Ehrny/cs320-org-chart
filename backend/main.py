from flask import Flask, request, jsonify
import employees
import importfiles
import search
import pymongo
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


if __name__ == "__main__":
    app.run(debug=True)