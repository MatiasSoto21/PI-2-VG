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
    <div> Order by 
        <select onChange={e => handleChange(e)}>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
        </select>
    </div>
  )
}

export default Order