import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBd-GZZsmQji6zA28yXVCEOmTEJ0D0-1XI',
  authDomain: 'linktree-d86b1.firebaseapp.com',
  databaseURL: 'https://linktree-d86b1-default-rtdb.firebaseio.com',
  projectId: 'linktree-d86b1',
  storageBucket: 'linktree-d86b1.appspot.com',
  messagingSenderId: '18225515291',
  appId: '1:18225515291:web:5c8b1cbe5f46f2e31ee1be',
  measurementId: 'G-0DNLLLQ6YL',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
