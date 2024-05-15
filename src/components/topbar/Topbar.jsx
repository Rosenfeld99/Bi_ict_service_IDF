import React, { useContext, useState } from 'react'
import { FaRegFileExcel, FaUser } from 'react-icons/fa'
import { MdLightMode, MdModeNight } from 'react-icons/md'
import useDataStore from '../../hooks/useDataStore'
import useTheme from '../../hooks/useTheme'
import ModalSider from '../modalSider/ModalSider'
import SystemStract from '../../pages/SystemStract'
import icons from '../../utils/icons/icons'
import { ContextStore } from '../../context/ContextStore'


const Topbar = ({ title, showTheme, toggelExcle, ManageSystem }) => {
  const { user, open, setOpen } = useContext(ContextStore);;

  const [theme, toggleTheme] = useTheme();
  // console.log("theme ", theme);

  const modalBtn = <button onClick={() => setOpen(true)}>{<icons.Settings className=' text-secoundary dark:text-dark_accent text-2xl w-full h-full flex items-center justify-center' />}</button>
  return (
    <div >
      <div className="flex items-center justify-between">
        {/* title page */}
        <div className="text-xl font-bold dark:text-primary select-none">{title}</div>

        <div className=" flex items-center gap-8">

          {/* theme mode toggle */}
          {showTheme && <div onClick={toggleTheme} className=" cursor-pointer border-2 text-xl  border-secoundary rounded-lg p-1 text-secoundary dark:text-dark_accent dark:border-dark_accent">
            {theme == "light" ?
              <MdModeNight />
              :
              <MdLightMode />
            }
          </div>}

          {ManageSystem &&
            <ModalSider modalBtn={modalBtn}>
              <SystemStract />
            </ModalSider>
          }

          {/* excle icon download */}
          {toggelExcle && <div className=" border-2 text-xl cursor-pointer border-secoundary rounded-full p-1 text-secoundary dark:text-dark_accent dark:border-dark_accent">
            <FaRegFileExcel />
          </div>}

          {/* user info */}
          <div className=" flex items-center gap-2 cursor-pointer select-none">
            <div className=" bg-[#f0def4] dark:bg-dark_neutral text-2xl rounded-full overflow-hidden text-secoundary pt-2 px-1 dark:text-dark_accent dark:border-dark_accent">
              <FaUser />
            </div>
            <div className=" text-sm font-semibold text-neutral dark:text-primary">
              {user ? user?.userName : "אורח"}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Topbar