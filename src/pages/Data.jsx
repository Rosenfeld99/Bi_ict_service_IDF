import { useState } from 'react'
import Topbar from '../components/topbar/Topbar'
import useDataStore from '../hooks/useDataStore'

import HeaderContent from '../utils/HeaderContent'
import { useNavigate } from 'react-router-dom'

const Data = () => {
  const { data } = useDataStore()
  // console.log(data);
  const [currentBattailion, setCurrentBattailion] = useState(data[0]?.battalion[0])
  // console.log(currentBattailion);
  const [dataRender, setDataRender] = useState(data || []);

  const navigate = useNavigate()

  // find currnet battalion by click 
  const handleSelectBattalion = (id) => {
    const res = data?.find((item) => item.battalion.find((bt) => bt.battalion_id === id));
    setCurrentBattailion(res?.battalion?.find(item => item?.battalion_id == id))
  }

  const handleSearch = (seachValue) => {
    const res = data?.filter((item) => item.brigadeName.includes(seachValue));
    console.log(res);
    setDataRender(res || [])
  }

  // console.log(data);

  const custumStyleTitle = ' text-center'
  const custumStyleBody = ' text-center border-t-[1px] border-r-[1px] border-secoundary dark:border-primary'
  const custumStyleBodyFirst = ' text-center border-t-[1px] border-secoundary dark:border-primary'

  return (
    <div className='bg-primary dark:bg-dark_primary flex-1 rounded-r-3xl p-5'>
      <Topbar ManageSystem={true} title={'נתונים'} toggelExcle={true} showTheme={true} />

      {/* header content */}
      <HeaderContent btnAdd={'הוסף חטיבה'} onClickBtn={() => navigate('/data/create/bregade')} numOfTitle={data?.length} placeholderTitle={'חפש שם חטיבה'} title={'חטיבות'} handleSearch={handleSearch} />

      <div className=" flex gap-5">
        {/* accordion */}
        <div className="w-[24vw] min-w-[100px]">
          <div className="join join-vertical w-full flex-col flex gap-5">
            {/* start */}
            {dataRender?.map((item, index) => (
              <div key={index} className="collapse collapse-arrow join-item bg-accent_bg dark:bg-dark_accent">
                <input type="radio" name="my-accordion-4" className='outline-none' defaultChecked />
                <div className="collapse-title text-2xl font-medium text-secoundary dark:text-dark_secoundary ">
                  <div className="text-neutral dark:text-dark_neutral">
                    {item?.brigadeName}
                  </div>
                </div>
                <div className="collapse-content">
                  {item?.battalion?.map((bat, index) => (
                    <p key={index} onClick={() => handleSelectBattalion(bat?.battalion_id)} className={` font-semibold cursor-pointer dark:text-dark_secoundary text-neutral px-3 rounded-xl py-2 ${currentBattailion?.battalion_id == bat?.battalion_id && "bg-accent dark:bg-dark_accent_bg"}`}>• {bat?.battalionName}</p>
                  ))}
                  {/* add btn */}
                  <div className=" flex items-center justify-center py-5">
                    <button onClick={() => navigate(`/data/update/bregade?q=${item?.brigade_id}`)} className='bg-secoundary text-accent w-fit dark:bg-dark_secoundary dark:text-primary py-2 px-5 rounded-xl'>עריכת חטיבה</button>
                    {/* <div className="" >edit</div> */}
                  </div>
                </div>
              </div>))}
            {/* and */}

          </div>

        </div>
        {/* vew item content */}
        <div className="overflow-x-auto w-full bg-accent_bg dark:bg-dark_accent h-fit rounded-lg pt-2 border-secoundary border-[1px] dark:border-primary">
          <div className="px-5 py-4 flex items-center justify-between">
            <p className=' font-bold dark:text-dark_secoundary text-neutral bg-accent dark:bg-dark_accent_bg px-3 rounded-xl py-1 w-fit text-xl flex-row-reverse'> {currentBattailion?.percentOfUnit}/{currentBattailion?.totalSumBattalion} -{currentBattailion?.battalionName}</p>
            <div className=" text-xs">
              עודכן לאחרונה {data[0]?.lastUpdateTime}
            </div>
          </div>


          <table className="table table-xs">
            <thead>
              <tr>
                <th className={custumStyleTitle}>#</th>
                <th className={custumStyleTitle}>אמצעים</th>
                <th className={custumStyleTitle}>סוג אמצעי</th>
                <th className={custumStyleTitle}>כמות</th>
                <th className={custumStyleTitle}>תקינות תקשובית</th>
                <th className={custumStyleTitle}>תקינות חימושית</th>
                <th className={custumStyleTitle}>אחוזים פרטנים</th>
                <th className={custumStyleTitle}>הערות</th>
              </tr>
            </thead>
            <tbody>
              {/* item current battalion */}
              {currentBattailion?.means?.map((bat, index) => (
                <tr key={index}>
                  <th className={custumStyleBodyFirst}>{index + 1}</th>
                  <td className={custumStyleBody}>{bat?.meansName}</td>
                  <td className={custumStyleBody}>{bat?.nameType}</td>
                  <td className={custumStyleBody}>{bat?.amount}</td>
                  <td className={custumStyleBody}>{bat?.properICT}</td>
                  <td className={custumStyleBody}>{bat?.properAmm}</td>
                  <td className={custumStyleBody}>{bat?.procent}</td>
                  <td className={custumStyleBody}>{currentBattailion?.comments}</td>
                </tr>
              ))}

            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}

export default Data