import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDetail, clean } from '../Actions';
import style from './module/Detail.module.css'
import { Link } from 'react-router-dom';

const Detail = (props) => {
  const dispatch = useDispatch();
  const detail = useSelector(state => state.detail)
  console.log("juego", detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    return () => { dispatch(clean()) }
  }, [dispatch, props.match.params.id])

  return (
    <div id={style.todo}>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark text-primary" id={style.nav}>
        <ul className="navbar-nav">
          <li className="nav-item me-4 ms-4">
            <Link to="/home">
              <a className="nav-link" href="#a">Home</a>
            </Link>
          </li>
        </ul>
      </nav>
      {Object.keys(detail).length > 0 ?
        <div>
          <br></br>
          <br></br>
          <br></br>
          <h2 class="p-5 bg-secondary text-white rounded" id={style.head}>{detail.name}</h2>
          <img className="img-thumbnail mx-auto mb-2 d-block" id={style.foto} src={detail.image} alt="vg" width="1000px" height="650px" />
          <h4 className="alert alert-dark">Genres: {typeof detail.genres[0] === 'string' ? detail.genres.map(e => e + " ") : detail.genres.map(e => e.name + " ")}</h4>
          <h5 className='ps-5 text-dark'>Platforms: {detail.platforms.map(e => e + "▪ ")}</h5>
          <h5 className='ps-5'>Rating {detail.rating}⭐</h5>
          <h5 className='ps-5'>Released Date 📅 {detail.released}</h5>
          <div className="alert alert-secondary text-white" id={style.desc}>
            <h5>Description: </h5>
            <p> {detail.description}</p>

          </div>
        </div> :
        <div id={style.spin}>
          <div className="spinner-border text-dark" id={style.charge}>
          </div>
            <span className='text-white' id={style.loading}>Loading...</span>
        </div>}
    </div>
  )
}

export default Detail