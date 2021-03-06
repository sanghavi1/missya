var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var helper = require('sendgrid').mail;


function sendEmail(sendTo, message){

  var from_email = new helper.Email('yaBoi@mail.com');
  var to_email = new helper.Email(String(sendTo));
  var subject = 'YOU HAVE BEEN BOOPED!';
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
