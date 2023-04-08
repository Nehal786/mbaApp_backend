const paymentController = require("../controllers/payment.controller");

const {verifyToken} = require("../middleware/auth")
const { validatePaymentReqBody } = require("../middleware/validatePaymentReqBody");



module.exports = function (app) {
    app.get("/mba/api/v1/payments", [verifyToken], paymentController.getAllPayments); 
    app.get("/mba/api/v1/payments/:id", [verifyToken], paymentController.getPaymentOnId);  
    app.post("/mba/api/v1/payments", [verifyToken, validatePaymentReqBody], paymentController.createPayment);
    
}