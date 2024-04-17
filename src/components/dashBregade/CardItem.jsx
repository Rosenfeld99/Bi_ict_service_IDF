import React from 'react'
import ProgressBar from '../../utils/ProgressBar'
import ProgressPei from '../../utils/ProgressPei'

const CardItem = () => {
    return (
        <div className=" border p-3 rounded-lg flex flex-col gap-1 bg-primary">
            <div className=" flex items-center gap-4">
                <div className=" font-semibold">חטיבה 828</div>
                <ProgressPei perValue={70} color={"text-[#48cfae]"} size={"10vw"}/>
            </div>
            {/* progress bar */}
            <ProgressBar color={"progress-info"} perValue={"70"} title={"כלי תקשוב"} />
            <ProgressBar color={"progress-info"} perValue={"70"} title={"כלי תקשוב"} />
            <ProgressBar color={"progress-info"} perValue={"70"} title={"כלי תקשוב"} />
            <ProgressBar color={"progress-info"} perValue={"70"} title={"כלי תקשוב"} />



        </div>
    )
}

export default CardItem