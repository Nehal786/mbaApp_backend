const { getAllmovies,getMovieBasedOnId, createMovie, updateMovie, deleteMovie } = require("../controllers/movie.controller");
const {validateMovieReqBody,verifyToken, isAdmin }= require("../middleware/index");



module.exports = (app) => {
    app.get("/mba/api/v1/movies",verifyToken ,getAllmovies)
    app.get("/mba/api/v1/movie/:id",verifyToken ,getMovieBasedOnId)
    app.post("/mba/api/v1/movie/",[verifyToken ,isAdmin ,validateMovieReqBody], createMovie);
    app.put("/mba/api/v1/movie/:id",[verifyToken ,isAdmin ,validateMovieReqBody],updateMovie);
    app.delete("/mba/api/v1/movie/:id",[verifyToken,isAdmin],deleteMovie);
}