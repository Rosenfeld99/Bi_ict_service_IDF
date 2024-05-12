import React from 'react'

const ProgressPei = ({ perValue, color, size, widthPei, sizeOfText }) => {
    return (
        <div className=" relative">
            <div className={`radial-progress ${color} relative mt-0 mr-0 z-30 rounded-full overflow-hidden `} style={{ "--value": perValue, "--size": `${size}`, "--thickness": `${widthPei}` }} role="progressbar"><span className={`text-black font-semibold ${sizeOfText}`}>{perValue}%</span></div>
            <div className="radial-progress text-gray-300 absolute top-0 right-0 z-10 " style={{ "--value": 100, "--size": `${size}`, "--thickness": `${widthPei}` }} role="progressbar"></div>
        </div>)
}

export default ProgressPei