import React from "react";
// import { Link } from "react-router-dom";
import "../Nav/style.css"
import CreateButton from "../CreateButton";
import UploadButton from "../UploadButton";
// import LogInButton from '../LogInButton';
import ReactTooltip from 'react-tooltip';
import Logo from '../../2.png'


function Nav(props) {
    return (
        <React.Fragment>
            <nav className="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/home">
                        <img src={Logo}  className="logo" alt="logo" width="35"></img>
                        <h1 className="title app-name">Meme House</h1>
                    </a>
                    <button className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div id="navbarBasic" className="navbar-menu">
                {props.user ? loggedIn(props.logOut, props.uploadWidget, props.toggleModal) : loggedOut(props.toggleModal)}
                </div>
            </nav>
        </React.Fragment>
    );
}

function loggedOut(toggleModal) {
    return (
        <React.Fragment>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <CreateButton toggleModal={toggleModal} />
                        <a href="/signup" className="button is-link">Sign Up</a>
                        <a href="/login" className="button is-link">Log In</a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

function loggedIn(logOutFn, uploadWidget, toggleModal) {
    return (
        <React.Fragment>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                    <ReactTooltip place="bottom" effect="solid" />
                            <UploadButton uploadWidget={uploadWidget} />
                            <CreateButton toggleModal={toggleModal}/>
                            {/* <LogInButton /> */}
                            <button className="button is-link" onClick={logOutFn} >Log Out</button>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}

export default Nav;