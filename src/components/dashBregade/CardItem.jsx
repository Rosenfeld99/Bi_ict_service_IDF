import React from 'react'
import ProgressBar from '../../utils/ProgressBar'
import ProgressPei from '../../utils/ProgressPei'
import { Link } from 'react-router-dom'
import { fixAndReturnNumber } from '../../utils/func'
import battLogo from "../../../public/battLogo.png"

const CardItem = ({ item }) => {
    // console.log(item);
    return (
        <Link to={`dashboard/${item.brigade_id}`}>
            <div className="border p-3 rounded-lg flex flex-col gap-1 bg-primary">
                <div className="flex items-center justify-between">
                    <div className=" font-semibold text-xl text-center px-1">{item?.brigadeName}</div>
                    <img className='w-10 rounded-lg' src={item.imageURL} alt={`${item.brigadeName}חטיבה`} />
                </div>
                <div className=" flex items-center justify-center">
                    <ProgressPei perValue={fixAndReturnNumber(item?.totalSumQualification)} color={"text-[#48CFAE]"} size={"7vw"} widthPei={"0.5vw"} sizeOfText={'text-lg'} />
                </div>
                {/* progress bar */}
                <div className="h-52 shadow-md p-2 rounded-xl overflow-auto">
                    {item?.totalViewQualification?.map((mean, i) => (
                        <ProgressBar batAmount={false} batProcent={mean?.procent} key={i} color={"progress-info"} perValue={mean?.realProcent} maxValue={mean?.procent} title={mean?.meansName} />
                    ))}
                </div>
            </div>
        </Link>
    )
}
export default CardItem