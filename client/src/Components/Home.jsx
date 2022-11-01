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


const Home = () => {
  const dispatch = useDispatch();
  const Videogames = useSelector((state) => state.videogames);

  const [order, setOrder] = useState('');

  function ordered (e){
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
  },[Videogames])

  function handleClick (e) {
    dispatch(getVideogames());
  }

  return (
    <div>
      <h1>Hello Gamer!</h1>
      <Link to="/post">
        <button>Create Videogame</button>
      </Link>
      <button onClick={e => handleClick(e)}>Reload Page</button>
      <div>
        <Filtergenre></Filtergenre>
        <Filtercreate></Filtercreate>
      </div>
      <div>
        <Order ordered={ordered}></Order>
        <OrderRating ordered={ordered}></OrderRating>
      </div>
      <div> asd
        <Pag videogamesPerPage={videogamesPerPage} Videogames={Videogames.length} paginado={paginado} ></Pag>
      </div>
      <div>
        <SearchBar></SearchBar>
      </div>
      <div>
        {currentVg? currentVg.map((e, i) => 
        <div key={i}>
          <Link to={'/detail/' + e.id} >
            <Card
            id={e.id}
            image={e.image}
            name={e.name}
            genres={e.genres}
            />
          </Link>
        </div>
        ): 
        <h1>Error</h1>
        }
      </div>
    </div>
  )
}

export default Home