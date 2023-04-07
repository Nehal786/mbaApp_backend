const Theatre = require("../models/theater.model");
const Movie = require("../models/movie.models");



async function getAllTheatres(req,res) {
    let reqObject = {};
    if(req.query.name){
        reqObject.name = req.query.name;
    }

    if(req.query.city){
        reqObject.city = req.query.city;
    }

    if(req.query.pincode){
        reqObject.pincode = req.query.pincode;
    }
    let theatres = await Theatre.find(reqObject);

    if(req.query.movieId) {
        theatres = theatres.filter(theatre => theatre.movies.includes(req.query.movieId));
    }

    res.send(theatres);
}


async function getTheatreBasedOnId(req, res){

    const result = await Theatre.find({
        _id: req.params.id
    });

    res.send(result);
}


async function createTheatre(req,res){
    const theatreObject = {
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        pincode: req.body.pincode

    }

    const theatre = await Theatre.create(theatreObject);
    res.status(201).send(theatre);
}


async function updateTheatre(req,res) {

    let savedTheatre = await Theatre.findOne({
        _id: req.params.id
    })

    if(!savedTheatre) {
        return res.status(400).send({
            msg:`Theatre Id ${req.params.id} does not exist`
        })
    }

    savedTheatre.name = req.body.name ? req.body.name: savedTheatre.name; 
    savedTheatre.description = req.body.description ?  req.body.description : savedTheatre.description; 
    savedTheatre.city = req.body.city ?  req.body.city : savedTheatre.city; 
    savedTheatre.pincode = req.body.pincode ?  req.body.pincode : savedTheatre.pincode; 
    
    const updateTheatre = await  savedTheatre.save();
    res.send(updateTheatre);

}


async function deleteTheatre(req,res) {
   try{
    await Theatre.deleteOne({
        _id:req.params.id
    })
    res.send({
        msg : `Theatre Id ${req.params.id} got deleted`
    })


   } catch(error) {
    return res.status(500).send({
        msg : "Internel server error"
    })

   }
}

async function updateMoviesInTheatre(req,res) {
    const savedTheatre = await Theatre.findOne({
        _id : req.params.id
    });

    if(!savedTheatre) {
        return res.status(400).send({
            msg:`This movie ${req.params.id} does not exist in db`
        });
    }

    let movies = req.body.movieIds;

    if(req.body.insert) {

        //add movies in DB...
        movies.forEach(movieId => {
            savedTheatre.movies.push(movieId);
        })

    } else {
        movies.forEach(movieId => {
            savedTheatre.movies = savedTheatre.movies.filter(elem => elem != movieId)
        });

    }

    const updatedTheatre = await savedTheatre.save();
    return res.send(updatedTheatre);


}


async function checkMovieInTheatre(req,res) {
    const theatre = await Theatre.findOne({

        _id : req.params.theatreId

    })
     
    const movie = await Movie.findOne({
        _id : req.params.movieId
    });
     
    let response ={
        msg : ""
    }

    if(theatre.movies.includes(movie._id)) {
        response.msg = 'Movie is running';
    } else {
        response.msg = "Movie is not running";
    }

    res.send(response);
   
    

     
    
}

module.exports = {
    getAllTheatres,
     getTheatreBasedOnId,
    createTheatre,
    updateTheatre,
    deleteTheatre,
    updateMoviesInTheatre,
    checkMovieInTheatre
}