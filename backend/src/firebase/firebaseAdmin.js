const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
require('dotenv').config({ path: '../../../.env' });         // must come first

let serviceAccount;

if (process.env.FIREBASE_CONFIG) {
  // one‑line JSON in env var
  serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
} else {
  // ① try env‑var path, ② else default to ./secure/pasikudu.json
  const keyPath =
    process.env.FIREBASE_CONFIG_PATH ||
    path.resolve(__dirname, "../../../secure/pasikudu.json");

  serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf-8"));
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
