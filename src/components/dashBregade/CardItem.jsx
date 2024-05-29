import React from 'react'
import ProgressBar from '../../utils/ProgressBar'
import ProgressPei from '../../utils/ProgressPei'
import { Link } from 'react-router-dom'
const CardItem = ({ item }) => {
    // console.log(item);
    return (
        <Link to={`dashboard/${item.brigade_id}`}>
            <div className="border p-3 rounded-lg flex flex-col gap-1 bg-primary">
                <div className="flex items-center">
                    <div className=" font-semibold text-center px-1">{item?.brigadeName}</div>
                    <ProgressPei perValue={Number(item?.totalSumQualification)?.toFixed(1)} color={"text-[#48CFAE]"} size={"7vw"} widthPei={"0.5vw"} sizeOfText={'text-lg'} />
                </div>
                {/* progress bar */}
                <div className="h-52 shadow-md p-5 rounded-xl overflow-auto">
                    {item?.totalViewQualification?.map((mean, i) => (
                        <ProgressBar batAmount={false} batProcent={mean?.realProcent} key={i} color={"progress-info"} perValue={mean?.procent} maxValue={mean?.procent} title={mean?.meansName} />
                    ))}
                </div>
            </div>
        </Link>
    )
}
export default CardItem