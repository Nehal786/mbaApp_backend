const {validateMovieReqBody } = require("./verifyMovieReqBody");
const { verifyToken,isAdmin } = require("./auth");
const {validateUsersReqBody, validateUsersProfile } = require("./validateUsersReqBody");
const { validateTheatreReqBody } = require("./verifyTheatreReqBody")


module.exports ={
    validateMovieReqBody,
    verifyToken,
    isAdmin,
    validateUsersReqBody,
    validateUsersProfile,
    validateTheatreReqBody
    
}