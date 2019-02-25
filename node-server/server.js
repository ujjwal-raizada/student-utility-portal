const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const fs = require('fs')

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json())

// Loading data from Database
let rawdata1 = fs.readFileSync('database/user_list.json')  
let user_list = JSON.parse(rawdata1)
console.log(user_list)

let rawdata2 = fs.readFileSync('database/notice_list.json')
let notice_list = JSON.parse(rawdata2)
console.log(notice_list)

let rawdata3 = fs.readFileSync('database/user_type.json') 
let user_type = JSON.parse(rawdata3)
console.log(user_type)

function commit_database() {
    
    var data
    data = JSON.stringify(user_type);
    fs.writeFileSync('database/user_type.json', data);

    data = JSON.stringify(user_list);
    fs.writeFileSync('database/user_list.json', data);

    data = JSON.stringify(notice_list);
    fs.writeFileSync('database/notice_list.json', data);

    console.log("Saving operation finished");

}


app.post('/login', (req, res) => {

    const username = req.body.username
    const password = req.body.password 

    console.log(req.body)

    if (user_list[username] == password ) {

        console.log(`Successful login attempt: ${username}`)

        res_data = {
            'status': 'success',
            'username': username,
            'message': `Successful login of ${username}`
        }

        res.json(res_data)
    }
    else {
        console.log(`Failed login attempt: ${username}`)

        res_data = {
            'status': 'failure',
            'username': username,
            'message': `failed login of ${username}`
        }

        res.json(res_data)
    }

  })

  app.post('/signup', (req, res) => {

    const username = req.body.username
    const password = req.body.password
    const type = req.body.type

    console.log(req.body)

    res_data = {
        'username': username,
    }

    if (user_list[username]) {
        res_data['status'] = 'failure'
        res_data['message'] = 'username already exists'
        console.log("failed Signup attempt")
    }
    else if (username == '' || password == '') {

        res_data['status'] = 'failure'
        res_data['message'] = 'Invalid Data'
        console.log("failed Signup attempt")

    }
    else {
        user_list[username] = password
        user_type[username] = type
        res_data['status'] = 'success'
        res_data['message'] = 'user created'
        console.log("successful Signup attempt")
    }

    commit_database()
    res.json(res_data)

  })

  app.post('/create', (req, res) => {

    const username = req.body.username
    const title = req.body.title
    const text = req.body.text

    console.log(req.body)

    res_data = {
        'username': username,
    }

    if (user_type[username] == 'admin') {
        res_data['status'] = 'success';
        var date = new Date();
        var post = [
            date,
            {
                'title': title,
                'text': text,
                'username': username
            }
        ]
        notice_list.push(post)
        res_data['post'] = post
        console.log(post)

    }
    else {
        res_data['status'] = 'failure'
        console.log("User not authorized to create notices.")
    }

    commit_database()
    res.json(res_data)

  })

  app.get('/notices', (req, res) => {

    res_data = {}

    notice_list.sort(function(a, b){return b[0] - a[0]});
    res_data['notices'] = notice_list


    res.json(res_data)

  })

  app.listen(8080, '0.0.0.0', function (err) {
    if (err) {
      throw err
    }
  
    console.log('Starting development server under secure firewall')
    console.log('Server started on port 3000')
    console.log('accepting requests GET/POST:')
  })