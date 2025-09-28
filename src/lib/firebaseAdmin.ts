var admin = require("firebase-admin");
var serviceAccount = require("../../config/serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ehfake-default-rtdb.firebaseio.com"
  });
}

var dbAdmin = admin.database();
module.exports = { admin, dbAdmin };
