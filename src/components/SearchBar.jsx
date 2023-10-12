import React, { useRef } from 'react'
import { MyIcons } from '../constants/Icons'

const SearchBar = ({ text, setText }) => {
    const searchRef = useRef()

    const handleSearchButtonClick = () => {
        if (text.length > 0) {
            searchRef?.current?.blur()
            setText('')
            return
        }
        searchRef?.current?.focus()
    }

    return (
        <div
            id="searchbar"
            className="relative flex items-center w-2/3 h-8">
            <input
                id='search-input'
                className='w-full h-full py-1 pl-3 pr-10 bg-white shadow-md outline-none rounded-2xl'
                ref={searchRef}
                onChange={(e) => {
                    setText(e.target.value)

                }}
                value={text}
                type="text"
            />
            <button
                onClick={handleSearchButtonClick}
                className='absolute h-9 w-9 right-1 total-center opacity-white rounded-2xl'>
                {
                    text.length > 0 ?
                        <MyIcons.Cancel size='18px' style={{ color: '#4b5563' }} /> :
                        <MyIcons.Lupa size='15px' style={{ color: '#4b5563' }} />
                }
            </button>
        </div>
    )
}

export default SearchBar