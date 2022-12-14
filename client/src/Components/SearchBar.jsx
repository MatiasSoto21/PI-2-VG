import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { search } from '../Actions';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    function handleInput(e) {
        setInput(e.target.value);
    }

    function handleClick(e) {
        dispatch(search(input))
    }


    return (
        <div className='d-flex justify-content-center mt-4'>
            <ul className="d-flex">

            <input className="form-control me-2" type="text" placeholder='Search...' onChange={e => handleInput(e)} />
            <button className="btn btn-dark" type="submit" onClick={e => handleClick(e)}>Search</button>
            </ul>
        </div>
    )
}

export default SearchBar