import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyANSx59phbScIt_C5MxcLIDHYkR--ShUms",
    authDomain: "expensify-2268c.firebaseapp.com",
    databaseURL: "https://expensify-2268c.firebaseio.com",
    projectId: "expensify-2268c",
    storageBucket: "expensify-2268c.appspot.com",
    messagingSenderId: "214323588663"
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default};