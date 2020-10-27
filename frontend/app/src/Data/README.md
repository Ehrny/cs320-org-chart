# Json data format

The json in each file represents the employees for a single company.  It can be
treated as a json array, where each entry is a single employee.
```
[{
   "firstName" : "Bernadine",
   "lastName" : "Richard",
   "companyId" : 3,
   "password" : "richardbe",
   "positionTitle" : "Engineering Manager",
   "companyName" : "Nightwell Enterprise",
   "isManager" : true,
   "employeeId" : 2,
   "managerId" : 1,
   "email" : "Bernadine_Richard@nightwellenterprise.com",
   "startDate" : "2016-07-22"
 }]
```

Field descriptions:
- `firstName`: Employee first name
- `lastName`: Employee last name
- `companyId`: Unique id for the company the employee works for
- `employeeId`: Unique id for the employee within the company
- `managerId`: The `employeeId` of the manager for the employee (CEO is the only employee who does not have a `managerId`)
- `password`: The password the employee can use to log in (lastName + first 2 letters of first name)
- `positionTitle`: Official job title for the employee
- `companyName`: Name of the company the employee belongs to
- `isManager`: A boolean field for if this employee is a manager or not
- `email`: Email address for the employee.  Email + password combination should be used for login
- `startDate`: When the employee started working for the company

Org structure for a company can be determined by recursively following `managerId` references for each
employee until you reach the CEO (who has no `managerId`).
