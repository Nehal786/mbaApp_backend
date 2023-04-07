const { signUp, signIn } = require("../controllers/auth.controllers");
const { validateUsersReqBody } = require("../middleware/validateUsersReqBody");

module.exports = (app) => {
    app.post("/mba/api/v1/signUp", validateUsersReqBody, signUp);
    app.post("/mba/api/v1/signIn",signIn);
}