import React from 'react'
import { useDispatch } from 'react-redux'
import { orderName } from '../Actions';

const Order = ({ ordered }) => {
    const dispatch = useDispatch();

    function handleChange(e){
        dispatch(orderName(e.target.value))
        ordered(e)
    }

  return (
    <div> Order by Name
        <select className="btn btn-secondary dropdown-toggle ms-2" onChange={e => handleChange(e)}>
            <option className="dropdown-item" value="a-z">A-Z</option>
            <option className="dropdown-item" value="z-a">Z-A</option>
        </select>
    </div>
  )
}

export default Order