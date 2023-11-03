import { useEffect, useRef, useState } from 'react'
import { MyIcons } from '../constants/Icons'
import Loader from './Loader'
import { useNavigate } from "react-router-dom";
import { toUrl } from '../utils/global'
import AbsScroll from './AbsScroll.jsx'
import { HOST } from '../constants/ENVs';

const Table = ({
  title,
  path,
  idName,
  loading,
  titleAttrs,
  subTitleAtrrs,
  Info,
  infoAttr,
  photoAttr,
  data,
  setData,
  onDelete
}) => {

  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([]);

  const searchRef = useRef()
  const trashButtonRef = useRef()

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);


  const navigate = useNavigate();

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  const handleOptionsClick = (itemId) => {
    setSelectedItemId(itemId);
    setDropdownOpen(p => !p);
  };

  const handleSearchButtonClick = () => {
    if (searchText.length > 0) {
      searchRef?.current?.blur()
      setSearchText('')
      setFilteredData(data)
      return
    }
    searchRef?.current?.focus()
  }
  const handleSearch = () => {
    let val = (searchRef?.current?.value)
    if (val) val = val.trim().toLowerCase()
    let elements = [...data]
    let newElements = [...elements].filter(e => {
      return Object.keys(e).some(key => 
        e[key] !== null ? e[key].toString().toLowerCase().includes(val) : ''
      )
    })
    setFilteredData(newElements);
  }

  return (
    <div className="relative flex w-full h-screen bg-neutral-100">
      <div id="page" className="relative flex flex-col w-full h-full p-4 ">
        <h1 className="pb-4 text-3xl font-bold text-blue-900">{title}</h1>
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg ">
          {/* Options */}
          <div className="px-5 py-4 border-b-2 rounded-t-lg " >
            <div className="flex justify-between w-full">
              <div className="flex flex-row items-center justify-between ">
                <button
                  onClick={() => navigate(`/${path}/0`)}
                  className='w-10 h-10 text-white bg-orange-400 rounded-lg total-center normal-button'>
                  <MyIcons.Plus size='20px' />
                </button>
              </div>
              {/* Search Bar */}
              <div
                id="searchbar"
                className="relative flex items-center w-80">
                <input
                  id='search-input'
                  className='w-full h-full py-1 pl-3 pr-10 outline-none rounded-2xl bg-slate-100'
                  ref={searchRef}
                  onChange={(e) => {
                    setSearchText(e.target.value)
                    handleSearch()
                  }}
                  value={searchText}
                  type="text"
                />
                <button
                  onClick={handleSearchButtonClick}
                  className='absolute h-9 w-9 right-1 total-center opacity-white rounded-2xl'>
                  {
                    searchText.length > 0 ?
                      <MyIcons.Cancel size='18px' style={{ color: '#4b5563' }} /> :
                      <MyIcons.Lupa size='15px' style={{ color: '#4b5563' }} />
                  }
                </button>
              </div>
            </div>
          </div>
          <AbsScroll vertical loading={loading} >
            {filteredData?.map((item, i) =>
              <div
                key={item[idName]}
                className='flex flex-row items-center justify-between w-full px-5 py-3 duration-100 hover:shadow-md hover:cursor-pointer'>
                <div
                  onClick={() => navigate(`/${path}/${item[idName]}`)}
                  className="flex flex-col justify-between flex-grow w-1/2 md:flex-row">
                  <div className='flex flex-row items-center flex-grow'>
                    <div className='w-16 h-16 mr-5 bg-gray-200 rounded-full shadow-md total-center'>
                      {toUrl(item[photoAttr]) !== null ?
                        <img
                          className='object-cover w-full h-full rounded-full'
                          src={toUrl(item[photoAttr])}
                          alt='' /> :
                        <MyIcons.Person size='30px' color='white' />}
                    </div>
                    <div className='flex flex-col flex-grow'>
                      <div className='flex flex-col lg:flex-row'>
                        {titleAttrs?.map((atr, j) =>
                          <p key={'tittle' + j} className='px-1 text-xl font-extrabold text-blue-900'>
                            {item[atr]}
                          </p>
                        )}
                      </div>
                      <div className='flex-row hidden sm:flex'>
                        {subTitleAtrrs?.map((atr, k) =>
                          <p key={'subtittle' + k} className='px-1 text-sm font-semibold text-gray-700'>
                            {item[atr]}
                            {(k + 1) % 2 !== 0 && "  -"}
                          </p >
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center px-4 md:w-1/2'>
                    <div className='flex justify-center flex-grow w-full'>
                      {Info(item[infoAttr])}
                    </div>
                  </div>
                </div>
                <div className='relative flex w-10 h-10 duration-100 rounded-full total-center hover:bg-gray-200'
                  onClick={() => handleOptionsClick(item[idName])}>
                  <MyIcons.Options size='20px' color='#fb923c' />
                  {
                    isDropdownOpen && item[idName] === selectedItemId && (
                      <div className="absolute left-0 flex flex-col -translate-x-full -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 appear w-30 ">
                        <button onClick={() => navigate(`/${path}/${item[idName]}`)}
                          className="flex flex-row justify-center w-full px-4 py-2 text-sm text-left rounded-tl-lg rounded-tr-lg hover:bg-orange-400 hover:text-white ">
                          <div className='w-10 h-full text-current'>
                            <MyIcons.Edit size="20px" />
                          </div>
                          Editar
                        </button>
                        <button onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item[idName], item['nombre'] + ' ' + item['apellidos']);
                          setDropdownOpen(false);
                        }}
                          className="flex flex-row justify-center w-full px-4 py-2 text-sm text-left rounded-bl-lg rounded-br-lg hover:bg-red-500 hover:text-white">
                          <div className='w-10 h-full text-current'>
                            <MyIcons.Trash size="20px" />
                          </div>
                          Elimar
                        </button>
                      </div>
                    )
                  }
                </div>
              </div>
            )
            }
          </AbsScroll>
        </div >
      </div >
    </div>
  )
}



export default Table