const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: String,
    year:Number,
    price: Number,
    owner : { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ,//One
    //owners : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] //Many

});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;