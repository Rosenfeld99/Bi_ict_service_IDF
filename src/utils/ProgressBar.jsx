import React from 'react'

const ProgressBar = ({ title, perValue, color, maxValue, batProcent, batAmount }) => {
    // console.log(batProcent);
    return (
        <div className="mt-[-10px] py-3 ">
            <div className="flex items-center justify-between">
                <div className="">{title}</div>
                <div className=" ">{perValue}% / {batProcent && batProcent + "%"}</div>
            </div>
            <div className=" flex items-center justify-between gap-2">
                {/* cast type of value to tstring */}
                {batAmount && batAmount} {/* add to breagde amount sum for all and view*/}
                <progress className={`progress w-full ${color}`} value={perValue} max={batProcent}></progress>
            </div>
        </div>
    )
}

export default ProgressBar