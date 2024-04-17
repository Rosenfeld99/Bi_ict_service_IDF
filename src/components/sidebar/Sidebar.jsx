import React from 'react'
import { GoDatabase } from 'react-icons/go'
import { IoMdHelp } from 'react-icons/io'
import { LuLayoutDashboard } from 'react-icons/lu'
import { TbUsers } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
import useDataStore from '../../hooks/useDataStore'

const Sidebar = () => {
  const listMenu = [
    { name: "דשבורד", routeName: "/", icon: <LuLayoutDashboard /> },
    { name: "משתמשים", routeName: "users", icon: <TbUsers /> },
    { name: "נתונים", routeName: "data", icon: <GoDatabase /> },
  ]

  const location = useLocation()
  const path = location.pathname
  // console.log(path);
  const { user } = useDataStore()

  return (
    <div className=' w-[10vw] max-w-32 min-w-28 flex flex-col items-center p-5 justify-between gap-20'>
      {/* LOGO */}
      <Link to={'/'}>
        <div className="text-xl font-bold text-primary">
          LOGO
        </div>
      </Link>
      {/* List menu */}
      <div className={`flex flex-col items-center justify-between ${user && "flex-1"}`}>

        {/* protected roures */}
        {user && <div className=" flex flex-col items-center gap-10">
          {listMenu.map((item, index) => (
            <div key={index}>
              {user.access == "user" ? <Link to={item.routeName} key={index}>
                {item.name == "דשבורד" && <div className={` flex flex-col p-2 items-center justify-center text-neutral w-[4vw] h-[4vw] min-w-[70px] min-h-[70px] max-w-[80px] max-h-[80px] rounded-lg ${path.substring(1) == item.routeName ? "bg-accent dark:bg-dark_accent" : path == "/" && item.name == "דשבורד" && "bg-accent dark:bg-dark_accent"}`} >
                  <div className="bg-[#f5f0dc] dark:bg-dark_primary dark:text-dark_neutral p-2 rounded-full text-xl">{item.icon}</div>
                  <div className="text-sm dark:text-dark_neutral">{item.name}</div>
                </div>}
              </Link> : (
                <Link to={item.routeName} key={index}>
                  <div className={` flex flex-col p-2 items-center justify-center text-neutral w-[4vw] h-[4vw] min-w-[70px] min-h-[70px] max-w-[80px] max-h-[80px] rounded-lg ${path.substring(1) == item.routeName ? "bg-accent dark:bg-dark_accent" : path == "/" && item.name == "דשבורד" && "bg-accent dark:bg-dark_accent"}`} >
                    <div className="bg-[#f5f0dc] dark:bg-dark_primary dark:text-dark_neutral p-2 rounded-full text-xl">{item.icon}</div>
                    <div className="text-sm dark:text-dark_neutral">{item.name}</div>
                  </div>
                </Link >
              )}
            </div>
          ))}
        </div>}
        {/* button ask for help */}
        <Link to={'/help'}>

          <div className="flex flex-col items-center justify-center">
            <div className="  bg-accent dark:bg-dark_accent w-[4vw] h-[4vw] min-w-[40px] min-h-[40px]  max-w-[80px] max-h-[80px] rounded-full flex flex-col items-center justify-center gap-2">
              <div className=" text-xl border-2 border-secoundary rounded-full p-2.5 text-secoundary dark:bg-dark_accent dark:border-dark_secoundary dark:text-dark_secoundary"><IoMdHelp /></div>
            </div>
            <div className="text-accent">עזרה</div>
          </div>
        </Link>


      </div>
    </div >
  )
}

export default Sidebar