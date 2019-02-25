# Create Project

Move project to next stage. if next stage if not given system will try to move it linearly forward

**URL** : `/projects/sendToNextStage`

**Method** : `POST`

**Auth required** : Yes

**Permissions required** : None

**Parameters** : projectId, `[`nextStage`]`

## Success Response

**Code** : `200 OK`

**Content examples**


```json
{
    "success": true,
    "msg": "Project moved to next stage"
}
```
