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
        "cs2000",
        "cs2001",
        "cs2002"
    ]
}
```
