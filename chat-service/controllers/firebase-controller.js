require('dotenv').config();
//test actions

const getConfig = async (req, res) => {

    console.log("reaches getConfig");

    try {
        // Your web app's Firebase configuration stored in .env file locally
        const firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
        };

        res.status(200).send({ firebaseConfig: firebaseConfig });
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { getConfig };