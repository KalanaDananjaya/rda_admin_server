import pymongo

DATABASE_NAME = "test"

client = pymongo.MongoClient("mongodb+srv://kalana:rda_project@cluster0-eghw9.mongodb.net/test?retryWrites=true")
db = client[DATABASE_NAME]

collections = db.list_collection_names()
if "next_stage" in collections:
    print("next_stage collection already exisiting dropping collection")
    db["next_stage"].drop()

if 'stage_transitions' in collections:
    print('stage_transitions collection already exisiting dropping collection')
    db['stage_transitions'].drop()

collection = db["next_stage"]
stage_transitions = db['stage_transitions']
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
_buffer = []
for i in range(1,len(stages_1)):
    current = stages_1[i-1]
    next = stages_1[i]
    d = {
        "current": current,
        "next": next
    }
    _d = {
        "current": current,
        "next": [next]
    }
    buffer.append(d)
    _buffer.append(_d)
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
    _d = {
        "current":each,
        "next": next
    }
    buffer.append(d)
    _buffer.append(_d)

temp = {
    'Conducting Sec. a Inquiries': [
        '10(1)(a) Decision',
        '10(1)(b) Decision',
        'Sec. 15 notice'
    ],
    '10(1)(a) Decision': [
        'Issue valuation',
        'Send to'
    ],
    'Take larc Decision': [
        'Paid',
        'Take super larc decision'
    ],
    'Take super larc decision': [
        'Paid',
        'Take action under sec.33'
    ]
}
for each in temp:
    d = {
        'current': each,
        'next': temp[each]
    }
    _buffer.append(d)
collection.insert_many(buffer)
stage_transitions.insert_many(_buffer)