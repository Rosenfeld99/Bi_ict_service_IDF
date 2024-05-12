import React from 'react'
import { BsBarChartFill } from 'react-icons/bs'
export default function HorizontalProgressBar({ title, perValue, colorBar }) {
    return (
        <div className="bg-primary flex items-center justify-center gap-2 p-3 lg:px-8 rounded-lg h-fit w-56">
            <div className=" flex flex-col items-center justify-center gap-5 mx-2">
                <div className=" text-xl font-semibold p-3 rounded-full shadow-lg">{perValue && perValue + "%"}</div>
                <div className="text-md font-semibold text-center">{title && title}</div>
            </div>
            <div className="flex relative flex-col flex-nowrap justify-end w-10 h-[10vw] bg-blue-200 rounded-xl overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className=" absolute bottom-0 right-0 mx-auto w-full pb-4 text-xl flex items-center text-blue-200 justify-center">
                    <BsBarChartFill />
                </div>
                <div className="rounded-sm overflow-hidden bg-blue-600" style={{ height: perValue && perValue?.toString() + "%" }}>
                </div>
            </div>
        </div>
    )
}








