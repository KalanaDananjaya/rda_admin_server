import pymongo

DATABASE_NAME = "test"

client = pymongo.MongoClient("mongodb+srv://kalana:rda_project@cluster0-eghw9.mongodb.net/test?retryWrites=true")
db = client[DATABASE_NAME]

collections = db.list_collection_names()
if "next_stage" in collections:
    print("next_stage collection already exisiting dropping collection")
    db["next_stage"].drop()

collection = db["next_stage"]
stages_1 = [
    "Declaration of Sec. 5",
    "Prepare Gazette Under Sec. 5",
    "Print Gazette Under Sec. 5",
    "Survey request Under Sec. 6",
    "Issued Preliminary Plan",
    "Prepare Gazette Under Sec. 7",
    "Print Gazette Under Sec. 7",
    "Conducting Sec. a Inquiries",
    "10(1)(b) Decision",
    "Court Decision",
    "Send to valuation",
    "Issue valuation",
    "Issue Sec.17 notice",
    "Take larc Decision"
]
buffer = []
for i in range(1,len(stages_1)):
    current = stages_1[i-1]
    next = stages_1[i]
    d = {
        "current": current,
        "next": next
    }
    buffer.append(d)
stages_2 = [
    "Paid",
    "Take action under sec. 33"
]
for each in stages_2:
    next = "Registered under sec. 44"
    d = {
        "current":each,
        "next": next
    }
    buffer.append(d)
collection.insert_many(buffer)