import json
import pymongo
import dns
import config; config.load_config(".env")

# This could be changed to be by request if needed.
client = pymongo.MongoClient(config.MONGO_URL)
db = client[config.MONGO_DB]

with open('Cyclone_Aviation-employees.json') as f:
  data1 = json.load(f)

with open('Nightwell_Enterprise-employees.json') as f:
  data2 = json.load(f)

with open('Tiger_Microsystems-employees.json') as f:
  data3 = json.load(f)

mycol = db["Employees"]   

mycol.delete_many({}) # Clear the database
mycol.drop_indexes() # Reset the indexes on the table.

mycol.insert_many(data1)
mycol.insert_many(data2)
mycol.insert_many(data3)

# To do full text search in mongodb, we need a compound text index on all the fields we want to index.
# There can only be on of these fields.
mycol.create_index([
  ("firstName", "text"),
  ("lastName", "text"),
  ("positionTitle", "text"),
  ("companyName", "text"),
  ("email", "text"),
])