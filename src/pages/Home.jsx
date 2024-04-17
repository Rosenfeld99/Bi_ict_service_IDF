import React from 'react'
import useData from '../hooks/useDataStore'
import Topbar from '../components/topbat/Topbar'
import ProgressPei from '../utils/ProgressPei'
import ProgressBar from '../utils/ProgressBar'
import CardList from '../components/dashBregade/CardList'

const Home = () => {
  const { data, setData } = useData()
  console.log(data);
  return (
    <div className='bg-primary dark:bg-dark_primary dark:shadow-xl dark:shadow-[#fcfcfca8] flex-1 rounded-r-3xl p-5'>
      <Topbar title={'דשבורד'} toggelExcle={true} showTheme={true} />

      {/* Progress Pei */}
      <div className=" flex bg-[#fcf7fd] p-4 rounded-lg gap-3 ">

        <CardList />
        <div className=" bg-primary flex-1 items-center p-3 rounded-lg border flex flex-col">
          <ProgressPei perValue={80} color={"text-[#48cfae]"} size={"10vw"} />
          <div className="">כשירות פיקודית </div>
        </div>
      </div>

    </div>
  )
}

export default Home