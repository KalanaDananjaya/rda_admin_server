# Show All users registered in the system

Get list of all users registered in the system

**URL** : `/getAllUsers`

**Method** : `GET`

**Auth required** : Yes

**Permissions required** : None

**Parameters** : json web token

## Success Response

**Code** : `200 OK`

**Content examples**


```json
[
    {
        "category": [
            "dop"
        ],
        "approvalStatus": [
            "pending"
        ],
        "user_type": [
            "user"
        ],
        "_id": "5c68f01c99bbc7346c7a6463",
        "email": "kalana.16@cse.mrt.ac.lk",
        "uid": "555",
        "telephone": 774052085,
        "fname": "kalana",
        "lname": "wijethunga",
        "__v": 0
    },
    {
        ...
    }
]
```
