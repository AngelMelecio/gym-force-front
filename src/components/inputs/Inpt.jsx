import React, { useEffect, useState } from 'react'
import { MyIcons } from '../../constants/Icons'

const Inpt = ({ label, name, formik, ...props }) => {

    const [isFocus, setIsFocus] = useState(false)
    const [hasValue, setHasValue] = useState(false)
    const [error, setError] = useState(null)
    const [touch, setTouch] = useState(null)

    useEffect(() => {
        setError(formik?.errors[name])
        setTouch(formik?.touched[name])
    }, [formik])

    

    const handleFocus = (e) => {
        setIsFocus(true)
    }
    const handleBlur = (e) => {
        setIsFocus(false)
        if (e.target.value) {
            setHasValue(true);
        } else {
            setHasValue(false);
        }
    }

    return (
        <div >
            <div className="relative">
                <label htmlFor={name} className={`absolute  bg-white px-1 pointer-events-none ${error && touch ? 'text-rose-400' : isFocus ? 'text-blue-500' : 'text-gray-500'} ${isFocus || formik?.values[name] ? 'up' : ''} transition-all duration-200 `}>{label}</label>
                <input
                    id={name}
                    onFocus={handleFocus}
                    onChange={formik?.handleChange}
                    value={formik?.values[name] || "" }
                    onBlur={(e) => { handleBlur(e); formik?.handleBlur(e) }}
                    className={`w-full px-4 py-2 text-base text-gray-700 border rounded-lg outline-none  duration-200 font-medium ${error && touch ? 'border-rose-400' : isFocus ? 'border-blue-500' : 'border-gray-200 hover:border-blue-500'}`}
                    {...props} />
            </div>
            <div className={`flex pl-1 text-sm h-9 text-rose-400 ${error && touch ? 'opacity-100' : 'opacity-0'} duration-200`}>
                {error && touch && <><MyIcons.Info style={{ margin: '3px' }} />{error}</>}
            </div>
        </div>
    )
}

export default Inpt