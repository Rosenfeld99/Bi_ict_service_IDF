import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import icons from '../utils/icons/icons'
import { generateID } from '../utils/func'
import useDataStore from '../hooks/useDataStore'

export default function SystemStract() {
    const { systemStract, setSystemStract } = useDataStore()
    const [isNew, setIsNew] = useState(true)
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const [formInputs, setFormInputs] = useState({
        meanName: "",
        typeOption: [{ value: "", valId: generateID() }],
        amount: false,
        ict: false,
        arm: false,
        id: generateID(),
        qualificationsColorHigh: 80,
        qualificationsColorCenter: 50,
        qualificationsColorLow: 0
    },)

    const handleAddNewLine = () => {
        const allTypes = formInputs.typeOption || []
        allTypes.push({ value: "", valId: generateID() })
        setFormInputs({ ...formInputs, typeOption: allTypes })
    }

    const handleChangeTyoeArray = (val, valId) => {
        const updatedItems = [...formInputs.typeOption].map(item =>
            item.valId === valId ? { ...item, value: val } : item
        );
        setFormInputs({ ...formInputs, typeOption: updatedItems });
    }

    const handleClickBtn = () => {
        if (isNew) {
            const allSystem = [...systemStract]
            let checkOfEmpty = { ...formInputs }
            checkOfEmpty.typeOption = checkOfEmpty.typeOption.filter((item) => item.value != "")
            allSystem?.push(checkOfEmpty)
            setSystemStract(allSystem)
        } else {
            let allSystem = [...systemStract]
            for (let i = 0; i < allSystem.length; i++) {
                if (allSystem[i]?.id === formInputs?.id) {
                    let checkOfEmpty = { ...formInputs }
                    checkOfEmpty.typeOption = checkOfEmpty.typeOption.filter((item) => item.value != "")
                    allSystem[i] = checkOfEmpty
                }

            }
            setSystemStract(allSystem)
        }
        setIsNew(true)
        setFormInputs({
            meanName: "",
            typeOption: [{ value: "", valId: generateID() }],
            amount: false,
            ict: false,
            arm: false,
            id: generateID(),
        },)
    }

    const handelDeleteLine = (id) => {
        let filterdMeans = [...formInputs.typeOption]
        filterdMeans = filterdMeans?.filter((item) => item?.valId != id)
        setFormInputs({ ...formInputs, typeOption: filterdMeans })
    }


    return (
        <>
            {/* part one */}
            {systemStract?.length > 0 && <div className=" border-r-2 border-primary p-5">

                <div className=" flex-col flex gap-3 py-10">

                    {systemStract?.map((item, index) => (
                        <button onClick={() => [
                            setFormInputs(item),
                            setIsNew(false)
                        ]} className=" justify-between text-md font-semibold flex items-center gap-4 w-48 bg-accent_bg p-3">
                            <div className="">{item?.meanName}</div>
                            {<icons.Pen className=' text-2xl' />}
                        </button>
                    ))}
                </div>
            </div>}

            {/* part two */}
            <div className="p-5">
                <div className="py-10 relative flex flex-col items-center justify-center">
                    <div className="text-2xl text-primary font-semibold">
                        הגדר נתוני מערכת
                    </div>
                    {/*  */}
                    <ul className="relative flex flex-col gap-2 py-10 ">
                        {/* הכנס שם אמצעים  */}
                        <li className=' flex gap-3'>
                            <div className=" flex flex-col">
                                <span className="size-7 flex justify-center items-center font-semibold flex-shrink-0 bg-white border border-gray-200 text-gray-800 rounded-full">
                                    1
                                </span>
                                <div className=' border-r-[3px] mr-3 mt-2 w-3  h-full' />
                            </div>
                            <div className="flex flex-col gap-1 pb-10">
                                <input value={formInputs?.meanName} required onChange={(e) => setFormInputs({ ...formInputs, meanName: e.target.value })} placeholder='הכנס שם אמצעים' className=" shadow-[#0000003c] shadow-md outline-none bg-primary px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-white" />
                            </div>
                        </li>
                        {/* הכנס סוג אמצעים */}
                        <li className=' flex gap-3'>
                            <div className=" flex flex-col">
                                <span className="size-7 flex justify-center items-center font-semibold flex-shrink-0 bg-white border border-gray-200 text-gray-800 rounded-full">
                                    2
                                </span>
                                <div className=' border-r-[3px] mr-3 mt-2 w-3  h-full' />
                            </div>
                            <div className="flex flex-col gap-1 pb-10">
                                {formInputs?.typeOption?.map((item, index) => (<div onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)} className='relative'>
                                    <input value={item.value} key={item.valId} onChange={(e) => handleChangeTyoeArray(e.target.value, item.valId)} placeholder='הכנס סוג אמצעים' className="shadow-[#0000003c] shadow-md outline-none bg-primary px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-white" />
                                    {hoveredIndex === index && (
                                        <div onClick={() => handelDeleteLine(item?.valId)} className="absolute top-0 left-0 tooltip tooltip-right" data-tip="מחיקת שורה">
                                            <button className="flex items-center gap-3 p-2 bg-primary text-red-500"> <FaTrash /></button>
                                        </div>
                                    )}                    </div>))}
                                <button onClick={handleAddNewLine} className=" text-start text-xs bg-accent w-fit text-black dark:bg-dark_secoundary dark:text-primary py-1 px-2 rounded-3xl">
                                    הוסף שורה
                                </button>
                            </div>
                        </li>
                        {/* כמות של אמצעים */}
                        <li className=' flex gap-3'>
                            <div className=" flex flex-col">
                                <span className="size-7 flex justify-center items-center font-semibold flex-shrink-0 bg-white border border-gray-200 text-gray-800 rounded-full">
                                    3
                                </span>
                                <div className=' border-r-[3px] mr-3 mt-2 w-3  h-full' />
                            </div>
                            <div className="flex flex-col gap-1 w-full pb-10">
                                <div className="bg-primary px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-white shadow-[#0000003c] shadow-md">סמן מה מה נדרש</div>
                                <div className=" flex items-center gap-3">
                                    <input onChange={(e) => setFormInputs({ ...formInputs, amount: e.target.checked })} type='checkbox' checked={formInputs.amount} className=" bg-primary px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-white" />
                                    <div className=" text-primary">כמות של אמצעים</div>
                                </div>
                                <div className=" flex items-center gap-3">
                                    <input onChange={(e) => setFormInputs({ ...formInputs, ict: e.target.checked })} type='checkbox' checked={formInputs.ict} className=" bg-primary px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-white" />
                                    <div className=" text-primary">תקינות תקשובית</div>
                                </div>
                                <div className=" flex items-center gap-3">
                                    <input onChange={(e) => setFormInputs({ ...formInputs, arm: e.target.checked })} type='checkbox' checked={formInputs.arm} className=" bg-primary px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-white" />
                                    <div className=" text-primary">תקינות חימושית</div>
                                </div>

                            </div>
                        </li>
                        {/* כמות של אמצעים */}
                        <li className=' flex gap-3'>
                            <div className=" flex flex-col">
                                <span className="size-7 flex justify-center items-center font-semibold flex-shrink-0 bg-white border border-gray-200 text-gray-800 rounded-full">
                                    4
                                </span>
                                {/* <div className=' border-r-[3px] mr-3 mt-2 w-3  h-full' /> */}
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="tooltip tooltip-top text-start" data-tip="הגדרת כשירות צבעים עד 100%">
                                    <div className="bg-primary px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-white shadow-[#0000003c] shadow-md">הגדר צבעי כשירות</div>
                                </div>
                                <div className=" flex items-center gap-3">
                                    <div className=" relative">
                                        {<icons.Percentage className='absolute left-0 bg-success h-full text-white w-5' />}
                                        <input value={formInputs.qualificationsColorHigh} onChange={(e) => setFormInputs({ ...formInputs, qualificationsColorHigh: parseInt(e.target.value) })} type='number' min={formInputs.qualificationsColorCenter || 1} max={100} checked={formInputs.amount} className=" bg-primary px-3 py-1.5 outline-none text-sm font-medium text-gray-800 shadow-[#0000003c] shadow-md dark:text-white border-l-8 border-success w-20" />
                                    </div>
                                    <div className=" text-primary">כשירות גבוהה</div>
                                </div>
                                <div className=" flex items-center gap-3">
                                    <div className="relative">
                                        {<icons.Percentage className='absolute left-0 bg-warning h-full text-white w-5' />}
                                        <input value={formInputs.qualificationsColorCenter} onChange={(e) => setFormInputs({ ...formInputs, qualificationsColorCenter: parseInt(e.target.value) })} min={formInputs.qualificationsColorLow || 1} max={formInputs.qualificationsColorHigh - 1} type='number' checked={formInputs.ict} className=" bg-primary px-3 py-1.5 outline-none text-sm font-medium text-gray-800 shadow-[#0000003c] shadow-md dark:text-white border-l-8 border-warning w-20" />
                                    </div>
                                    <div className=" text-primary">כשירות בינונית</div>
                                </div>
                                <div className=" flex items-center gap-3">
                                    <div className="relative">
                                        {<icons.Percentage className='absolute left-0 bg-error h-full text-white w-5' />}
                                        <input value={formInputs.qualificationsColorLow} onChange={(e) => setFormInputs({ ...formInputs, qualificationsColorLow: parseInt(e.target.value) })} type='number' min={1} max={formInputs.qualificationsColorCenter - 1} checked={formInputs.arm} className=" bg-primary px-3 py-1.5 outline-none text-sm font-medium text-gray-800 shadow-[#0000003c] shadow-md dark:text-white border-l-8 border-error w-20" />
                                    </div>
                                    <div className=" text-primary">כשירות נמוכה</div>
                                </div>

                            </div>
                        </li>
                    </ul>
                </div>
                <button disabled={!formInputs.meanName} onClick={handleClickBtn} className={`${!formInputs.meanName && "opacity-50 cursor-not-allowed"} flex items-center justify-center text-sm bg-success mx-auto text-primary dark:bg-dark_secoundary dark:text-primary py-2 px-10 rounded-3xl`}>
                    {isNew ? "הוספה" : "שמירה"}
                </button>
            </div>
        </>)
}
