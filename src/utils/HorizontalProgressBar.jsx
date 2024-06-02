import React from 'react'
import { BsBarChartFill } from 'react-icons/bs'
import useDataStore from '../hooks/useDataStore'
export default function HorizontalProgressBar({ title, inValue, perValue, colorBar }) {
    const { systemStract } = useDataStore()
    // console.log(perValue);

    const findAndViewColorBySystemStract = () => {
        // console.log(systemStract);
        const singleItem = systemStract?.find(item => item?.meanName == title)
        if (perValue && inValue && (inValue / perValue * 100) < singleItem?.qualificationsColorCenter) {
            return "bg-[#FF5449]"
        } else if (perValue && inValue && (inValue / perValue * 100) >= singleItem?.qualificationsColorHigh) {
            return "bg-[#31AB70]"
        }
        else if (perValue && inValue && (inValue / perValue * 100) < singleItem?.qualificationsColorHigh && perValue > singleItem?.qualificationsColorLow) {
            return "bg-[#F4B400]"
        }
        else {
            return "bg-[#000]"
        }
    }
    const findAndViewColorLightBySystemStract = (isText) => {
        // console.log(systemStract);
        const singleItem = systemStract?.find(item => item?.meanName == title)
        // console.log(singleItem);
        if ((perValue && inValue && (inValue / perValue * 100)) < singleItem?.qualificationsColorCenter) {
            return isText ? "text-[#FFCDCA]" : "bg-[#FFCDCA]"
        } else if ((perValue && inValue && (inValue / perValue * 100)) >= singleItem?.qualificationsColorHigh) {
            return isText ? "text-[#C3E7D6]" : "bg-[#C3E7D6]"
        }
        else if ((perValue && inValue && (inValue / perValue * 100)) < singleItem?.qualificationsColorHigh && perValue > singleItem?.qualificationsColorLow) {
            return isText ? "text-[#FCE9B5]" : "bg-[#FCE9B5]"
        }
        else {
            return isText ? "text-[#0000004a]" : "bg-[#0000004a]"
        }
    }

    return (
        <div className="bg-primary flex items-center justify-center gap-2 p-3 lg:px-8 rounded-lg h-fit w-64">
            <div className=" flex flex-col items-center justify-center gap-5 mx-2">
                <div className=" text-md w-fit font-semibold flex items-center justify-center p-2 rounded-full border-2 border-[#9a9a9a27]">{inValue && inValue + "%"} / {perValue && perValue + "%"}</div>
                <div className="text-md font-semibold text-center">{title && title}</div>
            </div>
            <div className={`flex relative flex-col flex-nowrap justify-end w-10 h-[10vw] ${findAndViewColorLightBySystemStract(false)} rounded-xl overflow-hidden dark:bg-neutral-700`} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className={` absolute bottom-0 right-0 mx-auto w-full pb-4 text-xl flex items-center ${findAndViewColorLightBySystemStract(true)} justify-center`}>
                    <BsBarChartFill className=' absolute mb-4 z-20 drop-shadow-lg drop-shadow-black' />
                    {/* <BsBarChartFill className=' absolute mb-4 text-black z-10' /> */}
                </div>
                <div className={`rounded-sm overflow-hidden ${findAndViewColorBySystemStract()}`} style={{ height: perValue && inValue && (inValue / perValue * 100) + "%" }} />
            </div>
        </div>
    )
}








