﻿# RDA Land Clearance System Backend
This version of the backend is made from scratch using express js framework.
It uses json web token scheme for authentication

## Open endpoints
Open endpoints require no authentication
* [Get all user info](documentation/user/getAllUsers.md) : `GET /getAllUsers`

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

## Endpoints that require authentication
These endpoints require passing of authentication token. 

### Module
These endpoints are related to manipulation of module data

//
* [create Module](doc/module/createModule.md) : `POST /modules/createModule`


