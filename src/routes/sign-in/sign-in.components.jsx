import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils'
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
    useEffect(() => {
        const handleSignInRedirect = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result.user) {
                    await createUserDocumentFromAuth(result.user);
                    // Optionally, you can redirect the user to another page upon successful sign-in
                    // history.push('/dashboard'); // Example redirection using React Router
                }
            } catch (error) {
                console.error('Error handling sign-in redirect:', error);
            }
        };
    
        handleSignInRedirect();
    }, []);
    
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;