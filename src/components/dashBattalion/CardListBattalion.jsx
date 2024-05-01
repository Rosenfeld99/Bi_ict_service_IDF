import React from 'react'
import CardItemBattalion from './CardItemBattalion'
import ProgressPei from '../../utils/ProgressPei'
import HorizontalProgressBar from '../../utils/HorizontalProgressBar'

export default function CardListBattalion() {
    return (
        <div className=' flex-1 flex flex-col gap-5'>
            <div className="flex justify-end font-semibold">
                סה”כ : 90/100
            </div>
            <div className="flex justify-between xl:justify-start items-center gap-3 md:gap-5 xl:gap-10 2xl:gap-14">
                <div className="bg-primary p-3 px-5 lg:px-8 w-fit rounded-lg border">

                    <ProgressPei perValue={70} color={"text-[#48CFAE]"} size={"10vw"} widthPei={"0.7vw"} sizeOfText={'text-lg'} />
                </div>
                {Array.from({ length: 4 }).map((item, index) => (
                    <HorizontalProgressBar perValue={78} />
                ))}
            </div>

            <div className=' grid grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5 xl:gap-10 2xl:gap-14'>
                {Array.from({ length: 4 }).map((item, index) => (
                    <CardItemBattalion key={index} />
                ))}
            </div>
        </div>
    )
}
