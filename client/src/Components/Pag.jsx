import React from 'react'


const Pag = ({ videogamesPerPage, Videogames, paginado, pag }) => {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(Videogames / videogamesPerPage); i++) {
        pageNumber.push(i)
    }
  return (
    <div>
      <ul className="pagination justify-content-center mt-4">
        {pageNumber?.map((e,i) =>
        <li className="page-item" onClick={() => paginado(e)} key={i} ><a className={e === pag? "page-link active  bg-dark" : "page-link text-dark"} href="#-">{e}</a></li>
        )}
        </ul>
    </div>
  )
}

export default Pag  