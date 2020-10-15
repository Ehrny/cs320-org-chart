from flask import Flask, request
import employees
import search

app = Flask(__name__)

@app.route('/')
def index():
    return 'todo: everything'

@app.route('/company/<company_id>/employee/<employee_id>')
def route_employee_by_id(company_id: str, employee_id: str):
    tree_depth: str = request.args.get("treeDepth", "0")
    return employees.employee_by_id(int(company_id), int(employee_id), int(tree_depth))

@app.route('/company/<company_id>/employee/<employee_id>/manager')
def route_employee_manager_by_id(company_id: str, employee_id: str):
    levels: str = request.args.get("levels", "1")
    tree_depth: str = request.args.get("treeDepth", "0")
    return employees.employee_manager_by_id(int(company_id), int(employee_id), int(levels), int(tree_depth))

@app.route('/company/<company_id>/user/<auth_token>')
def route_employee_by_auth_token(company_id: str, auth_token: str):
    tree_depth: str = request.args.get("treeDepth", "0")
    return employees.employee_by_auth_token(int(company_id), auth_token, int(tree_depth))

@app.route('/company/<company_id>/user/<auth_token>/manager')
def route_employee_manager_by_auth_token(company_id: str, auth_token: str):
    tree_depth: str = request.args.get("treeDepth", "0")
    levels: str = request.args.get("levels", "1")
    return employees.employee_manager_by_auth_token(int(company_id), auth_token, int(levels), int(tree_depth))

@app.route('/company/<company_id>/search')
def route_search_all(company_id: str):
    query: str = request.args.get("q", "")
    return search.search_all(int(company_id), query)

@app.route('/company/<company_id>/search/<field>')
def route_search_field(company_id: str, field: str):
    query: str = request.args.get("q", "")
    return search.search_field(int(company_id), query, field)

# @app.route('/company/<company_id>/login', methods=['POST'])
# def route_login(company_id: str):
#     username: str = request.args.get("username", "")
#     password: str = request.args.get("password", "")
#     return employees.login(int(company_id), username, password)


if __name__ == "__main__":
    app.run(debug=True)