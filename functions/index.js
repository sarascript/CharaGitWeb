const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//exports.helloWorld = functions.https.onRequest((request, response) => {
//    const original = request.query.text;
//    response.send("Hello from Firebase!" + original);
//});

exports.addMessage = functions.https.onRequest((req, res) => {
    // Call with: https://us-central1-charagit-e5789.cloudfunctions.net/addMessage?title=""&body=""
    const title = req.query.title;
    const body = req.query.body;
    return admin.firestore().collection('Messages').add({Title: title, Body: body}).then((writeResult) => {
        // Send back a message that we've succesfully written the message
        return res.json({result: `Message with ID: ${writeResult.id} added.`});
      });
});