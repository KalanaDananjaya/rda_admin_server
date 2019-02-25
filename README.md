﻿# RDA Land Clearance System Backend
This version of the backend is made from scratch using express js framework.
It uses json web token scheme for authentication

## Open endpoints
Open endpoints require no authentication
* [Get all user info](documentation/user/getAllUsers.md) : `GET /getAllUsers`
* [Log In](documentation/login/loginUser.md) : `POST /login`

### Module
These endpoints are related to manipulation of module data


//* [registered Module](doc/module/registeredModules.md) : `GET /modules/registeredModule`

### User
These endpoints are related to manipulation of user data

* [get user](documentation/user/getUser.md) : `POST /getUser`
* [create user](documentation/user/createUser.md) : `POST /createUser`

* [approve user](documentation/user/approveUser.md) : `POST /approveUser`
* [reject user](documentation/user/rejectUser.md) : `POST /rejectUser`
* [delete user](documentation/user/deleteUser.md) : `POST /deleteUser`

* [list approved user](documentation/user/getApprovedUsers.md) : `GET /approvedUsers`
* [list rejected user](documentation/user/getRejectedUsers.md) : `GET /rejectedUsers`
* [list pending user](documentation/user/getPendingUsers.md) : `GET /pendingUsers`

### Project
These endpoints are related to manipulation of project data

* [create project](documentation/project/createProject.md) : `POST /projects/createProject`
* [move to next stage](documentation/project/sendToNextStage.md) : `POST /projects/sendToNextStage`
* [search](documentation/project/search.md) : `POST /projects/search`

### File
These endpoints are related to manipulation of project files
* [upload file](documentation/files/upload.md) : `POST /files/uploadFile`
* [get project file ids](documentation/files/getProjectFiles.md) : `GET /files/projectFiles`

## Endpoints that require authentication
These endpoints require passing of authentication token. 

* [Verify User](documentation/login/verifyUser.md) : `POST /verify`

### Module
These endpoints are related to manipulation of module data

//
* [create Module](doc/module/createModule.md) : `POST /modules/createModule`


