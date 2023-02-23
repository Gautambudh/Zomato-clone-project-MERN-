import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode';
import { useState } from 'react';

function LoginButton() {
    var getUserLoginData = () => {
        // read data from local storage
        let token = localStorage.getItem("LoginToken");
        // console.log(token);
        if (token == null) {
            return false;
        }else {
          // decode the token
          try {
            var result = jwtDecode(token);
            // setUser(result);
            // console.log(user);
             return result;
          } catch (error) {
            localStorage.removeItem("LoginToken");
            console.log(error)
            return false;
          }
        }
    }
    let [ user, setUser ] = useState(getUserLoginData);
    // console.log(user)
    let onSuccess = (Response) => {
        let token = Response.credential;
        localStorage.setItem("LoginToken", token)
        // console.log(Response.credential);
        // alert("logged in successfully")
        window.location.assign("/");
        
    }
    let onError = () => {
        console.log('Login Failed');
      }
    
      let logout = () => {
        let doLogout = window.confirm("Confirm to logout");
        if(doLogout === true) {
          localStorage.removeItem("LoginToken");
          window.location.assign("/")
        }
      }
    return ( 
        <>
        <GoogleOAuthProvider clientId='551942284331-18q9locpn47e4jirarqch5s7vqv613mm.apps.googleusercontent.com'
        >
            <div className="modal fade" id="google-login" tabIndex="-1" aria-labelledby="exampleModalLabel" 
            aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
                    <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body d-flex justify-content-center">
                  <GoogleLogin onSuccess={onSuccess} onError={onError} 
                    />
                  </div>
                  <div className="modal-footer">
                  </div>
                </div>
              </div>
            </div>
                {user === false ? (
                  <button className="btn btn-outline-light Login"
                    data-bs-toggle="modal" data-bs-target="#google-login">Login</button>
                ):
                (
                  <>
                  <div>
                  <span className='text-white fw-bold d-xs-none'>Welcome {user.name}</span>
                  <button className="btn btn-outline-light ms-3 fw-bold" onClick={logout}>Logout</button>
                  </div>
                  
                  </>
                )
                }
        </GoogleOAuthProvider>
        
        </>
    )
}
export default LoginButton;