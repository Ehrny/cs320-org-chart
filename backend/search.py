import pymongo
import employees

# We might consider moving this to be per connection, but for now this is fine.
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["OrgChart"]

def search(company_id: int, search_term: str):
    # Search the database, if this crashes make sure you run mongodbStuff/importJSON.py
    search_docs = db["Employees"].find({ 
        "companyId": company_id, 
        "$text": {
            "$search": search_term,
        }
    })

    # Convert documents to output format
    search_objects = [employees.employee_tree(doc, 0) for doc in search_docs]

    return { "results": search_objects }