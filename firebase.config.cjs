// import admin from "firebase-admin";
const admin = require("firebase-admin")
const serviceAccount = require("./easy-tuition-56b31-firebase-adminsdk-tkm4t-c524729a95.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://easy-tuition-56b31.appspot.com",
});

module.exports = {
  bucket: admin.storage().bucket(),
};
