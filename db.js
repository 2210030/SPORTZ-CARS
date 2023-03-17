const mongoose = require("mongoose");

function connectDB(){

    mongoose.connect('mongodb+srv://mamathamacharla:loveandthunder@cluster0.r2d8y1v.mongodb.net/test' , {useUnifiedTopology: true , useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose