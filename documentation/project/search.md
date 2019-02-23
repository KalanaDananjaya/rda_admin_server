# Create Project

Use to search for a project. For each metadata provided will perform a case-insensitive substring matching(!important: don't strip any characters). If no parameter is given will return all the projects

**URL** : `/projects/search`

**Method** : `GET`

**Auth required** : Yes

**Permissions required** : None

**Parameters** : [projectName],[division],[landUser], [lotId], [state]

## Success Response

**Code** : `200 OK`

**Content examples**


```json
{
    "success": true,
    "msg": [
        {
            "_id": "5c6d6efca5315c15d57b6a06",
            "projectName": "test",
            "division": "divison",
            "landUser": "landuser",
            "lotId": "lotId",
            "projectId": "4f22c630-3522-11e9-9aca-afe000256220",
            "state": "Declaration of Sec. 5",
            "__v": 0
        },
        {
            "_id": "5c6d6f4fa5315c15d57b6a07",
            "projectName": "test2",
            "division": "divison",
            "landUser": "landuser",
            "lotId": "lotId",
            "projectId": "80473020-3522-11e9-9aca-afe000256220",
            "state": "Prepare Gazette Under Sec. 5",
            "__v": 0
        },
        {
            "_id": "5c6d709441e6971737ab1bfd",
            "projectName": "test3",
            "division": "divison",
            "landUser": "landuser",
            "lotId": "lotId",
            "projectId": "425c8d40-3523-11e9-8540-a9030b792f1f",
            "state": "Declaration of Sec. 5",
            "__v": 0
        },
        {
            "_id": "5c7092d10315f56942556aee",
            "projectName": "test4",
            "division": "divison",
            "landUser": "landuser",
            "lotId": "lotId",
            "projectId": "6b72ee60-3701-11e9-ba02-1bd40c672c0b",
            "state": "Declaration of Sec. 5",
            "__v": 0
        }
    ]
}
```
