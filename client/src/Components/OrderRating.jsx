import React from 'react'
import { useDispatch } from 'react-redux'
import { orderRating } from '../Actions';

const OrderRating = ({ ordered }) => {
    const dispatch = useDispatch();

    function handleChange(e) {
        dispatch(orderRating(e.target.value))
        ordered(e)
    }

  return (
    <div>
        <select onChange={e => handleChange(e)}>
            <option value="mas">+</option>
            <option value="menos">-</option>
        </select>
    </div>
  )
}

export default OrderRating