const alarmModel = require("../database/models/alarm");    

module.exports = async function(req,res){
    try{
        console.log("Delete alarm controller");
        // console.log(req.body);
        console.log(JSON.parse(JSON.stringify(req.body.delete)));
        let alarm = JSON.parse(req.body.delete);
        console.log("Deleting this",alarm);
        
        await alarmModel.deleteOne({ _id:alarm });
        res.redirect("/");
    }catch(err){
        console.log("error in Delete alarm controller",err);
    }
}