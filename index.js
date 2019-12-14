/* Creator: Yash Sanghavi  */

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const sendEmail = require('./static/js/main.js');
var path = require("path");

const http = require('http');
const PORT = process.env.PORT || 5000;

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded
app.use(upload.array());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/sendEmail', (req, res) => {
  sendEmail(req.body.sendTo, req.body.message);
  console.log("SEND");
  res.send('POST request sent!')
});

/* static files */
app.use(express.static('static'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
