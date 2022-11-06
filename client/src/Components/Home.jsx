import React, { useEffect, useState } from 'react'
import { getVideogames } from '../Actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from './Card';
import SearchBar from './SearchBar'
import Filtergenre from './Filtergenre'
import Filtercreate from './Filtercreate'
import Order from './Order'
import OrderRating from './OrderRating'
import Pag from './Pag';
import styles from './module/Home.module.css'


const Home = () => {
  const dispatch = useDispatch();
  const Videogames = useSelector((state) => state.videogames);

  const [order, setOrder] = useState('');

  function ordered(e) {
    setOrder(e)
  }

  const [pag, setPag] = useState(1)
  const videogamesPerPage = 15;
  const lastvg = pag * videogamesPerPage;
  const firstvg = lastvg - videogamesPerPage;
  var currentVg = Videogames.slice(firstvg, lastvg)

  const paginado = (number) => {
    setPag(number)
  }

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch])

  useEffect(() => {
    setPag(1)
  }, [Videogames, order])

  function handleClick(e) {
    dispatch(getVideogames());
  }

  return (
    <div id={styles.container}>
      <h1>Hello Gamer!</h1>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark text-primary">
        <ul class="navbar-nav">
          <li class="nav-item me-4 ms-4">
            <Link to="/post">
              <a class="nav-link" href="#a">Create Videogame</a>
            </Link>
          </li>
          <li class="nav-item me-4">
            <a class="nav-link" href="#b" onClick={e => handleClick(e)}>Reload Page</a>
          </li>
          <li class="nav-item dropdown me-4 ms-4">
            <a class="nav-link" href="#c"><Filtergenre></Filtergenre></a>
          </li>
          <li class="nav-item dropdown me-4 ms-4">
            <a class="nav-link" href="#d"><Filtercreate></Filtercreate></a>
          </li>
          <li class="nav-item dropdown me-4 ms-4">
            <a class="nav-link" href="#e"><Order ordered={ordered}></Order></a>
          </li>
          <li class="nav-item dropdown me-4 ms-4">
            <a class="nav-link" href="#f"><OrderRating ordered={ordered}></OrderRating></a>
          </li>


        </ul>
      </nav>
      <Pag videogamesPerPage={videogamesPerPage} Videogames={Videogames.length} paginado={paginado} ></Pag>
      <SearchBar></SearchBar>
      <div className='row m-3 p-5'>
        {currentVg?.map((e, i) =>
          <div className='col m-3 p-4' key={i}>
            <Link className={styles.link} to={'/detail/' + e.id} >
              <Card
                id={e.id}
                image={e.image}
                name={e.name}
                genres={e.genres}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home