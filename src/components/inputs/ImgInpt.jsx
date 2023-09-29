import React from 'react'
import { MyIcons } from '../../constants/Icons'
import { toUrl } from '../../utils/global'

const ImgInpt = ({ formik, name, ...props }) => {
    return (
        <div className="relative bg-gray-100 rounded-full shadow-md total-center w-28 h-28">
            {(toUrl(formik?.values[name])) ? (
                <img
                    className='object-cover w-full h-full rounded-full'
                    src={toUrl(formik?.values[name])}
                    alt='' />) : (
                <MyIcons.Person className='text-gray-400' size="85px" />)}
            <div className='w-10 h-10 absolute -bottom-1.5 -right-1.5 '>
                <input id={name} type="file" accept='image/*'
                    onChange={(e) => {
                        formik?.setFieldValue(name, e.target.files[0])
                    }}
                    className='hidden'
                    {...props}
                />
                <label
                    className='absolute left-0 w-full h-full text-white rounded-full shadow-md btn-naranja total-center'
                    htmlFor={name} >
                    <MyIcons.Camera size="24px" />
                </label>
            </div>
        </div>
    )
}

export default ImgInpt