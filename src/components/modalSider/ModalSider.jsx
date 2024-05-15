import React, { useContext, useRef, useState } from 'react'
import { ContextStore } from '../../context/ContextStore';
import icons from '../../utils/icons/icons'

const ModalSider = ({ modalBtn, children }) => {
  // const [open, setOpen] = useState(false)
  const { open, setOpen } = useContext(ContextStore);;
  const modalRef = useRef(null);


  const handleClickOutsideModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <React.Fragment>

      {/* modalBtn to display outside of the component */}
      {modalBtn}

      {open && <div
        className='bg-[#00000033] w-full min-h-screen absolute top-0 right-0 z-50 '
        onClick={handleClickOutsideModal}>

        {/* close btn */}
        <div ref={modalRef} className="w-fit bg-secoundary min-h-screen absolute top-0 left-0 z-50 flex-row-reverse flex ">
          <button onClick={() => setOpen(false)} className=" absolute top-0 right-0 w-8 h-8 flex items-center justify-center bg-accent rounded-l-xl  rounded-t-none shadow-[#0000003c] shadow-md">
            <icons.Close className=' w-full h-full p-1' />
          </button>

          {/* content */}
          {children}
        </div>
      </div>}
    </React.Fragment>
  )
}

export default ModalSider

