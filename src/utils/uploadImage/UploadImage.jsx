import React, { useEffect, useState } from 'react'
import icons from '../icons/icons'
import useDataStore from '../../hooks/useDataStore'

export default function UploadImage({ sizeImage, newImage, setNewImage, position }) {
    const { HandleGetImages } = useDataStore()

    const [uploadImage, setUploadImage] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(false)
    const [image, setImage] = useState("")

    // custom css
    const customStyleBgColors = 'text-secoundary dark:text-dark_secoundary bg-primary dark:bg-dark_accent'

    const handleNewImage = () => {
        const uploadImage = HandleGetImages("", true)
        if (uploadImage) {
            setNewImage(uploadImage)
            setImage(uploadImage)
        }
        setNewImage("https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg")
    }

    return (
        <>
            <div className="border-r-2 border-secoundary my-3"></div>
            {/* upload image */}
            {!uploadImage && (
                <div className="flex justify-center items-center m-3">
                    <div className="relative">
                        <button className="btn btn-circle " onClick={() => setOpenDropdown(!openDropdown)}>
                            <icons.AddImage className="text-secondary" size={20} />
                        </button>
                        {openDropdown && (
                            <div onClick={(e) => e.stopPropagation()}
                                className="absolute -right-44 -top-3 z-[9999] h-40 w-40 bg-secoundary rounded-md shadow-lg">
                                <div className="flex">
                                    <div className='shadow-sm mt-1 mx-1'>
                                        <icons.Close onClick={() => setOpenDropdown(false)} />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button className="bg-white rounded-md shadow-md m-2 px-2 py-2" onClick={() => { setUploadImage(true); setOpenDropdown(false) }}>
                                        <a href=" "
                                            target='_blank'
                                        >
                                            <div className="flex font-semibold">
                                                <icons.CloudUpload size={15} className='text-black mx-1' />
                                                העלה תמונה
                                            </div>
                                        </a>
                                    </button>
                                </div>
                                <div className="px-3 flex items-center text-sm text-white before:flex-1 before:border-t before:border-white before:me-6 after:flex-1 after:border-t after:border-white after:ms-6 dark:text-wborder-white dark:before:border-white dark:after:border-white">
                                    OR
                                </div>
                                <div className="flex justify-center">
                                    <select
                                        className="select select-bordered w-34 rounded-md my-1"
                                        defaultValue=">בחר תמונה</"
                                        onChange={(e) => setNewImage(e.target.value)}>
                                        <option disabled >בחר תמונה</option>
                                        <option value="גדוד 108">גדוד 108</option>
                                        <option value="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg">גדוד 102</option>
                                        <option value="גדוד 991">גדוד 991</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>)}

            {/* upload image btn*/}
            {uploadImage &&
                <div className="flex items-center justify-center m-3">

                    <div className="lg:tooltip" data-tip="התמונה הנבחרת שהעלת ל SharePoint">
                        <button className="btn outline-none" onClick={() => { setUploadImage(false), handleNewImage() }}>
                            <div className="flex gap-3 items-center">
                                <icons.CloudUpload size={20} className='text-secoundary' />
                                <div className='font-semibold'>
                                    החל תמונה
                                </div>
                            </div>
                        </button></div>
                </div>
            }

            {/* image brigade */}
            <div className="avatar m-1">
                <div className={`${sizeImage} mask mask-squircle`}>
                    <img src={newImage ? newImage : image} />
                    {/* <img src={newImage != "" ? image : ""} /> */}
                </div>
            </div>
        </>
    )
}
