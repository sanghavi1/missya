/* Creator: Yash Sanghavi  */

const express = require('express');
const app = express();
const sendMessageToFirebase = require('./server/sendMessageToFirebase.js');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const http = require('http');
const PORT = process.env.PORT || 5000;

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var path = require("path");


var admin = require('firebase-admin');

var serviceAccount = {
  "type": "service_account",
  "project_id": "penniesforyourthoughts-d68a9",
  "private_key_id": "f7c554e6e55a63b10131881524fbee918afb54aa",
  "private_key": process.env.FIREBASE_CONFIG.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_CONFIG_CLIENT_EMAIL,
  "client_id": "104550988597223846377",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x1lx3%40penniesforyourthoughts-d68a9.iam.gserviceaccount.com"
};

const firebaseConfig = {
  apiKey: process.env.FIREBASE_CONFIG_API_KEY,
  authDomain: "penniesforyourthoughts-d68a9.firebaseapp.com",
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://penniesforyourthoughts-d68a9.firebaseio.com",
  projectId: "penniesforyourthoughts-d68a9",
  storageBucket: "penniesforyourthoughts-d68a9.appspot.com",
  messagingSenderId: "913226695535",
  appId: "1:913226695535:web:5c13a797f39762b1b19e9a",
  measurementId: "G-FGX7469KXL"
};

// Initialize Firebase
admin.initializeApp(firebaseConfig);

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

/* Everything Related to Stripe API */
app.post('/charge', (req, res) => {

  sendMessageToFirebase(admin, req.body.message);

  const token = req.body.stripeToken; // Using Express

  (async () => {
    const charge = await stripe.charges.create({
      amount: 99,
      currency: 'usd',
      description: 'Pennies For Your Thoughts',
      source: token,
    },
    function(err, charge) {
      if(err){
        res.send("Something went wrong. Don't worry, you weren't charged.")
      }
      res.sendFile(path.join(__dirname + '/client/thoughtsBoard.html'));
    });
  })();
});

app.get('/getThoughts', (req, res) => {

// Get a database reference to our posts
var db = admin.database();
var ref = db.ref("/thoughts");

// Attach an asynchronous callback to read the data at our posts reference
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
  return res.send(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
  return res.send(null);
});
});

/* static files */
app.use(express.static(__dirname + '/client/static'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
