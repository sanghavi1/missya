var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var helper = require('sendgrid').mail;


function sendEmail(sendTo, message){
  console.log(String(sendTo));
  console.log(String(message));
  var from_email = new helper.Email('test@example.com');
  var to_email = new helper.Email(String(sendTo));
  var subject = 'Hello World from the SendGrid Node.js Library!';
  var content = new helper.Content('text/plain', String(message));
  var mail = new helper.Mail(from_email, subject, to_email, content);

  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
}

module.exports=sendEmail;
