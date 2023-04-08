const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const Movie = require("./models/movie.models");
const Theatre = require("./models/theater.model");
const User = require("./models/users.models");



const bodyParser = require("body-parser");

const { PORT } = require("./configs/server.configs");
const {DB_URL, DB_PROD_URL} = require("./configs/db.config");

let connectionString = DB_PROD_URL;

if(process.env.NODE_ENV !== 'production'){
    connectionString = DB_URL;
}


//Using the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async ()=> {
    try{    
        await mongoose.connect(connectionString);
        console.log('db connected');
        //await init();
        //await initt();
    }
    catch(err){
        console.error('error getting while connecting mongoDB', err);
    }

})()



async function init(){
    try{
        await Movie.collection.drop();
    const movie1 = await Movie.create({
        name: "Bachhan Pandey",
        description: "Comedy Masala Movie",
        casts: ["Akshay Kumar", "Jacqueline Fernandiz"],
        director: "Farhad Samji",
        trailerUrl: "http://bacchanpandey/trailers/1",
        posterUrl: "http://bacchanpandey/posters/1",
        language: "Hindi",
        releaseDate: "18-03-2022",
        releaseSatus: "RELEASED"
    });
    
    const movie2 = await Movie.create({
        name: "Jalsa",
        description: "Intense Drama Movie",
        casts: ["Vidya Balan", "Shefali Shah"],
        director: "Suresh Triveni",
        trailerUrl: "http://jalsa/trailers/1",
        posterUrl: "http://jalsa/posters/1",
        language: "Hindi",
        releaseDate: "18-03-2022",
        releaseSatus: "RELEASED"
    });
    const movie3 = await Movie.create({
        name: "Jhund",
        description: "Comedy Drama Movie",
        casts: ["Amitabh Bachchan", "Abhinay Raj"],
        director: "Nagraj Manjule",
        trailerUrl: "http://jhund/trailers/1",
        posterUrl: "http://jhund/posters/1",
        language: "Hindi",
        releaseDate: "04-03-2022",
        releaseSatus: "RELEASED"
    });
    const movie4 = await Movie.create({
        name: "Radhe Shyam",
        description: "Comedy Drama Movie",
        casts: ["Prabhas", "Pooja Hegde"],
        director: "Radha Krishna Kumar",
        trailerUrl: "http://RadheShyam/trailers/1",
        posterUrl: "http://RadheShyam/posters/1",
        language: "Hindi",
        releaseDate: "11-03-2022",
        releaseSatus: "RELEASED"
    });
    const movie5 = await Movie.create({
        name: "The Kashmir Files",
        description: "Intense Movie",
        casts: ["Mithun Chakraborty", "Anupam Kher"],
        director: "Vivek Agnihotri",
        trailerUrl: "http://TheKashmirFiles/trailers/1",
        posterUrl: "http://TheKashmirFiles/posters/1",
        language: "Hindi",
        releaseDate: "11-03-2022",
        releaseSatus: "RELEASED"
    });
    console.log("Movies inserted in the db");


    await Theatre.collection.drop();
await Theatre.create({
    name:"Fun Cinemas",
    city :"Bangalore",
    description:"Top class Theatre",
    pincode:34567,
    movies:[movie1._id, movie2._id]
});

await Theatre.create({
    name:"PVR Cinemas",
    city :"Bangalore",
    description:"awsm class Theatre",
    pincode:34565,
    movies: [movie3._id, movie4._id]
});

await Theatre.create({
    name:"Nehal Cinemas",
    city :"Bangalore",
    description:"Top class Theatre",
    pincode:34567,
    movies: [movie1._id,movie5._id]
});

await Theatre.create({
    name:"Saddam Cinemas",
    city :"Bangalore",
    description:"Top class Theatre",
    pincode:34567,
    movies: [movie2._id,movie5._id]
});

await Theatre.create({
    name:"IONEX Cinemas",
    city :"Bangalore",
    description:"Top class Theatre",
    pincode:34567,
    movies: [movie4._id,movie5._id]
});
await User.collection.drop();
await User.create({
    name:"admin",
    email:"admin@gmail.com",
    password:bcrypt.hashSync("welcome",8),
    userId:"admin",
    userType:"ADMIN"
})
console.log("Admin user has been created");
}
catch(err){
    console.log('error while inserting default entries in DB', err);
}
}

//  async function initt() {

//     try{
//     await Theatre.collection.drop();
// await Theatre.create({
//     name:"Fun Cinemas",
//     city :"Bangalore",
//     description:"Top class Theatre",
//     pincode:34567,
//     movies:[movie1._id, movie2._id]
// });

// await Theatre.create({
//     name:"PVR Cinemas",
//     city :"Bangalore",
//     description:"awsm class Theatre",
//     pincode:34565,
//     movies: [movie3._id, movie4._id]
// });

// await Theatre.create({
//     name:"Nehal Cinemas",
//     city :"Bangalore",
//     description:"Top class Theatre",
//     pincode:34567,
//     movies: [movie1._id,movie5._id]
// });

// await Theatre.create({
//     name:"Saddam Cinemas",
//     city :"Bangalore",
//     description:"Top class Theatre",
//     pincode:34567,
//     movies: [movie2._id,movie5._id]
// });

// await Theatre.create({
//     name:"IONEX Cinemas",
//     city :"Bangalore",
//     description:"Top class Theatre",
//     pincode:34567,
//     movies: [movie4._id,movie5._id]
// });
// console.log("Theatre inserted in the db");
//     } catch(error) {
//         console.log(error);
//         return error;
//     }
// }



// require routes

require("./routes/auth.routes")(app);
require("./routes/movie.routes")(app);
require("./routes/theatre.routes")(app);
require("./routes/user.routes")(app);
require("./routes/booking.routes")(app);
require("./routes/payment.routes")(app);


app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})