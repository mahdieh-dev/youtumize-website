import { useCallback, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from "firebase/auth";
import { UserContext } from "../providers/UserProvider";
import { useCookies } from "react-cookie";
import { db } from "../pages/_app";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export enum ECollection {
  PROMPTS = "prompts",
  USERS = "users",
}

const useFirebase = () => {
  const { updateUser, clearUser, user: userInfo } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [docData, setDocData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  auth.useDeviceLanguage();

  const setToDatabase = useCallback(
    async (
      collectionName: ECollection,
      data: { [key: string]: any },
      user?: User
    ) => {
      try {
        let userData = user || userInfo?.user;
        if (!!!userData) {
          userData = cookies["user"]?.user;
          if (!!!userData) {
            return;
          }
        }
        setLoading(true);
        const uid = userData.uid;
        const collectionRef = collection(db, collectionName);
        const docRef = doc(collectionRef, uid);
        await setDoc(docRef, data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error when setting data to database:", error);
      }
    },
    [doc, db, setDoc, userInfo, addDoc]
  );

  const getFromDatabase = useCallback(
    async (collectionName: ECollection) => {
      try {
        let userData = userInfo?.user;
        if (!!!userData) {
          userData = cookies["user"]?.user;
          if (!!!userData) {
            return;
          }
        }
        setLoading(true);
        const docRef = doc(db, collectionName, userData.uid);
        const data = await getDoc(docRef);
        if (data.exists()) {
          // console.log("got the doc data:", data.data());
          setDocData(data.data());
          setLoading(false);
          return data.data();
        } else {
          console.log(
            "No such document exists, collectionName: ",
            collectionName
          );
          setLoading(false);
          return undefined;
        }
      } catch (error) {
        setLoading(false);
        console.log("error when getting data from database:", error);
      }
    },
    [doc, db, userInfo]
  );

  const login = useCallback(
    async (cb) => {
      try {
        const result = await signInWithPopup(auth, provider);
        if (!!!result) {
          return;
        }
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!!!credential) {
          return;
        }
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user info: ", { token, user: JSON.stringify(user) });
        if (!!!user) {
          return;
        }
        setCookie("user", JSON.stringify({ token, user }), {
          maxAge: 48 * 3600,
          sameSite: true,
        });
        updateUser({ token, user });
        await setToDatabase(
          ECollection.USERS,
          {
            info: JSON.stringify(user),
          },
          user
        );
        cb?.();
      } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("error when logging in with google: ", {
          errorCode,
          errorMessage,
          email,
          credential,
        });
      }
    },
    [signInWithPopup, setCookie, updateUser, setToDatabase]
  );

  const logout = useCallback(() => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        removeCookie("user", { path: "/" });
        clearUser();
        router.push("/");
      })
      .catch((error) => {
        console.log("error when signing out the user: ", error);
        // An error happened.
      });
  }, [auth, removeCookie, clearUser, signOut, router]);

  return { login, logout, setToDatabase, getFromDatabase, docData, loading };
};

export default useFirebase;
