import React from 'react'
import CardItemBattalion from './CardItemBattalion'
import ProgressPei from '../../utils/ProgressPei'
import HorizontalProgressBar from '../../utils/HorizontalProgressBar'
import { Link } from 'react-router-dom';
import icons from '../../utils/icons/icons'
import { fixAndReturnNumber } from '../../utils/func';

export default function CardListBattalion({ item }) {

    // console.log(item);
    return (
        <div className='flex-1 flex flex-col gap-5'>
            <div className="flex justify-end font-semibold">
                <div className=" mx-4 flex items-center p-2">
                    {item?.totalSumQualification
                        ? fixAndReturnNumber(item?.totalSumQualification)
                        : <span className="loading loading-ring loading-md"></span>}
                    /100
                </div>
                <Link to="/" className=" mx-4 flex items-center border rounded-lg p-2">
                    <icons.Back size={20} />
                </Link>
            </div>
            <div className="flex justify-center xl:justify-start items-center gap-3 md:gap-5 xl:gap-10 2xl:gap-14 overflow-auto custom-scrollbar py-2 w-[78vw] lg:w-[81vw] xl:w-[84vw]  2xl:w-[88vw] ">
                <div className="bg-primary p-3 px-5 lg:px-8 w-fit rounded-lg">
                    <ProgressPei perValue={fixAndReturnNumber(item?.totalSumQualification)} color={"text-[#48CFAE]"} size={"10vw"} widthPei={"0.7vw"} sizeOfText={'text-lg'} />
                </div>
                {item?.totalViewQualification?.map((item, index) => (
                    <div key={index} className="">
                        <HorizontalProgressBar key={index} inValue={item?.realProcent} perValue={item?.procent} title={item.meansName} />
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