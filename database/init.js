const mongoose = require('mongoose');
//mongoose is ODM (object modelling)
module.exports=function(){
    mongoose.connect('mongodb+srv://app:app123456@cluster0.cu8s4io.mongodb.net/supercoder?retryWrites=true&w=majority')
    .then(function(){
        console.log("DB Connected")
    })
    .catch(function(){
        console.log("DB Connection Failed")
    })
}