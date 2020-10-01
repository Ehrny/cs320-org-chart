import json
import pymongo

with open('Cyclone_Aviation-employees.json') as f:
  data1 = json.load(f)

with open('Nightwell_Enterprise-employees.json') as f:
  data2 = json.load(f)

with open('Tiger_Microsystems-employees.json') as f:
  data3 = json.load(f)



client = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = client["OrgChart"]
mycol = mydb["Employees"]   


# x = mycol.insert_one(data)
mycol.insert_many(data1)
mycol.insert_many(data2)
mycol.insert_many(data3)

# for y in mycol.find():
#   print(y) 

# pip3 install pymongo