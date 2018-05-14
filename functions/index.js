const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
'use strict';
const nodemailer = require('nodemailer');
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});
const APP_NAME = 'CharaGit';

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

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  // [END onCreateTrigger]
    // [START eventAttributes]
    const email = user.email; // The email of the user.
    const displayName = user.displayName; // The display name of the user.
    // [END eventAttributes]
  
    return sendWelcomeEmail(email, displayName);
  });
  // [END sendWelcomeEmail]
  
  // [START sendByeEmail]
  /**
   * Send an account deleted email confirmation to users who delete their accounts.
   */
  // [START onDeleteTrigger]
  exports.sendByeEmail = functions.auth.user().onDelete((user) => {
  // [END onDeleteTrigger]
    const email = user.email;
    const displayName = user.displayName;
  
    return sendGoodbyEmail(email, displayName);
  });
  // [END sendByeEmail]
  
  // Sends a welcome email to the given user.
  function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
      from: `${APP_NAME} <noreply@firebase.com>`,
      to: email,
    };
  
    // The user subscribed to the newsletter.
    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. Now you can enjoy creating Open Source code more than ever :)`;
    return mailTransport.sendMail(mailOptions).then(() => {
      return console.log('New welcome email sent to:', email);
    });
  }
  
  // Sends a goodbye email to the given user.
  function sendGoodbyEmail(email, displayName) {
    const mailOptions = {
      from: `${APP_NAME} <noreply@firebase.com>`,
      to: email,
    };
  
    // The user unsubscribed to the newsletter.
    mailOptions.subject = `Bye!`;
    mailOptions.text = `Hey ${displayName || ''}!, We confirm that we have deleted your ${APP_NAME} account. We hope you return to us someday :(`;
    return mailTransport.sendMail(mailOptions).then(() => {
      return console.log('Account deletion confirmation email sent to:', email);
    });
  }

  exports.sendNotification = functions.database.ref('Users/{uid}/Username/').onWrite(event=>{
    const uuid = event.params.uid;
    
    console.log('User to send notification', uuid);
    
    var ref = admin.database().ref(`Users/${uuid}/token`);
    return ref.once("value", function(snapshot){
    
        const payload = {
              notification: {
                title: 'You have set an Username',
                body: 'Tap here to check it out!'
              }
            };
    
            admin.messaging().sendToDevice(snapshot.val(), payload)
    
            },
        function (errorObject) {
            console.log("The read failed: " + errorObject.code);
    });
    })