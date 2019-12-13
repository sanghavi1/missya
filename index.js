/* Creator: Yash Sanghavi  */

const express = require('express')
const app = express()

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
	sg.API(request, function(error, response) {
		console.log(response.statusCode);
		console.log(response.body);
		console.log(response.headers);
	});
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
