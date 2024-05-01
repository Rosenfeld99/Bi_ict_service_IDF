import React from 'react'
import ProgressBar from '../../utils/ProgressBar'
import ProgressPei from '../../utils/ProgressPei'
import { Link } from 'react-router-dom'

const CardItem = () => {
    return (
        <Link to={'/id'}>

            <div className=" border p-3 rounded-lg flex flex-col gap-1 bg-primary">
                <div className=" flex items-center gap-4">
                    <div className=" font-semibold">חטיבה 828</div>
                    <ProgressPei perValue={70} color={"text-[#48cfae]"} size={"7vw"} widthPei={"0.5vw"} sizeOfText={'text-lg'} />
                </div>
                {/* progress bar */}
                <ProgressBar color={"progress-info"} perValue={"70"} title={"כלי תקשוב"} />
                <ProgressBar color={"progress-info"} perValue={"70"} title={"כלי תקשוב"} />
                <ProgressBar color={"progress-info"} perValue={"70"} title={"כלי תקשוב"} />
                <ProgressBar color={"progress-info"} perValue={"70"} title={"כלי תקשוב"} />
            </div>
        </Link>
    )
}

export default CardItem