const { ticketCost } = require("../utils/constants");
const Booking = require("../models/booking.model");

async function createBooking(req,res) {

    const tempBooking = {
        theatreId : req.body.theatreId,
        movieId : req.body.movieId,
        userId : req._id,
        timing : req.body.timing,
        noOfSeats: req.body.noOfSeats,
        totalCost : req.body.noOfSeats * ticketCost
    }
    try {

        const bookingData = await Booking.create(tempBooking);
        
            return res.status(201).send({
                msg:"Booking created successfully",
                bookingData
            })
        

    } catch(error) {
        return res.status(500).send({
            msg:"Booking creation Failed",
            error
        })

    }

}

module.exports = {
    createBooking
}