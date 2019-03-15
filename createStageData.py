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

if 'stage_info' in collections:
    print('stage_info collection already existing dropping collection')
    db['stage_info'].drop()

collection = db["next_stage"]
stage_transitions = db['stage_transitions']
stage_info = db['stage_info']

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
    ],
    'Send to': 'Do Collections',
    'Do Collections': '10(1)(a) Dicision',
    'Sec. 15 notice': 'Take decision',
    'Take decision': 'Send to valuation',
    'Send to valuation':'Issue valuation Y-N',
    'Issue valuation Y-N': 'Issue Sec.17',
    'Issue Sec.17': "Take action under sec. 33"
}
for each in temp:
    d = {
        'current': each,
        'next': temp[each]
    }
    _buffer.append(d)
collection.insert_many(buffer)
stage_transitions.insert_many(_buffer)

true_false_stages = [
    "Prepare Gazette Under Sec. 5",
    "Prepare Gazette Under Sec. 7",
    'Conducting Sec. a Inquiries',
    'Court Decision',
    'Send to valuation',
    '10(1)(a) Decision',
    'Do Collections',
    'Take action under sec.33'
]

pdf_stages = [
    'Declaration of Sec. 5',
    'Print Gazette Under Sec. 5',
    'Survey request Under Sec. 6',
    'Issued Preliminary Plan',
    'Print Gazette Under Sec. 7',
    '10(1)(b) Decision',
    'Issue valuation',
    'Issue Sec.17 notice',
    'Take larc Decision',
    'Take super larc decision',
    'Registered under sec. 44'
]

permissions = {
    "Declaration of Sec. 5" : 'Ministry of Land',
    "Prepare Gazette Under Sec. 5": 'D/S',
    "Print Gazette Under Sec. 5": 'DOP',
    "Survey request Under Sec. 6": 'D/S',
    "Issued Preliminary Plan": 'SS',
    "Prepare Gazette Under Sec. 7": 'DS', 
    "Print Gazette Under Sec. 7": 'DOP',
    "Conducting Sec. a Inquiries": 'DS',
    "10(1)(b) Decision": 'DS',
    "Court Decision": 'DS',
    "Send to valuation": 'DS',
    "Issue valuation": 'VD',
    "Issue Sec.17 notice": 'DS',
    "Take larc Decision": 'DS',
    'Take action under sec. 33': 'DS',
    'Registered under sec. 44': 'DS',
    'Conducting Sec. a Inquiries': 'DS',
    '10(1)(a) Decision': 'DS',
    'Sec. 15 notice': 'DS',
    'Do Collections': 'DS',
    'Take super larc decision': 'Ministry of Highways',
    'Paid': 'DS'
}

typing = [
    'Paid'
]

stage_info_buffer = []
for each in permissions:
    option = 'unknown'
    if each in pdf_stages:
        option = 'pdf'
    elif each in true_false_stages:
        option = 'boolean'
    elif each in typing:
        option = 'typing'
    d = {
        'stage': each,
        'permission': permissions[each],
        'option': option
    }
    stage_info_buffer.append(d)

try:
    stage_info.insert_many(stage_info_buffer)
except pymongo.errors.BulkWriteError as ex:
    print(ex.details)
