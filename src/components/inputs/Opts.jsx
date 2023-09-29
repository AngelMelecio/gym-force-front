import React, { useEffect, useRef, useState } from 'react'
import { MyIcons } from '../../constants/Icons'
import { sleep } from '../../utils/global'


const Opts = ({ label, name, options, formik, ...props }) => {

    const [showOpts, setShowOpts] = useState(false)
    const [error, setError] = useState(null)

    const inptRef = useRef(null)

    useEffect(() => {
        setError(formik?.errors[name])
    }, [formik])

    const handleOptClick = (e, option) => {
        e.preventDefault()
        formik?.setFieldValue(name, option)
        inptRef.current.blur()
    }

    const handleInptChange = (e) => {
        formik?.handleChange(e)
    }

    return (
        <div >
            <div className="relative">
                <label className={`absolute  ${showOpts ? 'text-blue-500' : 'text-gray-500'} bg-white px-1 pointer-events-none up ${error ? 'text-rose-400' : ''} transition-all duration-200 `}>{label}</label>
                <input
                    ref={inptRef}
                    id={name}
                    readOnly
                    value={options.find(o => o.value === formik?.values[name])?.label || "" }
                    onChange={handleInptChange}
                    onBlur={(e) => { setShowOpts(false); formik?.handleBlur(e) }}
                    {...props}
                    onFocus={() => setShowOpts(true)}
                    className={`cursor-pointer w-full px-4 py-2 text-base text-gray-700 border rounded-lg outline-none  duration-200 font-medium appearance-none ${error ? 'border-rose-400' : showOpts ? 'border-blue-500' : ''} brdoer-gray-200 hover:border-blue-500`}
                />
                {
                    showOpts &&
                    <ul className="absolute z-10 w-full mt-1 duration-200 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-md">
                        {options.map((option, index) => (
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
                    onClick={() => inptRef.current.focus()}
                    className='absolute right-0 w-10 h-10 text-gray-600 -translate-y-1/2 total-center top-1/2'>
                    {showOpts ? <MyIcons.Up size="22px" /> : <MyIcons.Down size="22px" />}
                </button>

            </div>
            <div className={`flex pl-1 text-sm h-9 text-rose-400 ${error ? 'opacity-100' : 'opacity-0'} duration-200`}>
                {error && <><MyIcons.Info style={{ margin: '3px' }} />{error}</>}
            </div>
        </div>
    )
}

export default Opts