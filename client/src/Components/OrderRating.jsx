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
    <div> Order by Rating
        <select className="btn btn-secondary dropdown-toggle ms-2" onChange={e => handleChange(e)}>
            <option className="dropdown-item" value="mas">➕</option>
            <option className="dropdown-item" value="menos">➖</option>
        </select>
    </div>
  )
}

export default OrderRating