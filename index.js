/* Creator: Yash Sanghavi  */

const express = require('express');
const app = express();
const sendEmail = require('./server/sendEmail.js');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const http = require('http');
const PORT = process.env.PORT || 5000;

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var path = require("path");

// for parsing application/json
app.use(bodyParser.json());

app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function(req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    }
  })
);

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded
app.use(upload.array());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.post('/sendEmail', (req, res) => {
  sendEmail(req.body.sendTo, req.body.message);
  console.log("SEND");
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

/* Everything Related to Stripe API */
app.post('/charge', (req, res) => {
  const token = req.body.stripeToken; // Using Express

  (async () => {
    const charge = await stripe.charges.create({
      amount: 100,
      currency: 'usd',
      description: 'Example charge',
      source: token,
    },
    function(err, charge) {
      if(err){
        res.send("The Charge Didn't Work.")
      }
      res.send("IT WORKS!");
    });
  })();

});


/* static files */
app.use(express.static(__dirname + '/client/static'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
