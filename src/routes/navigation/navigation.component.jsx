// navigation.component.jsx
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import crownLogo from '../../assets/crown.svg';
import './navigation.styles.scss';


const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <img src={crownLogo} className="logo" alt="Crown Logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/home'>
                        SHOP
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;
