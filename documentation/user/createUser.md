# Create a user creation request

Send a user creation request to an admin

**URL** : `/user/createUser`

**Method** : `POST`

**Auth required** : Yes

**Permissions required** : None

**Parameters** : email,telephone,password,name,category,user_type["admin","user"]

## Success Response

**Code** : `200 OK`

**Content examples**


```json
{
    "user request created successfully"
}
```
