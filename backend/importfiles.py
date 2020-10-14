import pymongo

# We might consider moving this to be per connection, but for now this is fine.
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["OrgChart"]

def json(content):
    try:
        db["Employees"].insert_many(content)
    except:
        return "failure"
    return "imported"