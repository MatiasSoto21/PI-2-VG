import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, getPlatforms, postGame } from '../Actions';

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
    setInput({
      ...input,
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

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postGame(input));
    alert('Videogame Create!');
    setInput({
      name: '',
      image: '',
      description: '',
      released: '',
      rating: '',
      genres: [],
      platforms: []
    })
  }

  return (
    <div className='container'> 
      <h1>Create Your Game</h1>
      <form class="border border-primary p-4" onSubmit={e => handleSubmit(e)}>
        <div className="col-6 mb-3">
          <label className='form-label'>Name </label>
          <input className="form-control" placeholder="Name..." type="text" name="name" value={input.name} onChange={e => handleInput(e)} required />
          {errors.name && <span className="text-danger">*{errors.name}</span>}
        </div>
        <div className="col-6 mb-3">
          <label className='form-label'>Image </label>
          <input className="form-control" placeholder="URL image" type="text" name="image" value={input.image} onChange={e => handleInput(e)} />
          {errors.image && <span className="text-warning">*{errors.image}</span>}
        </div>
        <div className="col-6 mb-3">
          <label className='form-label'>Desciption </label>
          <input className="form-control" placeholder="Description..." type="text" name="description" value={input.description} onChange={e => handleInput(e)} />
          {errors.description && <span className="text-danger">*{errors.description}</span>}
        </div>
        <div className="col-6 mb-3">
          <label className='form-label'>Date </label>
          <input className="form-control" type="date" name="released" value={input.released} onChange={e => handleInput(e)} />
          {errors.released && <span className="text-danger">*{errors.released}</span>}
        </div>
        <div className="col-6 mb-3">
          <label className='form-label'>Rating </label>
          <input className="form-range" type="range" name="rating" value={input.rating} min="0" max="5" step="0.01" onChange={e => handleInput(e)} />
          <span>{input.rating + '⭐'}</span>
          {errors.rating && <span className="text-danger">*{errors.rating}</span>}
        </div>
        <div className="col-6 mb-3">
          <label className='form-label'>Genres </label>
          <select className="form-select" name='genres' onChange={e => handleSelect(e)}>
            {allGenres?.map(e =>
              <option key={e.id} value={e.name} >{e.name}</option>)}
          </select>
          {input.genres?.map((e, i) =>
            <div className="badge bg-success mt-3 me-3 p-2" key={i}>
              {e}
              <button className="badge bg-danger ms-2 p-2" type="reset" onClick={() => handleDeleteGenre(e)}>x</button>
            </div>
          )}
          {errors.genres && <span className="text-danger">*{errors.genres}</span>}
        </div>
        <div className="col-6 mb-3">
          <label className='form-label' >Platforms </label>
          <select className="form-select" name='platforms' onChange={e => handleSelect(e)}>
            {allPlatforms?.map((e, i) =>
              <option key={i} value={e} >{e}</option>)}
          </select>
          {input.platforms?.map((e, i) =>
            <div className="badge bg-secondary mt-3 me-3 p-2" key={i}>
              {e}
              <button className="badge bg-danger ms-2 p-2" type="reset" onClick={() => handleDeletePlat(e)}>x</button>
            </div>)}
          {errors.platforms && <span className="text-danger">*{errors.platforms}</span>}
        </div>
        {!errors.name && !errors.description && !errors.rating && !errors.released && input.genres.length > 0 && input.platforms.length > 0 ?
          <button className='btn btn-success' type='submit'>Create</button> :
          <p className="text-danger">*All Fields Must Be Completed Except Image</p>}
      </form>
    </div>
  )
}

export default Post