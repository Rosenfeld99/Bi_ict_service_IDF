import React, { useEffect, useState } from 'react'
import UploadImage from './uploadImage/UploadImage'

const HeaderCreateData = ({ btnAdd, delBtn, isVlaidation, placeholderTitle, handleSearch, onClickBtnAdd, input, imageUrl, onClickBtnDel }) => {
    const [newImage, setNewImage] = useState("")
    const [changeInput, setChangeInput] = useState(input)

    useEffect(() => {
        handleSearch(input, newImage)
    }, [newImage])

    return (
        <div className=" flex items-center justify-between pt-14 pb-6">

            {/* header content */}
            <div className="relative text-neutral dark:text-dark_neutral bg-accent_bg dark:bg-dark_accent">
                <div className="flex bg-accent">

                    {/* name brigade */}
                    <input value={input} autoFocus
                        onChange={(e) => {
                            setChangeInput(e.target.value)
                            handleSearch(e.target.value, newImage)
                        }}
                        className='bg-accent dark:bg-dark_accent text-2xl placeholder:text-neutral placeholder:font-semibold dark:placeholder:text-primary w-[18.7vw] min-w-[100px] py-4 px-5 outline-none' type="text"
                        placeholder={placeholderTitle} />
                    <UploadImage sizeImage={"w-16"} setNewImage={setNewImage} newImage={imageUrl} position={"dropdown-bottom"} />
                </div>
            </div>

            {/* search and button add  */}
            <div className=" flex items-center gap-4">
                {delBtn && <button onClick={onClickBtnDel} className={` bg-error text-primary dark:bg-dark_secoundary dark:text-primary py-2 px-5 rounded-3xl`}>
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