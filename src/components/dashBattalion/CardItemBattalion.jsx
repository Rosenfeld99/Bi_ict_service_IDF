import React from 'react'
import ProgressBar from '../../utils/ProgressBar'
import ProgressPei from '../../utils/ProgressPei'

export default function CardItemBattalion() {
    const title = "גדוד 108"
    const totalSumBattalion = "38"
    const percentOfUnit = "40"

    return (
        <div className="border p-3 md:p-5 lg:p-8 rounded-lg flex flex-col gap-1 bg-primary">

            <div className=" flex items-center justify-between mb-4 gap-5">
                <div className=" font-semibold">{title}</div>
                <div>{totalSumBattalion} / {percentOfUnit}</div>
            </div>

            {/* progress bar */}
            <ProgressBar color={"progress-info"} perValue={"70"} title={"כלי תקשוב"} />
            <ProgressBar color={"progress-info"} perValue={"70"} title={"כלי תקשוב"} />
            <ProgressBar color={"progress-info"} perValue={"70"} title={"כלי תקשוב"} />
            <ProgressBar color={"progress-info"} perValue={"70"} title={"כלי תקשוב"} />
            <div className=" flex items-center gap-4">
                <ProgressPei perValue={70} color={"text-[#48CFAE]"} size={"5vw"} widthPei={"0.5vw"} sizeOfText={'text-lg'} />
                <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 w-full">
                    <div class="bg-gray-100 border-b rounded-t-xl py-2 text-center dark:bg-neutral-900 dark:border-neutral-700 font-bold">
                        הערות
                    </div>
                    <div className="max-h-40 min-h-20 w-full min-w-16 border overflow-y-auto">
                        <p className="mt-2 text-gray-500 dark:text-neutral-400 px-1">
                            {/* --- */}
                            moshe
                            {/* With supporting text below as a natural lead-in to additional content. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto perferendis soluta et necessitatibus numquam, hic voluptates asperiores consequatur. Saepe cumque esse repudiandae eos vero iusto dolorum hic sunt placeat dicta? */}
                        </p>
                    </div>
                </div>

            </div>

        </div>
       
    )
}
