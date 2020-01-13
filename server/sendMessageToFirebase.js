function sendMessageToFirebase(admin, message) {

  var db = admin.database();
  var ref = db.ref("/thoughts");
  ref.push({
    message: message
  });
}

module.exports = sendMessageToFirebase;
