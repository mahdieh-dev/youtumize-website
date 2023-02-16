import "./styles.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { UserProvider } from "../providers/UserProvider";
import { CookiesProvider } from "react-cookie";

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
const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
export const db = getFirestore(app);

function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <UserProvider>
        {" "}
        <Component {...pageProps} />
      </UserProvider>
    </CookiesProvider>
  );
}

export { analytics };
export default App;
