import React, { useEffect } from 'react'
import { MyIcons } from '../constants/Icons'

const Modal = ({
    image,
    title,
    info,
    onCancel = null,
    onConfirm,
    onClose,
    isDelete,
    loading,
    functionalComponent,
}) => {

    const renderComponent = () => {
        if (functionalComponent) {
            return React.createElement(functionalComponent)
        }
        return null
    }

    return (
        <div className='absolute w-full h-screen z-200 appear gray-trans total-center'>
            <div className='w-1/2 mx-5 bg-white rounded-lg shadow-md sm:mx-28 md:mx-48 emerge'>
                <button
                    disabled={loading}
                    onClick={onClose}
                    className='w-10 h-10 rounded-tl-lg rounded-br-lg total-center btn-neutral'>
                    <MyIcons.Close size="25px" className='text-gray-500' />
                </button>
                {image && <div className='pb-5 total-center'>
                    {image}
                </div>}
                <div className='px-5 pb-10'>
                    <h3 className='pb-2 text-2xl font-extrabold text-center text-blue-900'>{title}</h3>
                    {
                        info && info.split('\n').map((item, i, array) => (
                            <React.Fragment key={i}>
                                <h3 className='text-lg text-center text-gray-600'>
                                    {item}
                                    {i !== array.length - 1 && <br />}
                                </h3>
                            </React.Fragment>
                        ))
                    }
                    {
                        <div className='pb-5 total-center'>
                            {renderComponent()}
                        </div>
                    }
                </div>

                <div className='flex'>
                    {onCancel && <button
                        disabled={loading}
                        onClick={onCancel}
                        className='flex-grow font-semibold border-t rounded-bl-lg h-14 total-center btn-neutral '>
                        Cancelar
                    </button>}
                    <button
                        disabled={loading}
                        onClick={onConfirm}
                        className={`flex-grow rounded-br-lg h-14 total-center btn-naranja ${isDelete ? 'hover:bg-red-500' : ''}
                        ${!onCancel ? 'rounded-bl-lg' : ''}
                        `}>
                        {loading ? "Confirmando..." : "Confirmar"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal