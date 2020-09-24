import links

def employee_by_id(company_id: int , employee_id: int, tree_depth: int):
    # MOCK ENDPOINT, IGNORES EVERYTHING
    if tree_depth == 0:
        return {
            "firstName" : "Abdul",
            "lastName" : "Humphrey",
            "positionTitle" : "Engineering Manager",
            "companyName" : "Tiger Microsystems",
            "isManager" : True,
            "email" : "Abdul_Humphrey@tigermicrosystems.com",
            "startDate" : "2010-09-22",
            "manager": links.get("/employee/3/manager"),
            "employees": links.get("/employee/3?treeDepth=1"),
            "actions": {
                "update": links.put("/employee/3"),
                "delete": links.delete("/employee/3"), 
            }
        }
    elif tree_depth == 1:
          {
            "firstName" : "Abdul",
            "lastName" : "Humphrey",
            "positionTitle" : "Engineering Manager",
            "companyName" : "Tiger Microsystems",
            "isManager" : True,
            "employeeId": 3,
            "email" : "Abdul_Humphrey@tigermicrosystems.com",
            "startDate" : "2010-09-22",
            "manager": links.get("/employee/3/manager"),
            "employees": [
                {
                    "firstName" : "Mickey",
                    "lastName" : "Whitney",
                    "positionTitle" : "Engineer",
                    "companyName" : "Tiger Microsystems",
                    "isManager" : False,
                    "employeeId" : 4,
                    "email" : "Mickey_Whitney@tigermicrosystems.com",
                    "startDate" : "2015-03-07",
                    "manager": links.get("/employee/4/manager"),
                    "employees": None,
                    "actions": {
                        "update": links.put("/employee/4"),
                        "delete": links.delete("/employee/4"), 
                    },
                },
                {
                    "firstName" : "Demetrius",
                    "lastName" : "Ho",
                    "positionTitle" : "Engineer",
                    "companyName" : "Tiger Microsystems",
                    "isManager" : False,
                    "employeeId" : 10,
                    "email" : "Demetrius_Ho@tigermicrosystems.com",
                    "startDate" : "2016-05-07",
                    "manager": links.get("/employee/10/manager"),
                    "employees": None,
                    "actions": {
                        "update": links.put("/employee/10"),
                        "delete": links.delete("/employee/10"), 
                    },
                }
            ],
            "actions": {
                "update": links.put("/employee/3"),
                "delete": links.delete("/employee/3"), 
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