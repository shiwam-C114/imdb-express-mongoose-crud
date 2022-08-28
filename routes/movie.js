const { Router } = require('express');
const Movie = require('../models/movie');
const movies = require('../config/movies.json')

const router  = Router()
router.get("/Movies", async(req, res)=>{
    try {
        const page = parseInt(req.query.page) - 1 || 0
        const limit = parseInt(req.query.limit) || 5
        const search = req.query.q || ""
        const sort = req.query.sort || "rating"

        console.log(search,"---search")
        const sortBy = {}
        if (sort[1]) {
            sortBy[sort[0]] = sort[1]
        } else {
            sortBy[sort[0]] = 'asc'
        }

    const movies = await Movie.find({name:{$regex:search,$options:"i"}})
    // .sort(sortBy)
    .skip(page * limit)
    .limit(limit)

    const response = {
        error:false,
        page: page+1,
        limit,
        movies
    }

    res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).send({error:true,msg:"Internal server error"})
    }
})

// async function insertMovies() {
//     try {
//         const docs = await Movie.insertMany(movies);
//         return Promise.resolve(docs)
//     } catch (error) {
//         return Promise.reject(error)
//     }
// }

// insertMovies()
// .then((docs)=>console.log(docs))
// .catch((err)=>console.log(err))

module.exports = router