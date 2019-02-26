# Get file info

Used to get file info

**URL** : `/files/fileInfo`

**Method** : `GET`

**Auth required** : Yes

**Permissions required** : None

**Parameters** : fileId

## Success Response

**Code** : `200 OK`

**Content examples**


```json
{
    "success": true,
    "msg": {
        "_id": "5c73adab6480823b8129ef9f",
        "fileId": "33258140-38db-11e9-afca-737741042d84",
        "fileName": "GPA.xlsx",
        "projectId": "4f22c630-3522-11e9-9aca-afe000256220",
        "createdOn": "2019-02-25T08:56:11.860Z",
        "createdBy": "uid",
        "__v": 0
    }
}
```
