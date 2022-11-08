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
      <select className="btn btn-secondary dropdown-toggle ms-2" onChange={e => handleChange(e)}>
        <option className="dropdown-item" value="All">All</option>
        <option className="dropdown-item" value="Api">Api</option>
        <option className="dropdown-item" value="Created">Created by You</option>
      </select>
    </div>
  )
}

export default Filtercreate