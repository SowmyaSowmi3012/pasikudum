const admin = require("firebase-admin");
require("dotenv").config();           // safe even if already called

let serviceAccount;

if (process.env.FIREBASE_CONFIG) {
  // coming from an env‑var (Render / local)
  serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
} else {
  // fallback to a local file for dev convenience
  serviceAccount = require("../firebase/pasikudu.json");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
