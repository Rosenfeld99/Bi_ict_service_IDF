import React from 'react'
import useData from '../hooks/useDataStore'
import Topbar from '../components/topbar/Topbar'
import ProgressPei from '../utils/ProgressPei'
import ProgressBar from '../utils/ProgressBar'
import CardList from '../components/dashBregade/CardList'
import Toast from '../utils/tostify/Toast'

const Home = () => {
  const { data, setData, handelToast, toast, setShowToast, showToast } = useData()
  console.log(data);
  return (
    <div className='bg-primary dark:bg-dark_primary dark:shadow-xl dark:shadow-[#fcfcfca8] flex-1 rounded-r-3xl p-5'>
      <Topbar ManageSystem={true} title={'דשבורד'} toggelExcle={true} showTheme={true} />

      <div className=" text-xl text-secoundary font-semibold pt-16" onClick={() => handelToast("some tittle", "msg", "Error", 10)}>כשירות קיברנטית - פיקוד ההכשרות והאימונים</div>
      {/* Progress Pei */}
      <div className=" flex bg-[#fcf7fd] p-4 rounded-lg gap-3 my-4">

        <CardList />

      </div>


      {/* Toast */}
      {showToast && (
        <Toast
          setShow={setShowToast}
          show={showToast}
          title={toast.title}
          message={toast.message}
          time={toast.time}
          type={toast.type}
        />
      )}
    </div>
  )
}

export default Home


// color indicator
{/* <div className=" flex flex-col items-center justify-center w-full p-3 gap-2">
<div className=" flex items-center flex-row-reverse w-full justify-between">

  <div className=" font-semibold">100% -80%</div>
  <div className="flex items-center flex-row-reverse gap-2">
    <div className="">חזק</div>
    <div className="bg-green-400 w-3 h-4" />
  </div>
</div>
<div className=" flex items-center flex-row-reverse w-full justify-between">

  <div className="font-semibold">80% -60%</div>
  <div className="flex items-center flex-row-reverse gap-2">
    <div className="">בינוני</div>
    <div className="bg-orange-300 w-3 h-4" />
  </div>
</div>
<div className=" flex items-center flex-row-reverse w-full justify-between">

  <div className="font-semibold">60% -40%</div>
  <div className="flex items-center flex-row-reverse gap-2">
    <div className="">חלש</div>
    <div className="bg-red-400 w-3 h-4" />
  </div>
</div>
</div> */}