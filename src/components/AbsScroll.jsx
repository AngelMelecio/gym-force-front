import React from 'react'
import Loader from './Loader'

const AbsScroll = ({
    vertical = false,
    horizontal = false,
    loading,
    children
}) => {
    return (
        <div className='w-full h-full'>
            <div className={`relative w-full h-full ${vertical ? 'overflow-y-scroll' : 'overflow-y-hidden'} ${horizontal ? 'overflow-x-scroll' : 'overflow-x-hidden'}`}>
                {loading ? <Loader /> :
                    <div className='absolute top-0 w-full emerge'>
                        {children}
                    </div>
                }
            </div>
        </div>
    )
}

export default AbsScroll