/* Creator: Yash Sanghavi  */

const express = require('express');
const app = express();
const sendEmail = require('./static/js/main.js');
var path = require("path");

var helper = require('sendgrid').mail;
var from_email = new helper.Email('test@example.com');
var to_email = new helper.Email('ysanghavi1@gmail.com');
var subject = 'Hello World from the SendGrid Node.js Library!';
var content = new helper.Content('text/plain', 'Hello, Email!');
var mail = new helper.Mail(from_email, subject, to_email, content);

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON(),
});

const http = require('http');
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  console.log(sg);
  sendEmail(sg, helper);
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/sendEmail', (req, res) => {
  console.log("SEND");
  sendEmail(sg, helper);
});
/* static files */
app.use(express.static('static'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
