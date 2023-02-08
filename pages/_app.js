import "./styles.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB6mY67s4PDsiY5VCENEnjOKvdwQQ9sdiw",
  authDomain: "youtumize.firebaseapp.com",
  projectId: "youtumize",
  storageBucket: "youtumize.appspot.com",
  messagingSenderId: "535262130295",
  appId: "1:535262130295:web:712ed93d2b0b4c39375672",
  measurementId: "G-Z5Q0C50LXT",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export { analytics };
export default App;
