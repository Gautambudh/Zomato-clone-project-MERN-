import { useEffect, useState } from "react";
import axios from "axios";
import LoginButton from "../CommonLogin/Login";
import { useNavigate } from "react-router-dom";

function MainHeader() {
    let navigate = useNavigate();
    let [ locationList, setLocationList] = useState([]);
    let [ LocationID, setLocationID ] = useState("");
    let [ RestaurantInputText, setRestaurantInputText ] = useState("");
    let [ searchList, setsearchList ] = useState([]);

    let getLocationListFromServer = async () => {
        let url = "https://developer-gautam-zomato-clone.onrender.com/api/get-Location-list";
        let { data } = await axios.get(url);
        // console.log(data);
        setLocationList([...data.Location])
    }

    
    let getSelectValue = (event) => {
        let { value } = event.target 
        // console.log(value);
        setLocationID(value)
    }

    let searchForRestaurant = async (event) => {
        let { value } = event.target
        setRestaurantInputText(value)
        if (value !== "") {
            let url = "http://localhost:5003/api/search-restaurant";
            let { data } = await axios.post(url, {restaurant: value, loc_id: LocationID});
            // console.log(data);
            setsearchList(data.result)
        }
        
    }

    useEffect( () => {
        // console.log("location id changed")
        setRestaurantInputText("")
        setsearchList([])
    }, [LocationID]) ; // on update

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
                <a href="#">z!</a>
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
        <select name="location" className="location-selector form-select" placeholder="select location"
            onChange={getSelectValue}>
                <option value="">Select location</option>
                {
                    locationList.map((location, index) => {
                        return <option key={index} value={location.location_id}>
                            {location.name}, {location.city}
                        </option>
                    })
                }
            </select>
        </div>
        {/* <!-- ************ search icon and input box here ************************** --> */}
        <div className="col-md-4 col-sm-5 col-lg-4 col-11 restaurants-selector" >
        <div className="input-group relative">
        <button className="btn btn-light" id="search-btn" type="button">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
          <input type="text" className="form-control" placeholder="Search City" 
            value={RestaurantInputText}
            disabled={locationList.length === '' ? true : false}
            onChange={ searchForRestaurant}
          />
            <ul className="list-group absolute bottom-0 w-100">
          {
            searchList.map( (rest_name) => {
                return (
                    <li key={rest_name._id} className="list-group-item list-group-item-action"
                    onClick={()=> navigate("/restaurant/"+rest_name._id)}>
                        {rest_name.name}
                    </li>
                )
            })
          }
            </ul>
        </div>
            {/* <input type="search" className="search-rest" placeholder= "&#xf002; Search for restaurants" /> */}
        </div>
        </div>
    </div> 
    </>
    )
}

export default MainHeader;