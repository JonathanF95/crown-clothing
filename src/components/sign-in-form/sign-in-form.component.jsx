import { useState } from "react";
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.component.scss'

const defaultFormFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

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
            const response = await signInAuthUserWithEmailAndPassword(email, password)
            resetFormFields();
        } catch (error) {
            console.log(error)
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