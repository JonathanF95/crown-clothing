import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss'

const Authentication = () => {
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
    
    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm /> 
        </div>
    );
};

export default Authentication;