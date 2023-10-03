import { useEffect, useRef, useState } from 'react'
import { MyIcons } from '../constants/Icons'
import Loader from './Loader'
import { useNavigate } from "react-router-dom";
import { toUrl } from '../utils/global'


const Table = ({
    title,
    path,
    idName,
    loading,
    titleAttrs,
    subTitleAtrrs,
    Info,
    infoAttr,
    fotoAttr,
    data,
    setData,
    onDelete
}) => {

    const [searchText, setSearchText] = useState('')
    const [filteredData, setFilteredData] = useState(data);

    const searchRef = useRef()
    const trashButtonRef = useRef()

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);


    const navigate = useNavigate();

    useEffect(() => {
        console.log("data", data)
    }, [])

    const handleOptionsClick = (itemId) => {
        setSelectedItemId(itemId);
        setDropdownOpen(!isDropdownOpen);
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
            let E = JSON.stringify(e).toLowerCase()
            return E.includes(val)
        })
        setFilteredData(newElements);
    }

    return (
        <div className="relative flex w-full h-screen pl-18 bg-slate-100">
            <div id="page" className="relative flex flex-col w-full h-full p-4 overflow-hidden">
                <div className="flex flex-col h-full">
                    <h1 className="pb-4 text-3xl font-bold text-blue-900">{title}</h1>
                    {/* Options */}
                    <div className="flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-lg">
                        <div className="flex flex-col px-5 py-4 border-b-2 rounded-t-lg" >
                            <div className="flex justify-between w-full">
                                <div
                                    className="flex flex-row items-center justify-between">
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
                        <div
                            id="table-container"
                            className="relative flex w-full h-full overflow-x-scroll bg-gray-50">
                            {loading ?
                                <div className="absolute flex justify-center w-full p-10">
                                    <Loader />
                                </div> :
                                <div className="flex flex-col w-full h-full">
                                    {/* Row */}
                                    {
                                        filteredData?.map((item, i) =>

                                            <div key={item['id']}
                                                className='flex flex-row p-3 rounded-lg hover:bg-gray-200 hover:shadow-lg hover:cursor-pointer'>
                                                {/* Image or icon */}
                                                <div className='flex items-center justify-center w-16 ml-1 mr-4 bg-gray-400 rounded-full shadow-md h-14'
                                                    onClick={() => navigate(`/${path}/${item[idName]}`)} >
                                                    {
                                                        toUrl(item[fotoAttr]) ?
                                                            <img
                                                                className='object-cover w-full h-full rounded-full'
                                                                src={toUrl(item[fotoAttr])}
                                                                alt='' /> :
                                                            <MyIcons.Person size='30px' color='white' />
                                                    }
                                                </div>
                                                {/* Title, subtitle and information */}
                                                <div className='relative flex flex-col items-center justify-center w-full h-full py-1 md:w-full md:flex-row md:justify-between'
                                                    onClick={() => navigate(`/${path}/${item[idName]}`)}>
                                                    {/* Title and subtitle */}
                                                    <div className='flex flex-col w-full'>
                                                        <div className='flex flex-col md:flex-row'>
                                                            {titleAttrs?.map((atr, j) =>
                                                                <p key={'tittle' + j} className='px-1 text-xl font-extrabold text-blue-800'>
                                                                    {item[atr]}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className='flex flex-col md:flex-row'>
                                                            {subTitleAtrrs?.map((atr, k) =>
                                                                <p key={'subtittle' + k} className='px-1 text-sm font-semibold'>
                                                                    {item[atr]}
                                                                    {(k + 1) % 2 !== 0 && "  -"}
                                                                </p >
                                                            )}
                                                        </div>
                                                    </div>

                                                    { /* Information */}
                                                    <div className='flex items-center justify-center w-3/6'>
                                                        {Info !== null && Info(item[infoAttr])}
                                                    </div>
                                                    {
                                                        isDropdownOpen && item['id'] === selectedItemId && (
                                                            <div className="absolute top-0 bottom-0 right-0 bg-white rounded-lg shadow-lg w-30">
                                                                <button onClick={() => navigate(`/${path}/${item[idName]}`)}
                                                                    className="w-full px-4 text-sm text-left py-1.5 hover:bg-orange-400 hover:rounded-lg hover:text-white flex flex-row justify-center pb-0.5">
                                                                    <div className='h-full w-10 px-0.5 text-current'>
                                                                        <MyIcons.Edit size="20px" />
                                                                    </div>
                                                                    Editar
                                                                </button>
                                                                <button onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        onDelete(item[idName],item['nombre'] + ' ' + item['apellidos']+' - '+item['rol']);
                                                                    }}
                                                                    className="flex flex-row justify-center w-full px-4 py-1.5 text-sm text-left hover:bg-red-600 hover:rounded-lg hover:text-white">
                                                                    <div className='h-full w-10 px-0.5 text-current'>
                                                                        <MyIcons.Trash size="20px" />
                                                                    </div>
                                                                    Elimar
                                                                </button>
                                                            </div>
                                                        )
                                                    }

                                                </div>
                                                {/* Options */}
                                                <div className='flex w-10 h-full justify-items-start md:items-center md:justify-center'
                                                    onClick={() => handleOptionsClick(item['id'])}>
                                                    <MyIcons.Options size='20px' color='#fb923c' />

                                                </div>


                                            </div>
                                        )
                                    }

                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table