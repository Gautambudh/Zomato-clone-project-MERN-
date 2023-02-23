import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react'
import FilterOptions from "./FilterOptons";
import Header from "./Header";
import RestaurantList from "./RestaurantList";
import axios from "axios";

function QuickSearch() {
    let { meal_id } = useParams();
    let [ locationList, setLocationList] = useState([]);
    let [ restaurantList, setRestaurantList] = useState([]);
    let [ filterData, setFilterData] = useState({
        mealtype: meal_id
    });

    let getLocationListFromServer = async () => {
        let url = "http://localhost:5003/api/get-Location-list";
        let { data } = await axios.get(url);
        // console.log(data);
        setLocationList([...data.Location])
    }

    let filter = async () => {
        let url = "http://localhost:5003/api/filter";
        
        let { data } = await axios.post(url, filterData);
        // console.log(data);
        setRestaurantList([...data.Rest])
    }
    let getFilterResult = ((event, type) => {
        let value = event.target.value;
        let _filterData = { ...filterData };
        switch (type) {
            case "sort":
                // sorting code
                _filterData["sort"] = value
                break;
            case "CostForTwo":
                // costfortwo code
                value = value.split("-")
                _filterData["l_cost"] = Number(value[0])
                _filterData["h_cost"] = Number(value[1]) 
                break;
            default:
                break;
        }
        setFilterData(_filterData)
    })
    useEffect(() => {
        getLocationListFromServer();
        filter();
    }, [])
    useEffect(() => {
        filter();
    }, [filterData])
    return ( 
        <>
        <Header />
        <main className="container-fluid">
            <section className="row mt-5">
                <div className="col-12 col-lg-10 m-auto">
                <h1 className="fs-xs-6">Breakfast Places in Mumbai</h1>
                <div className="row gap-lg-3">
                <FilterOptions locationList={locationList} 
                getFilterResult={getFilterResult}/>
                <RestaurantList restaurantList={restaurantList}/>
                </div>
                </div>
            </section>
        </main>
        </>
    )
}
export default QuickSearch;

/**
 * we click radio/check,select inputs
 * getFilterResult (event,type) get triggered
 * value of input is access
 * we create a local filter data variable , to avoid the issue if reference;
 * as per the switch operation filterData is update
 * useFilterData() is triggered to update the  filterData state
 * as soon as filterData updates a useEffect() having filterData dependance get call
 * in useEffect() we have filter method , it get call
 * and the filter API is trigger
 * and on response restaurant list is updated
 */