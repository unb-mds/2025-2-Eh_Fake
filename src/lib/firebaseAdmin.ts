import admin from "firebase-admin";
import serviceAccount from "../../config/serviceAccountKey.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://ehfake-default-rtdb.firebaseio.com"
  });
}

const dbAdmin = admin.database();
export { admin, dbAdmin };
