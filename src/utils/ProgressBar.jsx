import React from 'react'

const ProgressBar = ({ title, perValue, color, maxValue, batProcent, batAmount }) => {
    // console.log(batProcent);
    return (
        <div className="mt-[-10px] py-2 ">
            <div className="">{title}</div>
            <div className=" flex items-center justify-between gap-2">
                {/* cast type of value to tstring */}
                {batAmount && batAmount} {/* add to breagde amount sum for all and view*/}
                <progress className={`progress w-full ${color}`} value={batProcent} max={perValue || "100"}></progress>
                <div className="flex items-center justify-end w-36">{perValue}% / {batProcent && batProcent + "%"}</div>
            </div>
        </div>
    )
}

export default ProgressBar