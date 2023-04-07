const Theatre = require("../models/theater.model");


async function validateTheatreReqBody(req,res,next) {
    if(!req.body.name) {
        return res.status(400).send({
            msg:"Please enter name "
        })
    }

    if(!req.body.description) {
        return res.status(400).send({
            msg:"Please enter description "
        })
    }

    if(!req.body.city) {
        return res.status(400).send({
            msg:"Please enter city name  "
        })

    }

    if(!req.body.pincode){
        return res.status(400).send({
            msg:"Please enter the pincode"
        })
    }

    const theatre = await Theatre.findOne({name:req.body.name, pincode: req.body.pincode});
    if(theatre != null){
        return res.status(400).send({
            msg:"Failed!! same theatre in the same location already exists"
        })
    }
    next();

}


module.exports = {
    validateTheatreReqBody
}