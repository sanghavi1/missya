/* Creator: Yash Sanghavi  */

const express = require('express');
const app = express();
const sendEmail = require('./static/js/main.js');
var path = require("path");

const http = require('http');
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/sendEmail', (req, res) => {
  sendEmail();
  console.log("SEND");
});
/* static files */
app.use(express.static('static'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
