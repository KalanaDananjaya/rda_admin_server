# Verify user

Send a user verification request

**URL** : `/login/verifyUser`

**Method** : `POST`

**Auth required** : Yes

**Permissions required** : None

**Parameters** : json_web_token

## Success Response

**Code** : `200 OK`

**Content examples**


```json
{
    "success": true,
    "msg": {
        "uid": "dabe0790-35f4-11e9-8767-3969b035840b",
        "iat": 1550766847,
        "exp": 1550784847
    }
}
```


