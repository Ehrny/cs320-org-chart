import pymongo
import employees
import typing

# We might consider moving this to be per connection, but for now this is fine.
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["OrgChart"]

def search_all(company_id: int, search_term: str):
    search_docs = db["Employees"].find({ 
        "companyId": company_id, 
        "$text": {
            "$search": search_term,
        }
    })

    # Convert documents to output format
    search_objects = [employees.employee_tree(doc, 0) for doc in search_docs]

    return { "results": search_objects }

def search_field(company_id: int, search_term: str, field: str):
    secure_fields = { # Change this table to change the external name of database fields
        "firstName": "firstName",
        "lastName": "lastName",
        "positionTitle": "positionTitle",
        "companyName": "companyName",
        "email": "email",
    }

    secure_field = secure_fields.get(field)
    if secure_field is None: return "Invalid field: {}\nTODO: Better error".format(field)
    
    query: typing.Dict[str, typing.Any] = { "companyId": company_id }
    query[secure_field] = {
        "$regex": search_term
    }
    
    search_docs = db["Employees"].find(query)

    # Convert documents to output format
    search_objects = [employees.employee_tree(doc, 0) for doc in search_docs]

    return { "results": search_objects }