import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect,signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyCRLqrZZvkJNa0K5YNbNXRNDLt8s52j39M",
    authDomain: "crwn-clothing-4c6c7.firebaseapp.com",
    projectId: "crwn-clothing-4c6c7",
    storageBucket: "crwn-clothing-4c6c7.appspot.com",
    messagingSenderId: "107297102957",
    appId: "1:107297102957:web:0612df3a7afc9c548eb364"
  };
  
  const fireBaseApp = initializeApp(firebaseConfig);

  const GoogleProvider = new GoogleAuthProvider();

  GoogleProvider.setCustomParameters({
    prompt: 'select_account'
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, GoogleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, GoogleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db,'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }catch(error){
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
  }