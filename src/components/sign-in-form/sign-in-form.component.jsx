import { useState, useContext } from "react";
import Button from "../button/button.component";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.component.scss'
import { UserContext } from "../../contexts/user.contexts";

const defaultFormFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const {setCurrentUser} = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password)
            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            if(error.code === 'auth/invalid-credential')
            alert('Incorrect password for email')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and passoword</span>
            <form onSubmit={handleSubmit} >

                <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password} />

                <div className="buttons-container"> 
                    <Button type='submit'>Sign In </Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType={'google'}>Google Sign In </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;