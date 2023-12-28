import React from 'react'

const StatusModal = ({data}) => {
  return (
    <div className={`total-center appear absolute ${data.background} w-full h-full shadow-[inset_0px_0px_54px_-3px_rgba(0,0,0,0.75)]`}>
          <div className="relative leading-[1.2] bg-white h-[80vh] w-[80vw] rounded-lg shadow-lg emerge flex flex-col items-center justify-center">
            <div className='total-center'>
              {data.image &&
                <img className='object-cover w-40 h-40 rounded-full shadow-lg' src={data.image} alt="" />}
            </div>
            <p className={`font-[robotoCondensed] text-[5vw] font-extrabold ${data.color}`}>
              {data.message}
            </p>
            <p className='font-[robotoCondensed] text-[3vw] font-semibold text-gray-700'>
              {data.info && data.info}
            </p>
            {/* Timer */}
            <div className={`absolute bottom-0 left-0 h-2 ${data.background} grow`}>
            </div>
          </div>
        </div>
  )
}

export default StatusModal