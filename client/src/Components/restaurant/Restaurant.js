import axios from "axios";
import { useEffect, useState, useRef} from "react";
import { useParams } from "react-router-dom";
import Header from "../filter/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import jwtDecode from 'jwt-decode';
// import Swal from "sweetalert2";
function Restaurant() {
  // let { user } = props;
  // console.log(props)
  const emailRef = useRef();
    let { id } = useParams();
    let initRestDetails = {
        aggregate_rating: 0,
        city: "",
        city_id: 0,
        contact_number: "91943524651",
        cuisine: [{}, {}],
        cuisine_id: [],
        image: "/images/assets/restaurant.jpg",
        locality: "",
        location_id: 0,
        mealtype_id: 0,
        min_price: 0,
        name: "",
        rating_text: "",
        thumb: [],
        _id: ""
    }

    let [ restDetailsToggle, setRestDetailsToggle ] = useState(true);
    let [ rDetails, setRdetails] = useState({ ...initRestDetails});
    let [ menuitems, setMenuitems] = useState([]);
    let [ totalPrice, setTotalPrice ] = useState(0);

    let getRestaurantDetails = async () => {
        let url = 'https://developer-gautam-zomato-clone.onrender.com/api/get-Restaurant-details-by-id/' +id;
        let { data } = await axios.get(url);
        // console.log(data)
        if(data.status === true) {
            setRdetails({ ...data.restaurants })
        }
        else {
            setRdetails({ ...data.initRestDetails })
        }
    };
    let getMenuitems = async () => {
        let url = 'https://developer-gautam-zomato-clone.onrender.com/api/get-MenuItems-by-RestID/' +id;
        // console.log("this is getMenuitems id")
        let { data } = await axios.get(url);
        // console.log(data);
        if (data.status === true) {
            setMenuitems( [...data.Menu_items] );
            // console.log(menuitems)
        }
        else {
            // setMenuitems([]);
            alert("can't find any menu for this")
        }
        setTotalPrice(0);
    };
    useEffect(() => {
      getMenuitems();
    }, []);
    let addItem = (index) => {
       let _menuitems = [...menuitems];
       _menuitems[index].qty += 1;
       setMenuitems(_menuitems);

       let newTotal = totalPrice + _menuitems[index].price;
       setTotalPrice(newTotal);
    }
    let removeItem = (index) => {
        let _menuitems = [...menuitems];
        _menuitems[index].qty -= 1;
        setMenuitems(_menuitems);
 
        let newTotal = totalPrice - _menuitems[index].price;
        setTotalPrice(newTotal);
     }

    // For payment verification we need user email to verify
    let getUserLoginData = () => {
      // read data from local storage
      let token = localStorage.getItem("LoginToken");
      if (token == null) {
        return false;
      } else {
        // decode a jwt token =>
        try {
          let result = jwtDecode(token);
          return result;
        } catch (error) {
          // remove a token from localStorage
          localStorage.removeItem("LoginToken");
          return false;
        }
      }
    };
    let [user, setUser] = useState(getUserLoginData());
    // console.log(user.email)

    // Payment
  let makePayment = async () => {
    let userOrder = menuitems.filter((menu) => menu.qty > 0);

    let url = "https://developer-gautam-zomato-clone.onrender.com/api/gen-order-id";
    let { data } = await axios.post(url, { amount: totalPrice });

    if (data.status === false) {
      alert("Unable to gen order id");
      return false;
    }
    let { order } = data;

    var options = {
      key: "rzp_test_RB0WElnRLezVJ5", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // rupee to paisa
      currency: order.currency,
      name: "Zomato Order",
      description: "Make payment for your orders",
      image:
        "https://www.freelogovectors.net/wp-content/uploads/2016/12/zomato-logo-785x785.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        var verifyData = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
          name: user.name,
          mobile: 9999999999,
          email: user.email,
          order_list: userOrder,
          totalAmount: totalPrice,
        };
        let { data } = await axios.post(
          "https://developer-gautam-zomato-clone.onrender.com/api/verify-payment",
          verifyData
        );
        if (data.status === true) {
          alert("payment completed successfully");
          window.location.assign("/");
        } else {
          alert("payment fails");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "9999999999",
      },
    };

    var rzp1 = window.Razorpay(options);
    rzp1.open();
  };

    useEffect(() => {
        getRestaurantDetails();
    }, [])
    return(
        <>
           <Header />  { /*this header is common from the filter page */} 
           <main className="container-fluid">
            <section className="row mx-auto">
            <div className="col-12 col-lg-9 col-md-9 mx-auto mt-md-1 mt-1 ">
                <div className="position-relative">
                    <img className="mt-md-5 mt-3 main-image w-100" 
                    src='/images/assets/restaurant.jpg' alt=".." />

                    {/* gallery toggle view poppup modal */}
                    <div className="modal fade" id="GalleryModal" tabIndex="-1" aria-hidden="true">
                      <div className="modal-dialog modal-lg" style={{ height: "75vh", width: "100%" }} >
                        <div className="modal-content">
                        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                          <div className="modal-body h-75">
                            <Carousel showThumbs={false} infiniteLoop={true} >
                                {rDetails.thumb.map( (value, index) => {
                                    return (
                                        <div key={index} className="w-100">
                                            <img src={"/images/"+ value} alt="..." />
                                        </div>
                                    )
                                })
                                }
                            </Carousel>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-outline-dark Gallery-btn"
                    data-bs-toggle="modal" data-bs-target="#GalleryModal">Click to see Image Gallery</button>
                </div>
                <h3 className="rest-heading mt-4 fw-bold">{rDetails.name}</h3>
                <div className="details-btn mt-1 d-flex justify-content-between align-items-center">
                    <div>
                        <span onClick={()=> setRestDetailsToggle(true)}
                        /* when contact is clicked, it'll change the state to false 
                           so OVERVIEW details get printed on page */
                        className="btn btn-outline-none fw-bold overview">Overview</span>


                        <span onClick={()=> setRestDetailsToggle(false)}
                        /* when contact is clicked, it'll change the state to false 
                           so CONTACT details get printed on page */
                        className="btn btn-outline-none fw-bold mx-2 contact">Contact</span>
                    </div>

                    <div className="modal fade" id="paymentModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1" >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel2">
                              name
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                          </div>
                          <div className="modal-body">
                            <div className="mb-3">
                              <label htmlFor="exampleFormControlInput1" className="form-label" > Full Name </label>
                              <input type="text" className="form-control" 
                              id="exampleFormControlInput1" placeholder="Enter full Name"
                              value={user.name} onChange={() => {}} disabled />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="exampleFormControlInput1" className="form-label" > Email </label>
                              <input type="email" ref={emailRef} className="form-control" id="exampleFormControlInput1"
                               placeholder="name@example.com" value={user.email}
                                onChange={() => {}} disabled />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="exampleFormControlTextarea1" className="form-label" > Address </label>
                              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                               value="Nashik" onChange={() => {}} ></textarea>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button className="btn btn-danger" data-bs-target="#modalMenuList" data-bs-toggle="modal" >
                              Back
                            </button>
                            <button className="btn btn-success" onClick={makePayment}> Pay Now </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="modal fade" id="MenuitemsModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{rDetails.name}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                          {menuitems.map(( menu, index) => {
                            return (
                                <div key={menu._id} className="row p-2 mt-4">
                                <div className="col-8">
                                    <p className="mb-1 h6">{menu.name}</p>
                                    <p className="mb-1">{menu.price}</p>
                                    <p className="small text-muted">{menu.description}</p>
                                </div>
                                <div className="col-4 d-flex justify-content-end">
                                    <div className="menu-food-item d-flex flex-column align-items-center position-relative">
                                        <img src={"/images/assets/breakfast.png"} alt=".." className="" />
                                        {menu.qty === 0 ? (
                                            <button className="btn btn-primary btn-sm add position-absolute"
                                            onClick={() => { addItem(index)}}>Add</button>
                                        )
                                        :
                                        (
                                        <div className="qty-count position-absolute d-flex gap-1">
                                            <span className="hand" onClick={() => {removeItem(index)}}>-</span>
                                            <span className="qty">{menu.qty}</span>
                                            <span className="hand" onClick={() => {addItem(index)}}>+</span>
                                        </div>
                                        )}
                                    </div>
                                </div>
                                <hr className="p-0 my-2" />
                            </div> 
                            )
                          }) }
                          <div className="modal-footer d-flex justify-content-between">
                            <h4>Total = {totalPrice}</h4>

                            <button className="btn btn-danger" 
                            data-bs-toggle="modal" data-bs-target="#paymentModal">Pay Now</button>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                    <button className="btn btn-danger order-btn" onClick={getMenuitems}
                    data-bs-toggle="modal" data-bs-target="#MenuitemsModal">Place Online Order</button>
                </div>
                <hr className="mt-2" />
                {
                    /* when restDetailsToggle = true, this part will get printed on page */
                restDetailsToggle ? ( 
                <div className="rest-overview-details">
                    <p className="fw-bold about-place-heading">About This Place</p>
                    <p className="fw-bold mt-4 cuisine-details">cuisine</p>
                    <h5 className="addr-price-details">
                    {rDetails.cuisine.reduce((pValue, cValue) => {
                        let value = pValue === "" ? cValue.name : pValue.name+ ", " + cValue.name
                        {/* console.log(value) */}
                        return value
                    })
                    }</h5>
                    <p className="fw-bold mt-4 cuisine-details">Average cost</p>
                    <h5 className="addr-price-details">₹ {rDetails.min_price} for two people (approx.)</h5>
                </div> )
                : 
                /* when restDetailsToggle = false, this part will get printed on page */
                (<div className="rest-contact-details">
                    <p className="fw-bold mt-4 cuisine-details">Phone Number</p>
                    <h5 className="addr-price-details">+{rDetails.contact_number}</h5>
                    <p className="fw-bold mt-4 cuisine-details">Address</p>
                    <h5 className="addr-price-details">{rDetails.locality}, {rDetails.city}</h5>
                </div> )
                }
            </div>
            </section>
            </main>
        </>
    )
}
export default Restaurant;