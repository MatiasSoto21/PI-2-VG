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
        <div>
            <input type="text" placeholder='Search...' onChange={e => handleInput(e)} />
            <button type="submit" onClick={e => handleClick(e)}>Search</button>
        </div>
    )
}

export default SearchBar