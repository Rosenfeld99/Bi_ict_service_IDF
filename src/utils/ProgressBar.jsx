import React from 'react'

const ProgressBar = ({ title, perValue, color, maxValue }) => {
    return (
        <div className="mt-[-10px]">
            <div className="">{title}</div>
            <div className=" flex items-center justify-between gap-2">
                {/* cast type of value to tstring */}
                <progress className={`progress w-full ${color}`} value={perValue} max={maxValue || "100"}></progress>
                <div className="">{perValue}%</div>
            </div>
        </div>
    )
}

export default ProgressBar