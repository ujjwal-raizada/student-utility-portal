# Node Server Endpoints:

## /login

* username
* password

## /signup

* username
* password
* type ('normal', 'admin')

## /create

* username
* title
* text

## /notices (GET)

returns List in form: <br>
```
[
	[date, {title, text, username}],
    [date, {title, text, username}],
    .
    .
    .
    .
    [date, {title, text, username}]

]
```
in desc order of date.

## Extras:
* port: 8080
* to erase data, delete contents of files in database/ folder except first and last brackets.
