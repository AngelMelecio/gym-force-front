import React from 'react'
import { MyIcons } from '../../constants/Icons'

const SpinBtn = ({ small = false, cantidad, onAdd, onSubstract }) => {
  return (
    <div className='flex flex-row'>
      <button
        type="button"
        onClick={onSubstract}
        className={`${small ? 'rounded-full w-6 h-6' : 'rounded-tl-full rounded-bl-full w-8 h-8'}  text-white bg-orange-400  total-center active:opacity-70 active:duration-0`}>
        <MyIcons.Minus />
      </button>
      <p className={`${small ? 'w-6 h-6 text-md' : 'w-8 h-8 text-lg'}  total-center`}>
        {cantidad}
      </p>
      <button
        type="button"
        onClick={onAdd}
        className={`${small ? 'rounded-full w-6 h-6' : 'rounded-tr-full rounded-br-full w-8 h-8'} text-white duration-200 bg-orange-400 total-center active:opacity-70 active:duration-0`}>
        <MyIcons.Plus />
      </button>
    </div>
  )
}

export default SpinBtn