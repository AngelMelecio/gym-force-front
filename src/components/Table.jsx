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
      return Object.keys(e).some(key => e[key].toString().toLowerCase().includes(val))
    })
    setFilteredData(newElements);
  }

  return (
    <div className="relative flex w-full h-screen bg-slate-100">
      <div id="page" className="relative flex flex-col w-full h-full p-4 ">
        <h1 className="pb-4 text-3xl font-bold text-blue-900">{title}</h1>
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg ">
          {/* Options */}
          <div className="px-5 py-4 border-b-2 rounded-t-lg " >
            <div className="flex justify-between w-full">
              <div className="flex flex-row items-center justify-between">
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
                  className='w-full h-full py-1 pl-3 pr-10 outline-none rounded-2xl bg-slate-200'
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
            {
              filteredData?.map((item, i) =>
                <div key={item['id']}
                  className='flex flex-row p-3 duration-200 hover:bg-slate-200 hover:shadow-sm hover:cursor-pointer'>
                  {// Image or icon 
                  }
                  <div className='w-16 h-16 ml-1 mr-4 bg-gray-400 rounded-full shadow-md total-center'
                    onClick={() => navigate(`/${path}/${item[idName]}`)} >
                    {

                      item[photoAttr] !== null ?
                        <img
                          className='object-cover w-full h-full rounded-full'
                          src={toUrl(item[photoAttr])}
                          alt='' /> :
                        <MyIcons.Person size='30px' color='white' />
                    }
                  </div>
                  <div className='flex flex-grow'>
                    <div className='flex flex-row w-full'>
                      {// Title, subtitle and information 
                      }
                      <div className='relative flex flex-col items-center justify-center flex-grow h-full py-1 md:w-full md:flex-row md:justify-between'
                        onClick={() => navigate(`/${path}/${item[idName]}`)}>
                        {// Title and subtitle
                        }
                        <div className='flex flex-col w-full'>
                          <div className='flex flex-col md:flex-row'>
                            {titleAttrs?.map((atr, j) =>
                              <p key={'tittle' + j} className='px-1 text-xl font-extrabold text-blue-800'>
                                {item[atr]}
                              </p>
                            )}
                          </div>
                          <div className='flex flex-row'>
                            {subTitleAtrrs?.map((atr, k) =>
                              <p key={'subtittle' + k} className='px-1 text-sm font-semibold'>
                                {item[atr]}
                                {(k + 1) % 2 !== 0 && "  -"}
                              </p >
                            )}
                          </div>
                        </div>

                        { // Information 
                        }
                        <div className='flex items-center justify-center w-5/6'>
                          {Info !== null && Info(item[infoAttr])}
                        </div>
                        {
                          isDropdownOpen && item['id'] === selectedItemId && (
                            <div className="absolute top-0 right-0 flex flex-col bg-white rounded-lg shadow-lg w-30">
                              <button onClick={() => navigate(`/${path}/${item[idName]}`)}
                                className="flex flex-row justify-center w-full px-4 py-2 text-sm text-left rounded-tl-lg rounded-tr-lg hover:bg-orange-400 hover:text-white ">
                                <div className='w-10 h-full text-current'>
                                  <MyIcons.Edit size="20px" />
                                </div>
                                Editar
                              </button>
                              <button onClick={(e) => {
                                e.stopPropagation();
                                onDelete(item[idName], item['nombre'] + ' ' + item['apellidos'] + ' - ' + item['rol']);
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
                      {/* Options */}
                      <div className='flex w-10 h-full total-center '
                        onClick={() => handleOptionsClick(item['id'])}>
                        <MyIcons.Options size='20px' color='#fb923c' />
                      </div>
                    </div>

                  </div>

                </div>
              )}
          </AbsScroll>
        </div >
      </div >
    </div> 
  )
}



export default Table