// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js"
import { 
  getAuth, 
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
  } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js"
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwAX7HPPzrEbRiDvS6KkVns8y2IEfVKCY",
  authDomain: "fir-2b9b9.firebaseapp.com",
  projectId: "fir-2b9b9",
  storageBucket: "fir-2b9b9.appspot.com",
  messagingSenderId: "929690840538",
  appId: "1:929690840538:web:8163dfad1b5b81e93c24e3",
  measurementId: "G-FKCSQWWHFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Initialize Analytics
const auth = getAuth();

// Signup Function
function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Check if both fields are filled
  if (email === '' || password === '') {
    alert('Please fill out both email and password fields.');
    return;
  }

  // Optional: Add more password validation (e.g., length, special characters)
  if (password.length < 6) {
    alert('Password should be at least 6 characters long.');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User signed up successfully
      const user = userCredential.user;
      console.log('User signed up:', user);
      alert('Sign up successful! Welcome, ' + user.email);
      window.location.pathname = 'signin.html'
    })
    .catch((error) => {
      // Handle sign-up errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error signing up:', errorCode, errorMessage);

      // Display a user-friendly error message
      alert('Error: ' + errorMessage);
    });
}

// Attach event listener to button
document.getElementById('signupButton')?.addEventListener('click', signup);

function signin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Check if both fields are filled
  if (email === '' || password === '') {
    alert('Please fill out both email and password fields.');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('Signed in successfully: ', user)
    alert('Logged in...')
    sessionStorage.setItem("user", user.accessToken);
    window.location.pathname = './welcome.html'
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
  });
}

document.getElementById('loginButton')?.addEventListener('click', signin);

const provider = new GoogleAuthProvider();

function signinWithGoogle() {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    window.location.pathname = 'welcome.html'
    sessionStorage.setItem('user', token)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(error)
    // ...
  });
}

document.getElementById('googleLoginButton')?.addEventListener('click', signinWithGoogle);