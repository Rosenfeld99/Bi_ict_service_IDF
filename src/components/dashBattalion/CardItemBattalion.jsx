import React from 'react'
import ProgressBar from '../../utils/ProgressBar'
import ProgressPei from '../../utils/ProgressPei'
// import battLogo from "../../../public/battLogo.png"

export default function CardItemBattalion({ item }) {
    // console.log(item);
    const customStyleBgColors = 'text-secoundary dark:text-dark_secoundary bg-accent_bg dark:bg-dark_accent'
    const customStyleBgColorsText = 'text-secoundary dark:text-dark_accent'
    const customStyleBgCommentsHeader = 'bg-accent_bg dark:bg-dark_accent_bg text-secoundary dark:text-dark_secoundary'
    const customStyleBgComments = 'bg-accent_bg dark:bg-dark_accent_bg text-secoundary dark:text-dark_secoundary'

    const innerColorProgress = (item, isInMeans) => {
        if (isInMeans) {
            if (((item.totalTypePercent / item.procent) * 100) > 80) {
                return "progress-info"
            } else if (((item.totalTypePercent / item.procent) * 100) < 50) {
                return "progress-error"
            } else {
                return "progress-warning"
            }
        } else {
            if (((item.totalSumBattalion / item.percentOfUnit) * 100) > 80) {
                return "progress-info"
            } else if (((item.totalSumBattalion / item.percentOfUnit) * 100) < 50) {
                return "progress-error"
            } else {
                return "progress-warning"
            }
        }
    }
    return (
        <div className="rounded-lg overflow-hidden flex flex-col shadow-md border">
            <progress className={`progress w-full rounded-none ${innerColorProgress(item, false)}`} value={((item.totalSumBattalion / item.percentOfUnit) * 100)} max="100">90</progress>
            <div className="pt-2 mb-5 px-3 md:px-5 lg:px-8">
                <div className=" flex items-center justify-between mb-4 gap-4">
                    <div className=" flex items-center gap-2">
                        <div className=" font-semibold text-center">{item.battalionName}</div>
                        <img className='w-8 rounded-lg shadow-sm' src={item.imageURL} alt="סמל גדוד" />
                    </div>
                    <div>
                        <span className=''>
                            {item.totalSumBattalion + "%"} / {" "}
                        </span>
                        <span className='font-semibold'>
                            {item.percentOfUnit + "%"}
                        </span>
                    </div>
                </div>
                <div className="h-44 overflow-auto p-3">
                    {item.means.map((bat) => (
                        <div key={bat.type_id}>
                            {/* {console.log(bat)} */}
                            <ProgressBar batAmount={bat?.amount} batProcent={bat?.procent} color={innerColorProgress(bat, true)} perValue={bat.totalTypePercent} title={bat.meansName + (bat.nameType && "-(" + bat.nameType + ")")} maxValue={bat.procent} />
                        </div>
                    ))}
                </div>
                {/* comments */}
                <div className=" flex items-center gap-4 mt-4">
                    <div className={`flex flex-col w-full shadow-md rounded-b-xl ${""}`}>
                        <div className={`border-b rounded-t-xl py-2 text-center font-bold ${customStyleBgCommentsHeader}`}>
                            הערות
                        </div>
                        <div className="max-h-20 min-h-20 w-full min-w-16 overflow-y-auto">
                            {item.means?.map((mean, index) => (
                                <p key={index} className="mt-2 mb-2 text-gray-500 dark:text-neutral-400 text-start px-1">
                                    {mean.comments === "" ? "-----" : (<><b>{mean.meansName}</b> : {mean.comments}</>)}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}





