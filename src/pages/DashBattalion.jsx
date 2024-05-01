import React from 'react'
import Topbar from '../components/topbar/Topbar'
import CardListBattalion from '../components/dashBattalion/CardListBattalion'

const DashBattalion = () => {
    return (
        <div className='bg-primary dark:bg-dark_primary dark:shadow-xl dark:shadow-[#fcfcfca8] flex-1 rounded-r-3xl p-5'>
            <Topbar title={'דשבורד'} toggelExcle={true} showTheme={true} />

            <div className=" text-xl text-secoundary font-semibold pt-16">כשירות פיקודית - חטיבה 828</div>
            {/* Progress Pei */}
            <div className=" flex bg-[#fcf7fd] p-4 rounded-lg gap-3 my-4 ">

                <CardListBattalion />

            </div>

        </div>)
}

export default DashBattalion