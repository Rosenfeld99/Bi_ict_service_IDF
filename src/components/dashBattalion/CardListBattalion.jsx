import React from 'react'
import CardItemBattalion from './CardItemBattalion'
import ProgressPei from '../../utils/ProgressPei'
import HorizontalProgressBar from '../../utils/HorizontalProgressBar'
export default function CardListBattalion({ item }) {

    console.log(item);
    return (
        <div className='flex-1 flex flex-col gap-5'>
            <div className="flex justify-end font-semibold">
                {item?.totalSumQualification
                    ? item?.totalSumQualification
                    : <span className="loading loading-ring loading-md"></span>}
                /100
            </div>
            <div className="flex justify-center xl:justify-start items-center gap-3 md:gap-5 xl:gap-10 2xl:gap-14 overflow-auto custom-scrollbar py-2">
                <div className="bg-primary p-3 px-5 lg:px-8 w-fit rounded-lg">
                    <ProgressPei perValue={item?.totalSumQualification} color={"text-[#48CFAE]"} size={"10vw"} widthPei={"0.7vw"} sizeOfText={'text-lg'} />
                </div>
                {item?.totalViewQualification?.map((item, index) => (
                    <div key={index} className="">
                        <HorizontalProgressBar key={index} perValue={item.procent} title={item.meansName} />
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2 xl:gap-5 2xl:gap-8 px-10'>
                {item?.battalion?.map((item, index) => (
                    <CardItemBattalion key={item.battalion_id} item={item} />
                )
                )}
            </div>
        </div>
    )
}