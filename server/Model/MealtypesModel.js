const { Schema, model } = require('mongoose')

const MealtypeSchema = new Schema({
    name: { type: String },
    content: { type: String },
    image: { type: String },
    meal_type: { type: Number }
});
 const MealtypeModel = model('Mealtype', MealtypeSchema);

 module.exports = MealtypeModel;
