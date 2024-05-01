import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'

const HeaderCreateData = ({ btnAdd, placeholderTitle, handleSearch, onClickBtn }) => {
    const [input, setInput] = useState("")

    return (
        <div className=" flex items-center justify-between pt-14 pb-6">

            {/* header content */}
            <div className=" relative text-neutral dark:text-dark_neutral bg-accent_bg dark:bg-dark_accent"><input value={input} autoFocus  onChange={(e) => {
                setInput(e.target.value)
                handleSearch(e.target.value)
            }} className='bg-accent_bg dark:bg-dark_accent placeholder:text-neutral placeholder:font-semibold dark:placeholder:text-primary w-[18.7vw] min-w-[100px] py-4 px-5 outline-none' type="text" placeholder={placeholderTitle} />
            </div>
            {/* search and button add  */}
            <button onClick={onClickBtn} className=" bg-secoundary text-primary dark:bg-dark_secoundary dark:text-primary py-2 px-5 rounded-3xl">
                {btnAdd}
            </button>
        </div>
    )
}

export default HeaderCreateData