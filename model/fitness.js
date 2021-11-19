const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const workoutSchema = new Schema ({
    day: {
        type:Date,
        default:Date.now,
    },
    exercises: [
        {
            type:{
                type:String,
                trim:true,
                required:'enter exercise',
            },
            name:{
                type:String,
                trim:true,
                required:'name of exercise',
            },
            weight:{
                type:Number,
            },
            duration:{
                type:Number,
            },
            sets:{
                type:Number,
            },
            reps:{
                type:Number,
            },
            distance:{
                type:Number,
            },
        },
    ],
});
const workout = mongoose.model('workout',workoutSchema);
module.exports = workout;