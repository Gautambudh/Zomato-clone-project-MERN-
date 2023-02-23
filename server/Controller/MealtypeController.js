const MealtypeModel = require('../Model/MealtypesModel');

module.exports.getMealtypeList = async (req, res) =>{
    let result = await MealtypeModel.find();
    res.send({
        status:true,
        Meal_types: result
    })
}