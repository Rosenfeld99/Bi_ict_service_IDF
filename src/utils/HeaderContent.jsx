import React, { useContext, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import ModalSider from '../components/modalSider/ModalSider'
import { ContextStore } from '../context/ContextStore'
import AddUser from '../pages/AddUser'

const HeaderContent = ({ btnAdd, title, numOfTitle, placeholderTitle, handleSearch, onClickBtn }) => {
    const [input, setInput] = useState("")
    const { open, setOpen } = useContext(ContextStore);

    const modalBtn = <button onClick={() => { onClickBtn, setOpen(true) }} className=" bg-secoundary text-primary dark:bg-dark_secoundary dark:text-primary py-2 px-5 rounded-3xl">{btnAdd}</button>

    return (
        <div>
            {/* header content */}
            <div className=" flex items-center justify-between pt-14 pb-6">
                <div className="flex items-center gap-3 font-semibold text-md">
                    <div className=" text-neutral dark:text-dark_neutral">{numOfTitle}</div>
                    <div className=" text-secoundary dark:text-dark_accent">{title}</div>
                </div>

                {/* search and button add  */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 font-semibold text-md">
                        <div className=" relative text-neutral dark:text-dark_neutral bg-accent_bg dark:bg-dark_accent rounded-3xl"><input value={input} onChange={(e) => {
                            setInput(e.target.value)
                            handleSearch(e.target.value)
                        }} className='bg-accent_bg dark:bg-dark_accent placeholder:text-[#5f6266] dark:placeholder:text-primary py-2 px-5 rounded-3xl outline-none' type="text" placeholder={placeholderTitle} />
                            <div className=" dark:text-primary absolute text-3xl m-1.5 mx-3 pr-1 left-0 top-0 dark:bg-dark_accent bg-accent_bg text-[#5f6266]">
                                {!input?.length > 0 ? <CiSearch /> :
                                    <IoMdClose className='cursor-pointer' onClick={() => setInput("")} />}
                            </div>
                        </div>

                        {btnAdd == "הוסף חטיבה"
                            ? (
                                <button onClick={onClickBtn} className=" bg-secoundary text-primary dark:bg-dark_secoundary dark:text-primary py-2 px-5 rounded-3xl">
                                    {btnAdd}
                                </button>
                            ) : (
                                <ModalSider modalBtn={modalBtn}>
                                    <>
                                        <AddUser />
                                    </>
                                </ModalSider>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderContent