// const bookingController = require("../controller/booking.controller");
// const { validateBookingReqBody, verifyToken, isAdmin } = require("../middleware");
const bookingController = require("../controllers/booking.controller");
const { verifyToken } = require("../middleware");
const {  validateBookingReqBody} = require("../middleware/validateBookingReqBody");



/**
 * Routes for the booking resource
 */

module.exports = function (app) {
    //app.get("/mba/api/v1/bookings", bookingController.getAllBookings); 
    //app.get("/mba/api/v1/bookings/:id", bookingController.getBookingOnId);  
    app.post("/mba/api/v1/bookings",[verifyToken ,validateBookingReqBody ],bookingController.createBooking);
    //app.put("/mba/api/v1/bookings/:id", bookingController.updateBooking);
}