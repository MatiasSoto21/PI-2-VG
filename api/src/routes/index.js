const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Videogame, Genre } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getApi = async () => {
    const apiEnd1 = await axios('https://api.rawg.io/api/games?key=89a3b3967af54b76bc542c6aebfbb99b&page=1&page_size=40');
    const apiEnd2 = await axios('https://api.rawg.io/api/games?key=89a3b3967af54b76bc542c6aebfbb99b&page=2&page_size=40');
    const apiEnd3 = await axios('https://api.rawg.io/api/games?key=89a3b3967af54b76bc542c6aebfbb99b&page=5&page_size=20');

    apiGames = apiEnd1.data.results.concat(apiEnd2.data.results, apiEnd3.data.results,);
 
    apiGames = apiGames.map (e  => {
        return {
            id: e.id,
            name: e.name,
            image: e.background_image,
            genres: e.genres.map(e => {return {name : e.name}}),
            platforms: e.platforms.map(e => e.platform.name),
            rating: e.rating,
            released: e.released,
        }
    })
    return apiGames
}
    
 

const getDb = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
};

const getVideogames = async () => {
    const api = await getApi();
    const db = await getDb();
    const all = api.concat(db);
    return all;
}

router.get('/videogames', async (req, res) => {
    const {name} = req.query
    let info = await getVideogames();
    if(name) {
        let videogames = info.filter(e => e.name.toLowerCase().includes(name.toLowerCase())).slice(0,15)
        videogames.length > 0 ? 
        res.status(200).send(videogames) :
        res.status(404).send('Juego no Encontrado')
    } else {
        res.send(info)
    }
})

router.get('/videogame/:id', async (req, res) => {
    const {id} = req.params
    if (id.length < 10) {
        const info = await axios(`https://api.rawg.io/api/games/${id}?key=89a3b3967af54b76bc542c6aebfbb99b`)
        const vg = {
            id: info.data.id,
            name: info.data.name,
            image: info.data.background_image,
            genres: info.data.genres.map(e => e.name),
            platforms: info.data.platforms.map(e => e.platform.name),
            rating: info.data.rating,
            released: info.data.released,
            description: info.data.description_raw
        }
        res.send(vg)
    }
    if (id.length > 10) {
        const detail = await getDb();
        let videogame = detail.filter(e => e.id == id);
        videogame.length > 0? 
        res.status(200).json(videogame[0]) :
        res.status(400).send('Id do not match')
    }
})

router.post('/videogames', async (req, res) => {
    const {name, image, description, released, rating, genres, createdInDb, platforms} = req.body
    if(!name || !description || !released || !rating || !genres || !platforms) res.send('Completar campos')
    let newVg = await Videogame.create({
        name,
        image,
        description,
        released,
        rating,
        createdInDb,
        platforms
    })
    let genreDb = await Genre.findAll({
        where: { name : genres}
    })
    newVg.addGenre(genreDb)
    res.send('Vg Created')
})

router.get('/genres', async (req, res) => {
    const info = await axios('https://api.rawg.io/api/genres?key=89a3b3967af54b76bc542c6aebfbb99b')
    const genres = info.data.results.map(e => e.name)
    genres.forEach(e => {
        Genre.findOrCreate({
            where: {name : e}
        })
    })
    const allGenres = await Genre.findAll();
    res.send(allGenres)
})

router.get('/platforms', async (req, res) => {
    let info = await getVideogames();
    let array = info.map(e => e.platforms).flat(Infinity)
    let platforms = new Set(array)
    let result = [...platforms]
    res.send(result)
})


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
