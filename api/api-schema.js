// Uppercase functions names are HTTP methods, haven't decided how to represent them in responses.
// This file uses an ad hoc mess of syntax so let me know if its nonsense


// ------------
// Object Types
// ------------
Employee = {
    "firstName": String,
    "lastName": String,
    "companyName": String,
    "positionTitle": String,
    "isManager": Boolean,
    "email": String,
    "employeeId": Number,
    "companyId": Number,
    "startDate": Date,
    "manager": GET("company/:id:/employee/$employeeId/manager"),
    // Null for non managers. Array for managers. 
    "employees": null || Array.of(Employee) || GET("company/:id:/employee/$employeeId"),
    "actions": { // null if the requesting user does not have the permissions to take that action.
        "update": PUT("company/:id:/employee/$employeeId") || null,
        "delete": DELETE("company/:id:/employee/$employeeId") || null, 
    }
};

// ---------
// Endpoints
// ---------

// Get a given employee. Can also be used to get a tree rooted at the employee.
// HTTP Response: 200 (OK), 404 (Not Found), 403 (If Wrong Company), 400 (Bad Request)
GET("company/:id:/employee/:id:")
parameters = {
    "treeDepth": Number(0), // How deep to populate employees arrays
}
response = {
    "employee": Employee, // Populated with employees to tree depth, making the json response a tree of employees. See Employee above.
}

// Get the manager (or managers manager and so on) for a given employee. Can also be used to get a tree rooted at that manager.
// HTTP Response: 200 (OK), 404 (Not Found), 403 (If Wrong Company), 400 (Bad Request)
GET("company/:id:/employee/:id:/manager")
parameters = {
    "levels": Number(1), // How many managers to move the root up. For example if two, the tree is rooted in the manager of the given employee's manager.
    "treeDepth": Number(0), // How deep to populate employees arrays
}
response = {
    "manager": Employee, // Populated with employees to tree depth, making the json response a tree of employees. See Employee above.
}

// Same as GET("/employee/:id:") except uses a search term.
// HTTP Response: 200 (OK), 404 (Not Found), 403 (If Wrong Company), 400 (Bad Request)
GET("company/:id:/employee/search")
parameters = {
    "treeDepth": Number(0), // How deep to populate employees arrays
    "search": String(""), // The search term to use to find the employee
}
response = {
    "employee": Employee, // Populated with employees to tree depth, making the json response a tree of employees. See Employee above.
}

// Get the manager (or managers manager and so on) for a given employee. Can also be used to get a tree rooted at that manager.
// HTTP Response: 200 (OK), 404 (Not Found), 403 (If Wrong Company), 400 (Bad Request)
GET("company/:id:/employee/search/manager")
parameters = {
    "levels": Number(1), // How many managers to move the root up. For example if two, the tree is rooted in the manager of the given employee's manager.
    "treeDepth": Number(0), // How deep to populate employees arrays
    "search": String(""), // The search term to use to find the employee
}
response = {
    "manager": Employee, // Populated with employees to tree depth, making the json response a tree of employees. See Employee above.
}

// Update an employee's entry. entries that are not included remain unchanged.
// Since some changes (at least managerId) require outside approval, changes are 
// requested, and may not all happen right away.
// HTTP Response: 200 (OK), 400 (Bad Request)
PUT("company/:id:/employees/:id:")
parameters = {
    "firstName": String(null),
    "lastName": String(null),
    "companyId": Number(null),
    "positionTitle": String(null),
    "isManager": Boolean(null),
    "email": String(null),
    "startDate": Date(null),
    "managerId": Number(null)
}
response = {}

// Delete a given employee
// HTTP Response: 200 (OK), 400 (Bad Request)
DELETE("company/:id:/employees/:id:")
parameters = {}
response = {} // Not sure what we need here so leaving blank

// -------------------------
// Examples (very contrived, names from data)
// -------------------------

// Get a single employee
GET("company/:id:/employees/1").response = { // Send by a user with permissions
    "firstName" : "Abdul",
    "lastName" : "Humphrey",
    "positionTitle" : "Engineering Manager",
    "companyName" : "Tiger Microsystems",
    "isManager" : true,
    "email" : "Abdul_Humphrey@tigermicrosystems.com",
    "startDate" : "2010-09-22",
    "manager": GET("/employee/3/manager"),
    "employees": GET("/employee/3?treeDepth=1"), // Since the default depth is 0, we get a link instead of the actual employees.
    "actions": {
        "update": PUT("/employee/3"),
        "delete": DELETE("/employee/3"), 
    }
}

// Get an employee and all employees they directly manage (in this case two people.)
// HTTP Response: 200 (OK), 400 (Bad Request), 404 (Not Found)
GET("company/:id:/employees/1?treeDepth=1").response = { // Send by a user with permissions
    "firstName" : "Abdul",
    "lastName" : "Humphrey",
    "positionTitle" : "Engineering Manager",
    "companyName" : "Tiger Microsystems",
    "isManager" : true,
    "employeeId": 3,
    "email" : "Abdul_Humphrey@tigermicrosystems.com",
    "startDate" : "2010-09-22",
    "manager": GET("/employee/3/manager"),
    "employees": [
        {
            "firstName" : "Mickey",
            "lastName" : "Whitney",
            "positionTitle" : "Engineer",
            "companyName" : "Tiger Microsystems",
            "isManager" : false,
            "employeeId" : 4,
            "email" : "Mickey_Whitney@tigermicrosystems.com",
            "startDate" : "2015-03-07",
            "manager": GET("/employee/4/manager"),
            "employees": null,
            "actions": {
                "update": PUT("/employee/4"),
                "delete": DELETE("/employee/4"), 
            },
        },
        {
            "firstName" : "Demetrius",
            "lastName" : "Ho",
            "positionTitle" : "Engineer",
            "companyName" : "Tiger Microsystems",
            "isManager" : false,
            "employeeId" : 10,
            "email" : "Demetrius_Ho@tigermicrosystems.com",
            "startDate" : "2016-05-07",
            "manager": GET("/employee/10/manager"),
            "employees": null,
            "actions": {
                "update": PUT("/employee/10"),
                "delete": DELETE("/employee/10"), 
            },
        }
    ],
    "actions": {
        "update": PUT("/employee/3"),
        "delete": DELETE("/employee/3"), 
    }
}

// We could also get the same response by looking at Demetrius (employee 10s) manager (default level 1), with treeDepth 1
GET("company/:id:/employees/1/manager?treeDepth=1").response = /.../
/* OR */
GET("company/:id:/employees/1/manager?level=1&treeDepth=1").response = /.../