import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Skeleton } from '@mui/material';
import axios from "axios";

function MealTypes() {
    // instance of navigate
    let navigate = useNavigate();
    let [mealList, setMealList] = useState([]); // #1
    const [loading, setLoading] = useState(true);

    const getMenuListFromServer = async () => {
        try {
          const url = "https://developer-gautam-zomato-clone.onrender.com/api/get-Mealtype-list";
          const { data } = await axios.get(url); //#4
          setMealList([...data.Meal_types]); // #5 used spread operator to recreate the memory
          setLoading(false); // once the data is loaded in array, loading will be false and cards will render
        } catch (error) {
          console.error("Error fetching meal types:", error);
          setLoading(false); // Set loading to false in case of error as well
        }
      };

    console.log(mealList);
    useEffect(() => {
        getMenuListFromServer(); // #3
    }, []);  // when we use empty array in useEffect() , it'll only run once on page load
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
            {loading ? 
                (
                // Showing skeleton or loading indicator while data is being fetched
                [1,2,3,4,5,6].map((val, ind) => {
                    return (
                    <div key={ind} className="col-4 cards">
                        <div className=" col-12 ">
                        <div className="row g-0">
                            <div className="col-4">
                            <Skeleton variant="rectangular" width={120} height={160} />
                            </div>
                            <div className=" col-8">
                            <div className="card-body">
                            <Skeleton variant="text" className="card-title" width={70} sx={{ fontSize: '1.5rem' }} />
                            <Skeleton variant="text" className="card-text" sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="text" className="card-text" sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="text" className="card-text" sx={{ fontSize: '1rem' }} />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                )
                })
                ) 
                :
                (mealList.map((meal, index) => {
                return (
                    <>
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
                    </>
                )}
                ))
            }
        </div>
    </div>
    </>
    )
}

export default MealTypes;