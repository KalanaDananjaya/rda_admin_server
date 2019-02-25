# Change Password

Reset the user password

**URL** : `/auth/resetPassword`

**Method** : `POST`

**Auth required** : No

**Permissions required** : None

**Parameters** : token,newPassword,verifyPassword

## Success Response

**Code** : `200 OK`

**Content examples**


```json
{
    "success": true,
    "msg": "Password reset"
}
```
