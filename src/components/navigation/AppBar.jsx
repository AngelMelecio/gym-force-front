import React, { useState } from 'react'
import { adminTabs, baseTabs, employeeTabs } from '../../constants/appRoutes'
import { MyIcons } from '../../constants/Icons'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import GymLogoWhite from '../../assets/GymLogoWhite.svg'

const AppBar = () => {

  const { signOut, session } = useAuth()

  const [adminTabsVisible, setAdminTabsVisible] = useState(false)

  const Tab = ({ info, ...props }) => {
    const { content, to, icon } = info

    const resolvePath = useResolvedPath(to)
    const isActive = to && useMatch({ path: resolvePath.pathname, end: false })

    return (
      <Link {...props} to={to} className={'tab relative flex items-center w-10 h-10 my-1 rounded-full cursor-pointer active:opacity-60  hover:bg-blue-500 duration-200 ' + (isActive ? 'bg-blue-800 hover:bg-blue-800' : '')}>
        <div className="absolute left-0 flex items-center justify-center w-10 h-10">
          {icon}
        </div>
        <div className='font-bold duration-200 opacity-0 whitespace-nowrap pl-11 group-hover:opacity-100 group-hover:delay-300'>
          {content}
        </div>
      </Link>
    )
  }

  return (
    <div className='relative z-50 w-[4.4rem] h-screen text-white'>
      <div id="side-bar" className='absolute flex flex-col w-16 h-full duration-200 ease-in-out bg-blue-600 group hover:w-56 hover:delay-300 shadow-[5px_0px_4px_-2px_#00000024]'>
        {/* AppBar Header */}
        <div className="flex flex-[0.20] w-full ">
          <img
            className='w-full  px-10 opacity-0 group-hover:opacity-100 group-hover:delay-[410ms] group-hover:duration-300'
            src={GymLogoWhite} alt="" />
        </div>
        {/* Center Tabs */}
        <div className="flex flex-[0.60] w-full ">
          <div className="relative w-full h-full overflow-x-hidden overflow-y-scroll">
            <div className='absolute top-0 w-full pl-3'>
              {// Main Tabs 
                employeeTabs.map((tab, indx) =>
                  <Tab key={"TAB_" + indx} info={tab} />
                )
              }
              {/* Show / hide Tab */}
              {session?.usuario?.rol === 'Administrador' &&
                <Tab
                  onClick={() => setAdminTabsVisible(p => !p)}
                  info={{
                    to: null,
                    content: "Administración",
                    icon: adminTabsVisible ?
                      <MyIcons.Down size="28px" /> :
                      <MyIcons.Right size="28px" />
                  }} />
              }{ /* Admin Tabs*/
                adminTabsVisible && session?.usuario?.rol === 'Administrador' &&
                <div className='duration-200 group-hover:pl-3 group-hover:delay-300 '>
                  {adminTabs.map((tab, indx) =>
                    <Tab key={"TAB_" + indx} info={tab} />
                  )}
                </div>
              }
            </div>
          </div>
        </div>
        {/* Bottom Tabs */
        
        }
        <div className="flex flex-[0.20] w-full ">
          <div className="relative w-full h-full overflow-x-hidden overflow-y-scroll">
            <div className='absolute top-0 w-full pl-3'>
              <Tab info={{
                to: '/perfil', content: 'Perfil', icon: <MyIcons.Profile size={"21px"} />
              }} />
              <Tab
                onClick={signOut}
                info={{
                  to: '/exit', content: 'Cerrar Sesión', icon: <MyIcons.Exit size={"20px"} />
                }} />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppBar