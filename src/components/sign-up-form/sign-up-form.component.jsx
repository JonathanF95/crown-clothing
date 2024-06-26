import { useContext, useState } from "react";
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.component.scss'
import { UserContext } from "../../contexts/user.contexts";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;

    const {setCurrentUser} = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password != confirmPassword){
            alert('Passwords do not match'); 
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);

            setCurrentUser(user);
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use')
            }else if(password.length < 6){
                alert('Cannot create user, password needs to be longer than 6 characters')
            }
            else{
                console.log('user creation encountered an error', error)
            }
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and passoword</span>
            <form onSubmit={handleSubmit} >
                <FormInput label='Display Name'type="text"required onChange={handleChange} name="displayName" value={displayName} />

                <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password} />

                <FormInput label='Confirm Password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button type='submit'>Sign Up </Button>
            </form>
        </div>
    )
}

export default SignUpForm;