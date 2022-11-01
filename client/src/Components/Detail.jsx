import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDetail, clean } from '../Actions';

const Detail = (props) => {
  const dispatch = useDispatch();
  const detail = useSelector(state => state.detail)

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    return () => {dispatch(clean())}
  },[dispatch, props.match.params.id])

  return (
    <div>
      {Object.keys(detail).length > 0? 
      <div>
      <h2>{detail.name}</h2>
      <img src={detail.image} alt="vg" width="1000px" height="650px"/>
      <h4>{detail.genres.map(e => e + " ")}</h4>
      <h5>{detail.platforms.map(e => e)}</h5>
      <h5>{detail.rating}</h5>
      <h5>{detail.released}</h5>
      <p>{detail.description}</p>
      </div>
      :
      <h1>Loading......</h1>}
    </div>
  )
}

export default Detail