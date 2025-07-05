const admin = require("firebase-admin");
const path = require("path");
require("dotenv").config();

// Set the path to the credentials if not set already
process.env.GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS || './secure/pasikudu.json';

// Load the service account key
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
