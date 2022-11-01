import React from 'react'
import { useDispatch } from 'react-redux'
import { filterCreate } from '../Actions'

const Filtercreate = () => {
  const dispatch = useDispatch();

  function handleChange(e){
    dispatch(filterCreate(e.target.value));
  }

  return (
    <div> Filter by Creation
      <select onChange={e => handleChange(e)}>
        <option value="All">All</option>
        <option value="Api">Api</option>
        <option value="Created">Created by You</option>
      </select>
    </div>
  )
}

export default Filtercreate