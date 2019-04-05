# Express API Server
This is a cloud based API server which powers Student Utility portal.
<br>
Link for the backend API : [sup-express.herokuapp.com](https://sup-express.herokuapp.com)


## How to run:

### 1. Using python script:

In normal mode:
```
$ python3 server-start.py
```
<br>
In dev mode:
```
$python3 server-start.py --dev
```

### 2. Directly from command line:

In Dev Mode <br>
##### Windows: <br>
```
SET DEBUG=express-api-server:* & npm run devstart
```
##### MacOS or Linux: <br>
```
DEBUG=express-api-server:* & npm run devstart
```
<br>


## Express Server Endpoints 

Following are the endpoints of the API: 

### /student 
 * /student/signup 
 * /student/login
 * /student/profile


### /admin
* /admin/signup
* /admin/login
* /admin/students
* /admin/sources


### /notice 
* /notice/getall
* /notice/tags
* /notice/create
* /notice/createtag
* /notice/id/:noticeID


## Authors

* [Pranjal Gupta](https://github.com/PranjalGupta2199)
* [Ujjwal Raizada](https://github.com/ujjwalrox)
