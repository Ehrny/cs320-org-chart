import pymongo
import employees
import typing

# We might consider moving this to be per connection, but for now this is fine.
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["OrgChart"]

def search(company_id: int, search_term: str, field: str = None):
    secure_fields = { # Change this table to change the external name of database fields
        "firstName": "firstName",
        "lastName": "lastName",
        "positionTitle": "positionTitle",
        "companyName": "companyName",
        "email": "email",
    }

    query: typing.Dict[str, typing.Any] = {}

    if field is None: # Search the text index
        query = { 
            "companyId": company_id, 
            "$text": {
                "$search": search_term,
            }
        }
    else: # Search a specific field
        secure_field = secure_fields.get(field)
        if secure_field is None: return "Invalid field. TODO: Better error"
        query = { "companyId": company_id }
        query[secure_field] = "/{}/".format(search_term)
    
    search_docs = db["Employees"].find(query)

    # Convert documents to output format
    search_objects = [employees.employee_tree(doc, 0) for doc in search_docs]

    return { "results": search_objects }