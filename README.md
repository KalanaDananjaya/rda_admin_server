﻿# RDA Land Clearance System Backend
This version of the backend is made from scratch using express js framework.
It uses json web token scheme for authentication

## Open endpoints
Open endpoints require no authentication
* [Get all user info](documentation/user/getAllUsers.md) : `GET /user/getAllUsers`
* [Log In](documentation/login/loginUser.md) : `POST /login/`
* [Forgot Password](documentation/login/forgotPassword.md) : `POST /reset/forgotPassword`
* [Validate Reset Password Token] (documentation/login/validateResetPw.md) : `POST /reset/resetPasswordValidate`
* [Reset Password](documentation/login/resetPassword.md) : `POST /reset/resetPassword`

### User
These endpoints are related to manipulation of user data

* [get user](documentation/user/getUser.md) : `POST /user/getUser`
* [create user](documentation/user/createUser.md) : `POST /user/createUser`

* [approve user](documentation/user/approveUser.md) : `POST /user/approveUser`
* [reject user](documentation/user/rejectUser.md) : `POST /user/rejectUser`
* [delete user](documentation/user/deleteUser.md) : `POST /user/deleteUser`

* [list approved user](documentation/user/getApprovedUsers.md) : `GET /user/approvedUsers`
* [list rejected user](documentation/user/getRejectedUsers.md) : `GET /user/rejectedUsers`
* [list pending user](documentation/user/getPendingUsers.md) : `GET /user/pendingUsers`

### Project
These endpoints are related to manipulation of project data

* [create project](documentation/project/createProject.md) : `POST /projects/createProject`
* [move to next stage](documentation/project/sendToNextStage.md) : `POST /projects/sendToNextStage`
* [search](documentation/project/search.md) : `GET /projects/search`
* [search main Project](documentation/project/searchMainProject.md) : `GET /projects/searchMainProject`

### File
These endpoints are related to manipulation of project files
* [upload file](documentation/files/upload.md) : `POST /files/uploadFile`
* [get project file ids](documentation/files/getProjectFiles.md) : `GET /files/projectFiles`
* [get file info](documentation/files/getFileInfo.md) : `GET /files/fileInfo`
* [get file](documentation/files/getFile.md) : `GET /files/file`

## Endpoints that require authentication
These endpoints require passing of authentication token. 

* [Verify User](documentation/login/verifyUser.md) : `POST /login/verify`
* [Change Password](documentation/login/changePassword.md) : `POST /login/changePassword`





