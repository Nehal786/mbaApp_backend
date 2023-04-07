const jwt = require("jsonwebtoken");
const User = require("../models/users.models");


async function verifyToken(req,res,next) {
    try{

        const userToken = req.headers['x-access-token'];
    if(!userToken) {
        return res.status(400).send({
            msg:'Please provide token to proceed'

        })
    }
    const decoded = await jwt.verify(userToken,'heyeyehehyhhyh');
    if(!decoded){
        return res.status(400).send({
            msg:'Invalid token'

        })

    }
    //req.userId = decoded.id;
    req._id= decoded.id;
    next();

    } catch(error) {
        return res.status(400).send({
            msg : 'Token is not correct',
            error
        })

    }
}


async function isAdmin(req, res, next){
    //const id = req._id;
    const id = req._id;

    const user = await User.findOne({
        _id:id
    })
    console.log('user', user);
    if(!user){
        return res.send({
            msg:"no user found"
        })
    }
    if(user && user.userType !=='ADMIN'){
        return res.status(400).send({
            msg :"Only Admin allowed to do this operation"
        })
    }

    next();
}


module.exports ={
    verifyToken,
    isAdmin
}