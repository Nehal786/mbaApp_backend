const ObjectId = require('mongoose').Types.ObjectId
const Theatre = require("../models/theater.model")


async function validateBookingReqBody(req,res,next) {

    if(!req.body.theatreId) {
        return res.status(400).send({
            msg:"Theatre Id is required"
        })
    }

    if(!ObjectId.isValid(req.body.theatreId)) {
        return res.status(400).send({
            msg:"Theatre id is not in correct format"
        })
    }

    const theater = await Theatre.findOne({
        _id : req.body.theatreId
    })
    if(!theater) {
        return res.status(400).send({
            msg:"This theatre does not exists in DB.."
        })
    }


    if(!req.body.movieId) {
        return res.status(400).send({
            msg:"Movie Id is required"
        })
    }

    if(!ObjectId.isValid(req.body.movieId)) {
        return res.status(400).send({
            msg:"Movie id is not in correct format"
        })
    }

   if(!theater.movies.includes(req.body.movieId)) {
    return res.status(400).send({
        msg:`This movie ${req.body.movieId} is not there in this theatre ${req.body.theatreId}`
    })
   }

   if(!req.body.timing){
    return res.status(400).send({
        msg:"Timing is required"
    })
   }

   if(!req.body.noOfSeats) {
    return res.status(400).send({
        msg:"No of seats is required"
    })
   }

   next();
}


module.exports = {
    validateBookingReqBody
}