import React from 'react'

const Card = ({image, name, genres}) => {
  return (
    <div>
        <h3>{name}</h3>
        <img src={image} alt="Vg" width="500px" height="300px"/>  
        <h5>{genres.map(e => e.name)}</h5>
    </div>
  )
}

export default Card