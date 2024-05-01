import React from 'react'
import { BsBarChartFill } from 'react-icons/bs'

export default function HorizontalProgressBar({ title, perValue, colorBar }) {
    return (
        <div className="border bg-primary flex items-center justify-center gap-5 p-3 px-5 lg:px-8 w-fit rounded-lg">
            <div className=" flex flex-col items-center justify-center gap-4">
                <div className=" text-xl font-semibold">78%</div>
                <div className=" text-md">כלי תקשוב</div>
            </div>
            <div className="flex relative flex-col flex-nowrap justify-end w-10 h-[10vw] bg-blue-200 rounded-xl overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className=" absolute bottom-0 right-0 mx-auto w-full pb-4 text-xl flex items-center text-blue-200 justify-center">
                    <BsBarChartFill />
                </div>
                <div className="rounded-sm overflow-hidden bg-blue-600" style={{ height: perValue.toString()+"%" }}>
                </div>
            </div>
        </div>
    )
}
