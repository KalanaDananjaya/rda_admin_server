# Create a user creation request

Send a user creation request to an admin

**URL** : `/createUser`

**Method** : `POST`

**Auth required** : Yes

**Permissions required** : None

**Parameters** : email,telephone,fname,lname,category,user_type["admin","user"]

## Success Response

**Code** : `200 OK`

**Content examples**


```json
{
    "user request created successfully"
}
```
