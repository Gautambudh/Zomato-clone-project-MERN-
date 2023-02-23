import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

function MealTypes() {
    // instance of navigate
    let navigate = useNavigate();
    let [mealList, setMealList] = useState([]); // #1
    

    let getMenuListFromServer = async () => {
        let url = "http://localhost:5003/api/get-Mealtype-list";
        let { data } = await axios.get(url); //#4
        // console.log(data.Meal_types);
        setMealList([...data.Meal_types])  // #5 used spread operator to recreate the memory 
    }

    // console.log(mealList);
    useEffect(() => {
        getMenuListFromServer(); // #3
    }, []); // when we use empty array in useEffect() , it'll only run once on page load
            // useEffect runs when there is change in state in component.
    return (
    <>
        {/* #2 */}
        <div className="container">
        <div className="row pt-2 heading1">
            <div className="col-12">Quick Searches</div>
        </div>
        <div className="row pt-1 heading2">
            <div className="col-12">Discover restaurants by type of meal</div>
        </div>
        {/* all the six cards */}
        <div className="row row-cols-lg-3 row-cols-md-3 row-cols-sm-1 row-cols-1 all-cards">
            {
            mealList.map((meal, index) => {
                return (
                <div key={meal._id} className="col-4 cards" onClick={()=> navigate("/quick-search/"+meal.meal_type)}>
                    <div className=" col-12 ">
                        <div className="row g-0">
                            <div className="col-4">
                              <img src={'./images/'+ meal.image} className="img-fluid " alt="..." />
                            </div>
                            <div className=" col-8">
                                <div className="card-body">
                                <h5 className="card-title">{meal.name}</h5>
                                <p className="card-text">{meal.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    )
                })
            }
            
        </div>
    </div>
    </>
    )
}

export default MealTypes;