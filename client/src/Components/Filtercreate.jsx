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
      <select className="btn btn-primary dropdown-toggle ms-2" onChange={e => handleChange(e)}>
        <option class="dropdown-item" value="All">All</option>
        <option class="dropdown-item" value="Api">Api</option>
        <option class="dropdown-item" value="Created">Created by You</option>
      </select>
    </div>
  )
}

export default Filtercreate