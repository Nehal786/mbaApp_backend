const {released, unreleased, blocked} = require("../utils/constants");




function  validateMovieReqBody(req,res,next) {
    if(!req.body.name) {
        return res.status(400).send({
            msg :" Name field is missing in movie creation",
        });
    }

    if(!req.body.releaseDate) {
        return res.status(400).send({
            msg :" Release Date field is missing in movie creation",
        });
    }

    const defaultRelaseStatus = [released, unreleased, blocked];
    const tempStatus = defaultRelaseStatus.includes(req.body.releaseStatus);
    console.log('releaseStatus', tempStatus);
    if(!tempStatus){
        return res.status(400).send({
            msg: 'releaseStaus should be UNRELEASED/RELEASED/BLOCKED.'
        })
    }

        //Validate the director
        if (!req.body.director) {
            return res.status(400).send({
                message: "Failed! Movie director is not provided !"
            });
    
        }

    next();

}




module.exports = {
    validateMovieReqBody
    
    
}