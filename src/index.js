    'use strict';
    var admin = require("firebase-admin");
    var serviceAccount = require("./aa.json");
    module.exports = {
      /**
       * An asynchronous register function that runs before
       * your application is initialized.
       */
       register({ strapi }) {},
      /**
       * An asynchronous bootstrap function that runs before
       * your application gets started.
       *
       */
      bootstrap({ strapi }) {
        console.log("serviceeeeeeeeeeeeeee",serviceAccount);
        let firebase = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        //Make Firebase available everywhere
        strapi.firebase = firebase;
        let messaging = firebase.messaging();
    
        let sendNotification = (fcm, data) => {
          let message = {
            ...data,
            token: fcm
          }
          messaging.send(message).then((res) => {
            console.log(res);
          }).catch((error) => {
            console.log(error);
          });
        }
        let sendNotificationToTopic = (topic_name, data) => {
          let message = {
            ...data,
            topic: topic_name
          }
          messaging.send(message).then((res) => {
            console.log(res);
          }).catch((error) => {
            console.log(error);
          });
        }
        let subscribeTopic = (fcm, topic_name) => {
          messaging.subscribeToTopic(fcm, topic_name).then((res) => {
            console.log(res);
          }).catch((error) => {
            console.log(error);
          });
        }
        //Make the notification functions available everywhere
        strapi.notification = {
          subscribeTopic,
          sendNotificationToTopic,
          sendNotification
        }
        
      },
    };
    