import { useNavigate } from "react-router-dom";

function RestaurantList(props) {
    let {restaurantList} = props;
    let navigate = useNavigate();
    return ( 
        <>
            <article className="col-12 col-lg-8">
                {
                restaurantList.map((restaurant, index) => {
                    return (
                        <div onClick={() => {
                            navigate("/restaurant/"+ restaurant._id)
                        }} key={index} className="rest-card d-flex ">
                        <div className="d-flex ">
                            <div className="search-result-image ">
                                <img src={`/images/`+restaurant.image} alt="" />
                            </div>
                            <div className="search-result-details ms-4">
                              <p className="mb-1 h3">{restaurant.name}</p>
                              <p className="mb-1 fw-bold">FORT</p>
                              <p className="mb-1 text-muted">
                                {restaurant.locality}, {restaurant.city}
                              </p>
                            </div>
                        </div>
                    
                    <div className="card-bottom-details">
                        <hr />
                        <div className="cost-details d-flex align-items-center">
                            <div>
                                <p>CUISINES:</p>
                                <p>COST FOR TWO:</p>
                            </div>
                            <div className="ms-4 fw-bold">
                                <p>{
                                    restaurant.cuisine.reduce((pValue, cValue) => {
                                        let value = pValue == "" ? cValue.name : pValue.name+ ", " + cValue.name
                                        return value
                                    })
                                }</p>
                                <p>{restaurant.min_price}</p>
                            </div>
                        </div>
                    </div>
                        </div>
                    )
                })  
                }
                <div className="pages">
                    <ul>
                        <li className="page-number">&lt;</li>
                        <li className="page-number">1</li>
                        <li className="page-number">2</li>
                        <li className="page-number">3</li>
                        <li className="page-number">4</li>
                        <li className="page-number">5</li>
                        <li className="page-number">&gt;</li>
                    </ul>
                </div>
            </article>
        </>
    )
}
export default RestaurantList;