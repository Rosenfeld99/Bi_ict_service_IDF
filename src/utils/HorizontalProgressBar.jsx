import React, { useEffect } from 'react'
import { BsBarChartFill } from 'react-icons/bs'
import useDataStore from '../hooks/useDataStore'
export default function HorizontalProgressBar({ title, perValue, colorBar }) {
    const { systemStract } = useDataStore()

    useEffect(() => {
        findAndViewColorBySystemStract()
    }, [])

    const findAndViewColorBySystemStract = () => {
        console.log(systemStract);
        const singleItem = systemStract?.find(item => item?.meanName == title)
        if (perValue < singleItem?.qualificationsColorCenter) {
            return "bg-[#ff5449]"
        } else if (perValue >= singleItem?.qualificationsColorHigh) {
            return "bg-[#31ab70]"
        }
        else if (perValue < singleItem?.qualificationsColorHigh && perValue > singleItem?.qualificationsColorLow) {
            return "bg-[#f4b400]"
        }
        else {
            return "bg-[#000]"
        }
    }
    const findAndViewColorLightBySystemStract = () => {
        console.log(systemStract);
        const singleItem = systemStract?.find(item => item?.meanName == title)
        if (perValue < singleItem?.qualificationsColorCenter) {
            return "[#ffcdca]"
        } else if (perValue >= singleItem?.qualificationsColorHigh) {
            return "[#c3e7d6]"
        }
        else if (perValue < singleItem?.qualificationsColorHigh && perValue > singleItem?.qualificationsColorLow) {
            return "[#fce9b5]"
        }
        else {
            return "[#0000004a]"
        }
    }
    
    return (
        <div className="bg-primary flex items-center justify-center gap-2 p-3 lg:px-8 rounded-lg h-fit w-56">
            <div className=" flex flex-col items-center justify-center gap-5 mx-2">
                <div className=" text-xl font-semibold p-3 rounded-full shadow-lg">{perValue && perValue + "%"}</div>
                <div className="text-md font-semibold text-center">{title && title}</div>
            </div>
            <div className={`flex relative flex-col flex-nowrap justify-end w-10 h-[10vw] ${"bg-"+findAndViewColorLightBySystemStract()} rounded-xl overflow-hidden dark:bg-neutral-700`} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className={` absolute bottom-0 right-0 mx-auto w-full pb-4 text-xl flex items-center ${"text-"+findAndViewColorLightBySystemStract()} justify-center`}>
                    <BsBarChartFill className=' absolute mb-4 z-20'/>
                    <BsBarChartFill className=' absolute mb-4 text-black z-10' />
                </div>
                <div className={`rounded-sm overflow-hidden ${findAndViewColorBySystemStract()}`} style={{ height: perValue && perValue?.toString() + "%" }}>
                </div>
            </div>
        </div>
    )
}








