/** An order details should have:
 * order_id:String
 * name:String
 * mobile:Number
 * email:String
 * order_list:Array
 * payment_id:String
 * payment_status:Boolean
 */

const { Schema, model } = require('mongoose');

const OrdersSchema = new Schema({
    order_id: { type: String },
    name: { type: String },
    mobile: { type: Number },
    email: { type: String },
    order_list: { type: Array },
    payment_id: { type: String },
    payment_status: { type: Boolean }
});

const OrdersModel = model('Order', OrdersSchema, 'Orders');

module.exports = OrdersModel;