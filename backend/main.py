from flask import Flask, request
import employees

app = Flask(__name__)

@app.route('/')
def index():
    return 'todo: everything'

@app.route('company/<company_id>/employee/<employee_id>')
def route_employee_by_id(company_id: int, employee_id: int):
    tree_depth = request.args.get("treeDepth", 0)
    return employees.employee_by_id(company_id, employee_id, tree_depth)

@app.route('company/<company_id>/employee/<employee_id>/manager')
def route_employee_manager_by_id(company_id: int, employee_id: int):
    levels = request.args.get("levels", 1)
    tree_depth = request.args.get("treeDepth", 0)
    return employees.employee_manager_by_id(company_id, employee_id, levels, tree_depth)

@app.route('company/<company_id>/current_employee/<auth_token>')
def route_employee_by_auth_token(company_id: int, auth_token: str):
    tree_depth = request.args.get("treeDepth", 0)
    return employees.employee_by_auth_token(company_id, auth_token, tree_depth)

@app.route('company/<company_id>/current_employee/<auth_token>/manager')
def route_employee_manager_by_auth_token(company_id: int, auth_token: str):
    tree_depth = request.args.get("treeDepth", 0)
    levels = request.args.get("levels", 1)
    return employees.employee_manager_by_auth_token(company_id, auth_token, levels, tree_depth)

@app.route('company/<company_id>/login', methods=['POST'])
def route_login(company_id: int):
    username = request.args.get("username", "")
    password = request.args.get("password", "")
    return employees.login(company_id, username, password)