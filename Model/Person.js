const mongoose = require('mongoose');

const person=new mongoose.Schema({
    name:{ 
        type:String,
        required:true},
    age: {
        type:Number,
        required:true
    },
    work: {
        type:String,
        required:true
    },
    country:{
        type:String,
        enum:["India","USA","UK","Germany"],
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:false,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
});
const Person=mongoose.model("Person",person);
module.exports=Person;