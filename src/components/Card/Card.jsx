import React from 'react'

const Card = ({ title, subtitle, controls, tooltip }) => {
  return (
    <div className='flex flex-col p-3 bg-white rounded-lg shadow-md'>
      <div className='flex flex-col justify-between'>
        <div className='relative flex flex-col'>
          <p
            data-tooltip={tooltip}
            className=' text-lg font-[800] text-blue-900 ellipsis  '>
            {title}
          </p>
          <p className='text-sm font-light text-gray-700'>{subtitle}</p>
        </div>
        <div className='flex items-center justify-end pt-3'>
          {controls}
        </div>
      </div>
    </div>
  )
}

export default Card