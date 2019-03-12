# Search Main Project

Use to search for a  main project. Will perform a case insensitive substring matching

**URL** : `/projects/searchMainProject`

**Method** : `GET`

**Auth required** : Yes

**Permissions required** : None

**Parameters** : mainProjectName

## Success Response

**Code** : `200 OK`

**Content examples**


```json
{
    "success": true,
    "msg": [
        {
            "_id": "5c78ad418d62f5320679ff00",
            "projectName": "test",
            "projectId": "e461fa90-3bd5-11e9-bc3b-c9522e81f52a",
            "__v": 0
        },
        {
            "_id": "5c7ba357a427cc1bffdedd5e",
            "projectName": "test 2",
            "projectId": "bf1eace0-3d99-11e9-812f-a35160e72526",
            "__v": 0
        },
        {
            "_id": "5c7ba369a427cc1bffdedd5f",
            "projectName": "test2",
            "projectId": "c970bc10-3d99-11e9-812f-a35160e72526",
            "__v": 0
        }
    ]
}
```
