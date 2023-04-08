const { getAllTheatres,getTheatreBasedOnId, createTheatre, updateTheatre, deleteTheatre,updateMoviesInTheatre, checkMovieInTheatre } = require("../controllers/theatre.controller");
const {validateTheatreReqBody } = require("../middleware/verifyTheatreReqBody");
const { verifyToken , isAdmin} = require("../middleware");




module.exports = (app) => {
    app.get("/mba/api/v1/theatres",verifyToken ,getAllTheatres)
     app.get("/mba/api/v1/theatre/:id",verifyToken ,getTheatreBasedOnId)
    app.post("/mba/api/v1/theatre/", [verifyToken , isAdmin,validateTheatreReqBody ], createTheatre);
    app.put("/mba/api/v1/theatre/:id",[verifyToken ,isAdmin,validateTheatreReqBody],updateTheatre);
    app.delete("/mba/api/v1/theatre/:id",[verifyToken, isAdmin] ,deleteTheatre);
    app.put("/mba/api/v1/theatre/:id/movies",[verifyToken , isAdmin],updateMoviesInTheatre);
    app.get('/mba/api/v1/theatres/:theatreId/movies/:movieId', verifyToken ,checkMovieInTheatre);
}