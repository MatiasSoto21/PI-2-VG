import axios from 'axios';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const SEARCH = 'SEARCH';
export const FILTER_GENRE = 'FILTER_GENRE';
export const GET_GENRES = 'GET_GENRES';
export const FILTER_CREATE = 'FILTER_CREATE';
export const GET_DETAIL = 'GET_DETAIL';
export const ORDER_RATING = 'ORDER_RATING';
export const ORDER_NAME = 'ORDER_NAME';
export const CLEAN = 'CLEAN';
export const GET_PLATFORMS = 'GET_PLATFORMS';

export const getPlatforms = () =>{
    return async function (dispatch) {
        return await axios("http://localhost:3001/platforms")
        .then(res => dispatch({
            type: GET_PLATFORMS,
            payload: res.data
        }))
    }
}

export const getDetail = (id) => {
    return async function(dispatch){
        return await axios(`http://localhost:3001/videogame/${id}`)
        .then(res => dispatch({
            type: GET_DETAIL,
            payload: res.data
        }))
    }
}

export const getGenres = () => {
    return async function(dispatch){
        return await axios("http://localhost:3001/genres")
        .then(res => dispatch({
            type: GET_GENRES,
            payload: res.data
        }))
    }
}

export const search = (name) => {
    return async function(dispatch){
        return await axios(`http://localhost:3001/videogames?name=${name}`)
        .then(res => dispatch({
            type: SEARCH,
            payload: res.data
        }))
    }
}

export const getVideogames = () => {
    return async function (dispatch){
        return await axios("http://localhost:3001/videogames")
        .then(res => dispatch({
            type: GET_VIDEOGAMES,
            payload: res.data
        }))
    }
}

export const filterGenre = (payload) =>{
    return {
        type: FILTER_GENRE,
        payload
    }
}

export const filterCreate = (payload) =>{
    return {
        type: FILTER_CREATE,
        payload
    }
}

export const orderRating = (payload) => {
    return {
        type: ORDER_RATING,
        payload
    }
}

export const orderName = (payload) => {
    return {
        type: ORDER_NAME,
        payload
    }
}

export const clean = (payload) => {
    return {
        type: CLEAN,
        payload
    }
}
