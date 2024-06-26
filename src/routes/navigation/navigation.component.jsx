// navigation.component.jsx
import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import crownLogo from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from "../../contexts/user.contexts";
import { signOutUser } from "../../utils/firebase/firebase.utils";


const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const signOutHandler = async () => {
         await signOutUser();
         setCurrentUser(null);
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <img src={crownLogo} className="logo" alt="Crown Logo" />
                </Link>
                <div className="nav-links-container">
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
                        ) : <Link className="nav-link" to='/auth'>
                            SIGN IN
                        </Link>
                    }

                </div>
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;
