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
{
    "success": true,
    "msg": [
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
            "_id": "5c6ed0387c2c06081056a439",
            "email": "kalana.16@cse.mrt.ac.lk",
            "uid": "dabe0790-35f4-11e9-8767-3969b035840b",
            "telephone": 774052085,
            "name": "kalana1",
            "__v": 0
        }
    ]
}
```
