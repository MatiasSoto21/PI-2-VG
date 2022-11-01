import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterGenre, getGenres } from '../Actions'

const Filtergenre = () => {
    const genres = useSelector(state => state.genres)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch])

    function handleChange(e){
        dispatch(filterGenre(e.target.value))
    }
  return (
    <div> Filter by Genre
        <select onChange={e => handleChange(e)}>
            <option value="ALL">All</option>
            {genres?.map(e => 
            <option key={e.id} value={e.name}>{e.name}</option>)}
        </select>
    </div>
  )
}

export default Filtergenre