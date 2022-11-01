import { GET_VIDEOGAMES, SEARCH, FILTER_GENRE, GET_GENRES, FILTER_CREATE, GET_DETAIL, ORDER_RATING, ORDER_NAME, CLEAN } from "../Actions";

const initialState = {
    videogames: [],
    allVg: [],
    genres: [],
    detail: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_RATING:
            const orderRating = action.payload === 'menos' ? state.videogames.sort(function (a, b) {
                if (a.rating > b.rating) return 1;
                if (b.rating > a.rating) return -1;
                return 0;
            }) :
                state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) return -1;
                    if (b.rating > a.rating) return 1;
                    return 0;
                })
                console.log("rating", orderRating);
            return {
                ...state,
                videogames: orderRating
            }
        case ORDER_NAME:
            const orderByName = action.payload === 'a-z' ? state.videogames.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
                return 0;
            }) :
                state.videogames.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
                    return 0;
                })
            return {
                ...state,
                videogames: orderByName
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                allVg: action.payload
            }
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }    
        case SEARCH:
            return {
                ...state,
                videogames: action.payload
            }
        case FILTER_GENRE:
            const filter = action.payload === "ALL"? state.allVg :
            state.allVg.filter(e => e.genres.find(e => e.name === action.payload))
            return {
                ...state,
                videogames: filter
            }
        case FILTER_CREATE:
            const filterCreate = action.payload === "Api"? state.allVg.filter(e => !e.createdInDb) :
            state.allVg.filter(e => e.createdInDb)
            return {
                ...state,
                videogames: action.payload === "All"? state.allVg : filterCreate
            }
        case CLEAN:
            return {
                ...state,
                detail: []
            }    
        default:
            return state;
    }
}

export default rootReducer;