const MenuItemsModel = require('../Model/MenuItemsModel');

module.exports.getMenuItemsbyRestID = async (req, res) => {
    let { rest_id } = req.params;
    try{
        let result = await MenuItemsModel.find({restaurantId: rest_id});
        console.log(result);
        res.send({
        status: true,
        Menu_items: result
    })
    } catch(error) {
        res.status(500).send({
            status: false,
            message: "invalid id is passed",
            error: error.message
        })
    }
    
}