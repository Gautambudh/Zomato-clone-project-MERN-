const { response } = require('express');
const RestaurantModel = require('../Model/RestaurantModel')

module.exports.getRestaurantListbyLocid = async (req, res) => {
    let { loc_id } = req.params;
    let result = await RestaurantModel.find({location_id: loc_id},
        {locality:1, name:1, city:1, image:1});

        if(result.length == 0){
            res.send({
                status : false,
                message : "restaurant not found"
            })
        }else{

    // To get data from URL => we have object params
    // var {cityName} = req.params;

    // Searching all restaurants by cityName :
    // var searchResult = RestaurantList.filter((restaurant) => {
        // return restaurant.city_name.toLowerCase() == cityName.toLowerCase()
    // })
    res.send({
        status : true,
        Rest : result
    })}
}

module.exports.getRestaurantDetailsbyID = async (req, res) => {
    let { id } = req.params;
    try{
        let result = await RestaurantModel.findById(id);
    res.send({
        status: true,
        restaurants: result
    })
    } catch(error) {
        res.status(500).send({
            status: false,
            message: "invalid id is passed",
            error: error.message
        })
    }
    
};

module.exports.filter = async (req, res) => {

    // filter operations 
    // mealType (mendatory) 
    // location 
    // cuisines 
    // cost for two (500 (low_cost) to 1000 (high_cost)) 
    // sort (asc to desc) 
    // page 1, 2, 3, 4 (2 restaurant per page)

    let { mealtype, location, l_cost, h_cost, sort, page, cuisine } = req.body;
    // high to low (desc) and low to high (asc)

    sort = sort ? sort: 1;

    page = page ? page: 1;  // when user selects the Page no., then that will be the Page no., otherwise by default: 1

    const itemsPerPage = 2; // By default there will be only 2 restaurants items per page at a time

    // =======================================================================================
                            // pagignation Logic
    // ======================================================================================= //
                            //  ↓↓↓↓↓↓
                            
    let PageStart = itemsPerPage * page - itemsPerPage; 
    //     ↓↓↓          ↓↓↓         ↓↓↓       ↓↓↓        // let say user selects page no. 3 => page = 3
    // restArrIndex = {  2     x     3   -     2 } = 4   // hence page-1 = restArr[0, 1]
                                                         // hence page-2 = restArr[1, 2]
                                                         // hence page-3 = restArr[3, 4]


    let PageEnd = itemsPerPage * page;
    //     ↓↓↓         ↓↓↓        ↓↓↓ 
    // restArrIndex = {  2     x   3   =  6 } 

    const filteredData = { };

    if (mealtype !== undefined) filteredData['mealtype_id'] = mealtype;
    if (location !== undefined) filteredData['location_id'] = location;
    if (l_cost !== undefined && h_cost !== undefined) filteredData['min_price'] = { $gt: l_cost, $lt: h_cost};
    if (cuisine !== undefined) filteredData['cuisine_id'] = { $in: cuisine};

    console.log(filteredData);

    let result = await RestaurantModel.find(filteredData,
        {name: 1,
        city: 1,
        locality: 1,
        location_id: 1,
        min_price: 1,
        image: 1,
        cuisine_id: 1,
        cuisine:1
    }).sort({
        min_price: sort
    });
    // high to low (desc) sort=> -1
    // low to high (asc)  sort=> 1

        if(result.length == 0){
            res.send({
                status : false,
                message : "restaurant not found"
            })
        }else {
    res.send({
        status : true,
        // Rest : result
        Rest : result.slice(PageStart, PageEnd)
    })}
}
    
