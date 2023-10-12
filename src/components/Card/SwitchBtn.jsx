import React from 'react'

const SwitchBtn = ({ isSelected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`h-8 px-5 text-white  rounded-full active:opacity-70 active:duration-0 total-center ${isSelected?'bg-gray-500' : 'bg-orange-400'} duration-100`}>
      {isSelected ? 'Quitar' : 'Agregar'}
    </button>
  )
}

export default SwitchBtn