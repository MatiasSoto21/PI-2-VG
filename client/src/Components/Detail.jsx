import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDetail, clean } from '../Actions';

const Detail = (props) => {
  const dispatch = useDispatch();
  const detail = useSelector(state => state.detail)
  console.log("juego", detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    return () => { dispatch(clean()) }
  }, [dispatch, props.match.params.id])

  return (
    <div>
      {Object.keys(detail).length > 0 ?
        <div>
          <h2 class="mt-4 p-5 bg-success text-white rounded">{detail.name}</h2>
          <img className="img-thumbnail mx-auto d-block" src={detail.image} alt="vg" width="1000px" height="650px" />
          <h4 class="alert alert-success">Genres: {typeof detail.genres[0] === 'string' ? detail.genres.map(e => e + " ") : detail.genres.map(e => e.name + " ")}</h4>
          <h5>Platforms: {detail.platforms.map(e => e + "▪ ")}</h5>
          <h5>Rating {detail.rating}⭐</h5>
          <h5>Released Date 📅 {detail.released}</h5>
          <div className="alert alert-secondary text-dark">
            <h5>Description: </h5>
            <p> {detail.description}</p>

          </div>
        </div> :
          <div className="spinner-border text-primary "></div>}
    </div>
  )
}

export default Detail