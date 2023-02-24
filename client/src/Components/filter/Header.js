
// import { useState, useEffect} from 'react';
// import jwtDecode from 'jwt-decode';
import LoginButton from "../CommonLogin/Login";

function Header() {
    return ( 
        <>   
        <nav className="row nav" >
            <div className="col-lg-10 col-11 m-auto d-flex fs-xs-6 navigation-bar">
                <a href="#">e!</a>
                {/* <div className="Login-createacc"> */}
                <LoginButton />
                {/* </div> */}
            </div>
        </nav>
        </>
    )
}
export default Header;