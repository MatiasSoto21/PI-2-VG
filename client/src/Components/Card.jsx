import React from 'react'
import style from './module/Card.module.css'

const Card = ({ image, name, genres }) => {
  return (
        <div className='card' id={style.container}>
          <h3 className="card-title" id={style.name}>{name}</h3>
          <img id={style.imagen} src={image} alt="Vg" width="500px" height="300px" />
          <div className="card-body">
            <h5>{genres.map(e => e.name + " ")}</h5>
          </div>
        </div>
  )
}

export default Card