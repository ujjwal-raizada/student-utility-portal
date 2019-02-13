/*
* Script : Automation of sending email using Google API
*/

const fileSystem = require('fs');
const {google} = require('googleapis');
const readline = require('readline');

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const TOKEN_PATH = 'token.json';


fileSystem.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), sendEmail);
});
console.log("Message send")


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fileSystem.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
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
      callback(oAuth2Client);
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
    var message = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", receiverID, "\n",
        "from: ", userID, "\n",
        "subject: ", subject, "\n\n",
        emailBody
    ].join('');

    message = new Buffer(message).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
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
function sendEmail(OAuth2Client, userId ='me' , receiverID, subjec, emailBody) {
  let message = createEmail(userId, receiverID, subject, emailBody);
  const gmail = google.gmail({version: 'v1',OAuth2Client});
  var request = gmail.users.messages.send({
    auth: OAuth2Client, 
    'userId': userId,
    'resource': {
      'raw': message
    }, function (err, response){
        if (err) console.error(err);
        else console.log(response);
    }
  });
}
