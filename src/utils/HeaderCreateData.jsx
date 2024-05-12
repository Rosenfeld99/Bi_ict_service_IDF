import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'

const HeaderCreateData = ({ btnAdd, delBtn,isVlaidation, placeholderTitle, handleSearch, onClickBtnAdd, input,onClickBtnDel }) => {
    // const [input, setInput] = useState("")

    return (
        <div className=" flex items-center justify-between pt-14 pb-6">

            {/* header content */}
            <div className=" relative text-neutral dark:text-dark_neutral bg-accent_bg dark:bg-dark_accent"><input value={input} autoFocus onChange={(e) => {
                // setInput(e.target.value)
                handleSearch(e.target.value)
            }} className='bg-accent_bg dark:bg-dark_accent placeholder:text-neutral placeholder:font-semibold dark:placeholder:text-primary w-[18.7vw] min-w-[100px] py-4 px-5 outline-none' type="text" placeholder={placeholderTitle} />
            </div>
            {/* search and button add  */}
            <div className=" flex items-center gap-4">
                {delBtn && <button onClick={onClickBtnDel} className={`${isVlaidation && " opacity-50 cursor-not-allowed"} bg-error text-primary dark:bg-dark_secoundary dark:text-primary py-2 px-5 rounded-3xl`}>
                    {delBtn}
                </button>}
                {btnAdd && <button onClick={onClickBtnAdd} disabled={isVlaidation} className={`${isVlaidation && " opacity-50 cursor-not-allowed"} bg-success text-primary dark:bg-dark_secoundary dark:text-primary py-2 px-5 rounded-3xl`}>
                    {btnAdd}
                </button>}
            </div>
        </div>
    )
}

export default HeaderCreateData