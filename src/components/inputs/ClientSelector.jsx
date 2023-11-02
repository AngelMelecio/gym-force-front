import React, { useEffect, useRef, useState } from 'react'
import { MyIcons } from '../../constants/Icons'

const ClientSelector = ({ label, name, options, client, setClient, selecting, ...props }) => {

    const [text, setText] = useState("")
    const [showOpts, setShowOpts] = useState(false)
    const [error, setError] = useState(null)
    const [touched, setTouched] = useState(false)

    const inptRef = useRef(null)

    useEffect(() => {
        if (options && options.length > 0) {
            let newText = options.find(o => o.value === client).label
            setText(newText)
            setError(!options.some(o => o.label?.trim().toLowerCase()
                === newText.trim().toLowerCase()))
        }
    }, [options])

    const handleOptClick = (e, option) => {
        e.preventDefault()
        inptRef.current.blur()
        if (client === option) return
        let newText = options.find(o => o.value === option).label
        setText(newText)
        setError(!options.some(o => o.label?.trim().toLowerCase()
            === newText.trim().toLowerCase()))
        setClient(option)
        selecting && selecting(option)
    }

    const handleInptChange = (e) => {
        let newText = e.target.value
        setText(newText)
        setError(!options.some(o => o.label?.trim().toLowerCase().includes(newText.trim().toLowerCase())))
        setClient(options.find(o => o.label?.trim().toLowerCase()
            === newText.trim().toLowerCase().value))
    }

    return (
        <div >
            <div className="relative flex">
                <div className='absolute top-0 left-0 w-12 h-full rounded-l-full pointer-events-none total-center'>
                    <MyIcons.Person size="21px" className={` ${text !== "" && !error ? 'text-blue-700' : 'text-gray-400'}`} />
                </div>
                <input
                    autoComplete='off'
                    ref={inptRef}
                    id={name}
                    value={text}
                    onChange={handleInptChange}
                    onBlur={(e) => { setShowOpts(false) }}
                    onFocus={(e) => { setShowOpts(true); e.target.select() }}
                    className={`cursor-pointer w-full pr-4 pl-14 h-10 text-lg border-2 rounded-full outline-none  duration-200 font-medium appearance-none ${error ? 'border-rose-400 text-red-500' : text !== "" ? 'text-blue-800 border-blue-500' : 'border-gray-300 hover:border-blue-500 focus:border-blue-500'}  `}
                    {...props}
                />
                {
                    showOpts &&
                    <ul className="absolute z-10 w-full mt-1 duration-200 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-md top-full">
                        {options?.filter(o =>
                            o.label?.trim().toLowerCase()
                                .includes(text.trim().toLowerCase()))
                            .map((option, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 duration-200 cursor-pointer hover:bg-gray-200"
                                    onMouseDown={(e) => handleOptClick(e, option.value)}>
                                    {option.label}
                                </li>
                            ))}
                    </ul>
                }

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        inptRef.current.focus();
                    }}
                    className='absolute right-0 w-10 h-10 text-gray-600 -translate-y-1/2 total-center top-1/2'>
                    {showOpts ? <MyIcons.Up size="22px" /> : <MyIcons.Down size="22px" />}
                </button>

            </div>
        </div>
    )
}

export default ClientSelector