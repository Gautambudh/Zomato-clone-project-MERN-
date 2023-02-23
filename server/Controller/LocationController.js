const LocationsModel = require('../Model/LocationsModel');


module.exports.Welcome = (req, res) => {
    res.send("Welcome To API");
}

module.exports.getLoctaion = async (req, res) => {
    let result = await LocationsModel.find({"city_id": 1});
    res.send({
        status : true,
        Location : result
    })
}