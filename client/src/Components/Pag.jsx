import React from 'react'

const Pag = ({ videogamesPerPage, Videogames, paginado }) => {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(Videogames / videogamesPerPage); i++) {
        pageNumber.push(i)
    }
  return (
    <nav>
        {pageNumber?.map((e,i) => 
        <button onClick={() => paginado(e)} key={i}>{e}</button>
        )}
    </nav>
  )
}

export default Pag