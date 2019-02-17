const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json())

// Fake users
var user_list = {}
user_list['ujjwalrox'] = 'ujjwal'
user_list['prakhar'] = 'goenka'
user_list['satyam'] = 'mani'
user_list['ujjwal'] = 'raizada'


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

    console.log(req.body)

    res_data = {
        'username': username,
    }

    if (user_list[username]) {
        res_data['status'] = 'failure'
        res_data['message'] = 'username already exists'
        console.log("failed Signup attempt")
    }
    else if (username != '' || password != '') {
        user_list[username] = password;
        res_data['status'] = 'success'
        res_data['message'] = 'user created'
        console.log("successful Signup attempt")
    }
    else {
        res_data['status'] = 'failure'
        res_data['message'] = 'Invalid Data'
        console.log("failed Signup attempt")
    }

    res.json(res_data)

  })

  app.listen(3000, '0.0.0.0', function (err) {
    if (err) {
      throw err
    }
  
    console.log('Starting development server under secure firewall')
    console.log('Server started on port 3000')
    console.log('accepting requests GET/POST:')
  })