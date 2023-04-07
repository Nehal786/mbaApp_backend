
const { findOne } = require("../models/movie.models");
const Movie = require("../models/movie.models");

async function getAllmovies(req,res) {
    let reqObject = {};
    if(req.query.name){
        reqObject.name = req.query.name;
    }
    const result = await Movie.find(reqObject);

    res.send(result);
}


async function getMovieBasedOnId(req, res){

    const result = await Movie.find({
        _id: req.params.id
    });

    res.send(result);
}


async function createMovie(req,res){
    const movieObject = {
        name: req.body.name,
        description: req.body.description,
        casts: req.body.casts,
        director: req.body.director,
        trailerUrl: req.body.trailerUrl,
        posterUrl: req.body.posterUrl,
        language: req.body.language,
        releaseDate: req.body.releaseDate,
        releaseSatus: req.body.releaseSatus
    }

    const movie = await Movie.create(movieObject);
    res.status(201).send(movie);
}


async function updateMovie(req,res) {

    let savedMovies = await Movie.findOne({
        _id: req.params.id
    })

    if(!savedMovies) {
        return res.status(400).send({
            msg:`Movie Id ${req.params.id} does not exist`
        })
    }

    savedMovies.name = req.body.name ? req.body.name: savedMovies.name; 
    savedMovies.description = req.body.description ?  req.body.description : savedMovies.description; 
    savedMovies.casts = req.body.casts != undefined ? req.body.casts : savedMovies.casts;
    savedMovies.director = req.body.director != undefined ? req.body.director : savedMovies.director;
    savedMovies.trailerUrl = req.body.trailerUrl != undefined ? req.body.trailerUrl : savedMovies.trailerUrl;
    savedMovies.posterUrl = req.body.posterUrl != undefined ? req.body.posterUrl : savedMovies.posterUrl;
    savedMovies.language = req.body.language != undefined ? req.body.language : savedMovies.language;
    savedMovies.releaseDate = req.body.releaseDate != undefined ? req.body.releaseDate : savedMovies.releaseDate;
    savedMovies.releaseStatus = req.body.releaseStatus != undefined ? req.body.releaseStatus : savedMovies.releaseStatus;

    const updateMovie = await savedMovies.save();
    res.send(updateMovie);

}


async function deleteMovie(req,res) {
   try{
    await Movie.deleteOne({
        _id:req.params.id
    })
    res.send({
        msg : `Movie Id ${req.params.id} got deleted`
    })


   } catch(error) {
    return res.status(500).send({
        msg : "Internel server error"
    })

   }
}

module.exports = {
    getAllmovies,
    getMovieBasedOnId,
    createMovie,
    updateMovie,
    deleteMovie
}