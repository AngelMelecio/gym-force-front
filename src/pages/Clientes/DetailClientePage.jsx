import React, { useEffect, useRef, useState } from 'react'
import AbsScroll from '../../components/AbsScroll'
import Calendar from '../../components/Calendar/Calendar'

const DetailClientePage = () => {

  const windowRef = useRef(null)
  const [windowHeight, setWindowHeight] = useState(windowRef.current?.clientHeight)
  const [isWindowBottom, setIsWindowBottom] = useState(false)

  const [selectedTab, setSelectedTab] = useState('informacion')

  useEffect(() => {
    //console.log(windowRef.current?.clientHeight)
    setWindowHeight(windowRef.current?.clientHeight)
  }, [windowRef])


  return (
    <div className='flex flex-col w-full h-screen p-3'>

      <h1 className="pb-4 text-3xl font-bold text-blue-900">
        Detalle de Cliente
      </h1>
      <div
        ref={windowRef}
        className='w-full h-full bg-white rounded-lg shadow-lg'>
        <AbsScroll
          onBottomReached={() => console.log('bottom')}
          setBottom={isWindowBottom}
          vertical>
          <div className='flex p-3 bg-rose-200' >
            <div>
              Imagen
            </div>
            <div>
              <p>Nombre</p>
              <p>Plan actual</p>
              <p>Vence en...</p>
            </div>
          </div>
          <div
            className='flex flex-col'
            style={{ height: windowHeight }}>
            {/* Tabs */}
            <div className='flex flex-row h-12'>
              {[{ option: 'informacion', label: 'Información' },
              { option: 'subscripciones', label: 'Subscripciones' },
              { option: 'actividad', label: 'Actividad' }].map((c, i) =>
                <button
                  key={`tb_${i}`}
                  type='button'
                  onClick={() => setSelectedTab(c.option)}
                  className={`px-5 py-2 border-b-2 font-bold  ${selectedTab === c.option ? 'border-b-blue-500 text-blue-600' : 'border-b-transparent text-gray-600'} duration-150`} >
                  {c.label}
                </button>)}
            </div>
            {/* Selected Tab */}
            <div className='w-full h-full '>
              {selectedTab === 'informacion' && <div className='appear'>
                Info
              </div>}
              {selectedTab === 'subscripciones' && <div className='appear'>
                Subs
              </div>}
              {selectedTab === 'actividad' && <div className='flex flex-col h-full appear'>
                <h2 className='px-6 py-5 mt-4 text-xl text-blue-900'>Actividad del cliente</h2>
                <Calendar />
              </div>}
            </div>
          </div>
        </AbsScroll>
      </div>
    </div>
  )
}

export default DetailClientePage