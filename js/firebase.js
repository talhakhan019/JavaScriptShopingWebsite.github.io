var firebaseConfig = {
    apiKey: "AIzaSyAy1t8-_Cc3gIUbL86e79L5Org7aheHJts",
    authDomain: "clone-bce98.firebaseapp.com",
    projectId: "clone-bce98",
    storageBucket: "clone-bce98.appspot.com",
    messagingSenderId: "495942043230",
    appId: "1:495942043230:web:d8806f13e837df5fb456cf",
    measurementId: "G-M92DBCT3T6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.firestore();