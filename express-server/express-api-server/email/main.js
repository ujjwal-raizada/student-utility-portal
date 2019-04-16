const fileSystem = require('fs');
const {google} = require('googleapis');
const readline = require('readline');
const base64 = require('base-64');
const {Random} = require('random-js');

const random = new Random();
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const TOKEN_PATH = 'token.json';
const char = 'abcdefghijklmnopqrstuvwxyz';

function main(user_data){
    fileSystem.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), sendEmail, user_data);
    });
    process.chdir(temp_path);
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, user_data) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fileSystem.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback, user_data);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client, user_data);
    });
}


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback, user_data) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
         // Store the token to disk for later program executions
        fileSystem.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client, user_data);
        });
    });
}


/**
* Receive details about the email and convert a base64 encoded
* string form.
* @param  {String} userId User's email address. The special value 'me'
* can be used to indicate the authenticated user.
* @param {String} receiverID receiver's email ID.
* @param {String} subject Subject of the email.
* @param {String} emailBody Email message to be sent.
*/
function createEmail(userID = 'me', receiverID, subject, emailBody){
    var message = [
        "Content-Type: text/html; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", receiverID, "\n",
        "from: ", userID, "\n",
        "subject: ", subject, "\n\n",
        emailBody
    ].join('');

    message = base64.encode(message).replace(/\+/g, '-').replace(/\//g, '_');
    return message;
}


/**
 * Send Message.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} email RFC 5322 formatted String.
 * @param  {Function} callback Function to call when the request is complete.
 */
function sendEmail(OAuth2Client,user_data) {
    let message = createEmail(user_data.userId, user_data.receiverID, user_data.subject, user_data.emailBody);
    const gmail = google.gmail({version: 'v1',OAuth2Client});
    var request = gmail.users.messages.send({
        auth: OAuth2Client, 
        'userId': user_data.userId,
        'resource': {
        'raw': message
        }, function (err, response){
            if (err) console.error(err);
            else console.log(response);
        }
    });
}

exports.generatePassword = function(){
    let password = ''
    for (x = 0; x < 7; x++){
        index = random.integer(1,26);
        password += char[index-1];
    }
    return password;
}

exports.forgotEmail = function(userEmail, password){

    let text = 
    `Psst. Word on the street is that you need a new password, <b> ${userEmail} </b>.` + '<br>' + 
    `It's all good. Here's your new password and we'll take care of the rest: <b> ${password} </b>` + '<br>' +
    `Thanks,<br> Your friends at Student Utility Portal.`

    console.log(text)

    let user_data = {
        userId: 'me',
        receiverID: userEmail,
        subject: 'Password reset requested for your account',
        emailBody: text,
    }    
    main(user_data);
}
