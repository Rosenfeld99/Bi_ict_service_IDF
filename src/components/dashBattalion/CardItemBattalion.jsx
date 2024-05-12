import React from 'react'
import ProgressBar from '../../utils/ProgressBar'
import ProgressPei from '../../utils/ProgressPei'
export default function CardItemBattalion({ item }) {
    console.log(item);
    const customStyleBgColors = 'text-secoundary dark:text-dark_secoundary bg-accent_bg dark:bg-dark_accent'
    const customStyleBgColorsText = 'text-secoundary dark:text-dark_accent'
    const customStyleBgCommentsHeader = 'bg-accent_bg dark:bg-dark_accent_bg text-secoundary dark:text-dark_secoundary'
    const customStyleBgComments = 'bg-accent_bg dark:bg-dark_accent_bg text-secoundary dark:text-dark_secoundary'
    return (
        <div className="rounded-lg overflow-hidden flex flex-col shadow-md border">
            <progress className="progress progress-accent w-full rounded-none" value={((item.percentOfUnit / item.totalSumBattalion) * 100)} max="100">90</progress>
            <div className="pt-2 mb-5 px-3 md:px-5 lg:px-8">
                <div className=" flex items-center justify-between mb-4 gap-4">
                    <div className=" font-semibold text-center">{item.battalionName}</div>
                    <div>
                        <span className=''>
                            {item.percentOfUnit + "%"} /
                        </span>
                        <span className='font-semibold'>
                            {item.totalSumBattalion + "%"}
                        </span>
                    </div>
                </div>
                <div className="h-44 overflow-auto p-3">
                    {item.means.map((bat) => (
                        <div key={bat.type_id}>
                            {console.log(bat)}
                            <ProgressBar color={"progress-info"} perValue={bat.procent} title={bat.meansName + (bat.nameType && "-(" + bat.nameType + ")")} maxValue={bat.totalTypePercent} />
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
                            <p className="mt-2 mb-2 text-gray-500 dark:text-neutral-400 text-center px-1">
                                {item.comments === "new comments" ? "-----" : item.comments}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}





