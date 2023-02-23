import { useEffect, useState } from "react";
import axios from "axios";
import LoginButton from "../CommonLogin/Login";

function MainHeader() {
    let [ locationList, setLocationList] = useState([]);

    let getLocationListFromServer = async () => {
        let url = "https://developer-gautam-zomato-clone.onrender.com/api/get-Location-list";
        let { data } = await axios.get(url);
        // console.log(data);
        setLocationList([...data.Location])
    }

    useEffect(() => {
        getLocationListFromServer();
    }, [])
    return (
    <>
        <div className="container-fluid bg">
        <nav>
            <div className="row pt-2 login-createacc gap-2 mx-4">
                <div className="col-11 mx-auto d-flex justify-content-between">
                <p>.</p>
                    {/* <a href="#">Login</a> */}
                    <LoginButton />
                {/* <div className="col-2 text-center createacc">
                    <a href="#">Create account</a>
                    <button className="btn btn-outline-light">Create Account</button>
                </div> */}
                </div>
                
            </div>
        </nav>
        {/* <!-- *********************** navigation ends here **************** --> */}

        {/* <!-- ******************** LOGO here ********************************** --> */}
        <div className="row pt-4 logo">
            <div className="col-12 text-center">
                <a href="#">e!</a>
            </div>
        </div>

        {/* <!-- ******************** Tagline here ********************************* --> */}
        <div className="row pt-4 ">
            <div className="col-12 text-center tagline">
                <p>Find the best restaurants, cafés, and bars</p>
            </div>
        </div>

    {/* <!-- ****************************** searchbar here *************************************** -->    */}
        <div className="row searchbar justify-content-center mx-auto">
        <div className="col-md-2 col-sm-3 col-lg-2 col-11">
            <select name="location" className="location-selector" >
                <option value="selected">Select location</option>
                {
                    locationList.map((location, index) => {
                        return <option value="">{location.name}, {location.city}</option>
                    })
                }
            </select>
        </div>
        {/* <!-- ************ search icon and input box here ************************** --> */}
        <div className="col-md-4 col-sm-5 col-lg-4 col-11 restaurants-selector" >
            <input type="search" className="search-rest" placeholder= "&#xf002; Search for restaurants" />
        </div>
        </div>
    </div> 
    </>
    )
}

export default MainHeader;