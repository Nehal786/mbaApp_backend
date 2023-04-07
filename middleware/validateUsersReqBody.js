const User = require("../models/users.models");
const { userType, userStatus } = require("../utils/constants");


async function validateUsersReqBody(req,res,next) {

    if(!req.body.name) {
        return res.status(400).send({
            msg:"Name is required"
        })
    }


    if(!req.body.userId) {
        return res.status(400).send({
            msg:"UserId required"
        })

    }
    const user = await User.findOne({
        userId:req.body.userId
    })
    
    if(user){
        return res.status(400).send({
            msg:"Failed!! user already exists"
        })
    }



    if(!req.body.email) {
        return res.status(400).send({
            msg:"Email required"
        })

    }
    const userEmail = await User.findOne({
        email:req.body.email
    })
    
    if(userEmail){
        return res.status(400).send({
            msg:"Failed!! Email Id  already exists"
        })
    }

    if(!isValidEmail(req.body.email)) {
        return res.status(400).send({
            msg:"Please provide Email in correct format!!"
        })
    }

    const existUserType = [userType.ADMIN, userType.CLIENT, userType.CUSTOMER];
    const requestUserType = req.body.userType;

    if(requestUserType && !existUserType.includes(requestUserType)) {
        return res.status(400).send({
            msg:" Please give usertype among CUSTOMER/CLIENT/ADMIN only"
        })
    }

    next();

}


async function validateUsersProfile(req,res,next) {

    if(!req.body.name) {
        return res.status(400).send({
            msg:"Name is required"
        })
    }



    const existUserType = [userType.ADMIN, userType.CLIENT, userType.CUSTOMER];
    const requestUserType = req.body.userType;

    if(requestUserType && !existUserType.includes(requestUserType)) {
        return res.status(400).send({
            msg:" Please give usertype among CUSTOMER/CLIENT/ADMIN only"
        })
    }


    
    const existUserStatus = [userStatus.APPROVED, userStatus.PENDING, userStatus.REJECTED];
    const requestUserStatus = req.body.userStatus;

    if(requestUserStatus && !existUserStatus.includes(requestUserStatus)) {
        return res.status(400).send({
            msg:" Please give userStatus  among APPROVED/PENDING/REJECTED only"
        })
    }

    next();

}

const isValidEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

module.exports = {
    validateUsersReqBody,
    validateUsersProfile
}