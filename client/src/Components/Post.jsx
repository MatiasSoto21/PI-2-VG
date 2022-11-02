import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, getPlatforms } from '../Actions';

const Post = () => {
  const dispatch = useDispatch();
  const allGenres = useSelector(state => state.genres);
  const allPlatforms = useSelector(state => state.platforms);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch])

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    image: '',
    description: '',
    released: '',
    rating: '',
    genres: [],
    platforms: []
  });

  function validate(input) {
    let errors = {};
    if (!/^[A-Za-z]+$/.test(input.name) || input.name.length > 255) errors.name = 'Must have A-z characters and be less than 255';
    if (!input.image) errors.image = 'URL of an image(optional)';
    if (!input.description) errors.description = 'Describe your game';
    if (!input.released) errors.released = 'Select a date of release';
    if (input.rating < 0 || input.rating > 5) errors.rating = 'Rating must be 0-5';
    if (!input.genres.length) errors.genres = 'Select at least 1 genres';
    if (!input.platforms.length) errors.platforms = 'Select at least 1 platform';
    return errors;
  }

  function handleInput(e) {
    setInput({ ...input, 
      [e.target.name]: e.target.value 
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleSelect(e) {
    setInput({ ...input, [e.target.name]: !input[e.target.name].includes(e.target.value) ? input[e.target.name].concat(e.target.value) : input[e.target.name] })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleDeleteGenre(e) {
    setInput({
      ...input,
      genres: input.genres.filter(data => data !== e)
    })
  }

  function handleDeletePlat(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter(data => data !== e)
    })
  }

  return (
    <div>
      <h1>Create Your Game</h1>
      <form>
        <div>
          <label>Name </label>
          <input type="text" name="name" value={input.name} onChange={e => handleInput(e)} />
          {errors.name && <span>*{errors.name}</span>}
        </div>
        <div>
          <label>Image </label>
          <input type="text" name="image" value={input.image} onChange={e => handleInput(e)} />
          {errors.image && <span>*{errors.image}</span>}
        </div>
        <div>
          <label>Description </label>
          <input type="text" name="description" value={input.description} onChange={e => handleInput(e)} />
          {errors.description && <span>*{errors.description}</span>}
        </div>
        <div>
          <label>Release Date </label>
          <input type="date" name="released" value={input.released} onChange={e => handleInput(e)} />
          {errors.released && <span>*{errors.released}</span>}
        </div>
        <div>
          <label>Rating </label>
          <input type="range" name="rating" value={input.rating} min="0" max="5" step="0.01" onChange={e => handleInput(e)} />
          <span>{input.rating}</span>
          {errors.rating && <span>*{errors.rating}</span>}
        </div>
        <div>
          <label>Genres </label>
          <select name='genres' onChange={e => handleSelect(e)}>
            {allGenres?.map(e =>
              <option key={e.id} value={e.name} >{e.name}</option>)}
          </select>
          {input.genres?.map((e, i) => 
          <div key={i}>
            <p>{e}</p>
            <button type="reset" onClick={() => handleDeleteGenre(e)}>x</button>
          </div>
            )}
          {errors.genres && <span>*{errors.genres}</span>}
        </div>
        <div>
          <label>Platforms </label>
          <select name='platforms' onChange={e => handleSelect(e)}>
            {allPlatforms?.map((e, i) =>
              <option key={i} value={e} >{e}</option>)}
          </select>
          {input.platforms?.map((e, i) => 
          <div key={i}>
            <p>{e}</p>
            <button type="reset" onClick={() => handleDeletePlat(e)}>x</button>
          </div>
            )}
          {errors.platforms && <span>*{errors.platforms}</span>}
        </div>
      </form>
    </div>
  )
}

export default Post