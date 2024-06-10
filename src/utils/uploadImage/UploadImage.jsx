import React, { useEffect, useState } from 'react'
import icons from '../icons/icons'
import useDataStore from '../../hooks/useDataStore'

export default function UploadImage({ sizeImage, newImage, setNewImage, position }) {
    const { HandleGetImages } = useDataStore()

    const [uploadImage, setUploadImage] = useState(false)
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

    useEffect(() => {
        console.log(newImage);
    }, [newImage])


    return (
        <>
            <div className="border-r-2 border-secoundary my-3"></div>
            {/* upload image */}
            {!uploadImage && (
                <div className="flex justify-center items-center m-3">
                    <div className={`dropdown ${position} dropdown-hover`}>
                        <button className="btn btn-circle">
                            <icons.AddImage className="text-secondary" size={20} />
                        </button>
                        <ul tabIndex={0} className={`dropdown-content z-50 border border-error menu shadow shadow-accent_bg rounded-box w-60  ${customStyleBgColors}`}>
                            <li className='border border-dashed border-w-5 border-accent_bg outline-none' onClick={() => { setUploadImage(true) }}>
                                <button className="btn">
                                    <a href=" "
                                        target='_blank'
                                        className='w-full h-full flex justify-center items-center'>
                                        <div className="flex gap-3 items-center">
                                            <icons.CloudUpload size={20} className='text-secoundary' />
                                            <div className='font-semibold'>
                                                העלה תמונה
                                            </div>
                                        </div>
                                    </a>
                                </button>
                            </li>
                            <li className='w-full outline-none active:bg-transparent'>
                                <div className="py-3 flex items-center text-sm text-secoundary before:flex-1 before:border-t before:border-secoundary before:me-6 after:flex-1 after:border-t after:border-secoundary after:ms-6 dark:text-secoundary dark:before:border-secoundary dark:after:border-secoundary">
                                    OR
                                </div>
                            </li>
                            <li>
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    defaultValue=""
                                    onChange={(e) => setNewImage(e.target.value)}
                                >
                                    <option disabled >בחר תמונה מהרשימה</option>  <option value="גדוד 108">גדוד 108</option>
                                    <option value="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg">גדוד 102</option>
                                    <option value="גדוד 991">גדוד 991</option>
                                </select>
                                <button className="btn w-full my-2" onClick={() => { console.log("momo"); }}>החל תמונה</button>
                            </li>

                        </ul>

                    </div>
                </div>
            )}

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
                    <img src={newImage != "" ? image : ""} />
                </div>
            </div>
        </>
    )
}
