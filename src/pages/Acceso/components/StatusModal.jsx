import React from 'react'

const StatusModal = ({ data }) => {

  return (
    <div className={`total-center appear relative ${data?.background} w-full  h-full shadow-[inset_0px_-15px_135px_-90px_#1a202c]`}>
      <div className="relative leading-[1.2] bg-white pt-10 pb-14 w-[80vw] rounded-lg shadow-lg emerge flex flex-col items-center justify-center">
        <div className='total-center'>
          {data?.image &&
            <img className='object-cover w-40 h-40 rounded-full shadow-lg' src={data?.image} alt="" />}
        </div>
        
        {
          data.message && data.message.split('\n').map((item, i, array) => (
            <React.Fragment key={i}>
              <p className={`font-[robotoCondensed] text-[5vw] font-extrabold ${data?.color} w-full total-center`}>
                {item}
                {i !== array.length - 1 && <br />}
              </p>
            </React.Fragment>
          ))
        }

        <p className='font-[robotoCondensed] text-[3vw] font-semibold text-gray-700 mt-2 w-full text-center'>
          {data?.info && data?.info}
        </p>
        {/* Timer */}
        <div className={`absolute bottom-0 left-0 h-2 ${data?.background} grow`}>
        </div>
      </div>
    </div>
  )
}

export default StatusModal