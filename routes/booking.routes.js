// const bookingController = require("../controller/booking.controller");
// const { validateBookingReqBody, verifyToken, isAdmin } = require("../middleware");
const bookingController = require("../controllers/booking.controller");
const { verifyToken, isAdmin} = require("../middleware");
const {  validateBookingReqBody} = require("../middleware/validateBookingReqBody");



/**
 * Routes for the booking resource
 */

module.exports = function (app) {
    app.get("/mba/api/v1/bookings",verifyToken ,bookingController.getAllBookings); 
    app.get("/mba/api/v1/bookings/:id", verifyToken,bookingController.getBookingOnId);  
    app.post("/mba/api/v1/bookings",[verifyToken ,validateBookingReqBody ],bookingController.createBooking);
    app.put("/mba/api/v1/bookings/:id", [verifyToken, isAdmin],bookingController.updateBooking);
}