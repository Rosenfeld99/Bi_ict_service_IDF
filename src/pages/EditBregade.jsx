import { useEffect, useState } from 'react'
import Topbar from '../components/topbar/Topbar'
import useDataStore from '../hooks/useDataStore'

import HeaderCreateData from '../utils/HeaderCreateData'
import { FaPen } from 'react-icons/fa'
import { generateID } from '../utils/func'
import { useSearchParams } from 'react-router-dom'
import TableGrid from '../components/table/TableGrid'

const EditBregade = () => {
  const { data, getBregadeSingle } = useDataStore()
  const [params] = useSearchParams()
  console.log(params.get('q'));

  // console.log(data[0]);
  const [formBattalion, setFormBattalion] = useState(
    {
      battalionName: "",
      battalion_id: generateID(),
      means: [
        {
          meansName: "",

          nameType: "",
          type_id: generateID(),
          amount: "",
          properICT: "",
          properAmm: "",
          procent: "",
          comments: "",
          totalTypePercent: "",
          comments: "",
          mean_id: generateID()
          // we need to add uniq id for mean element --> and add more in data file (data.js) 
        },
        {
          meansName: "",

          nameType: "",
          type_id: generateID(),
          amount: "",
          properICT: "",
          properAmm: "",
          procent: "",
          comments: "",
          totalTypePercent: "",
          comments: "",
          mean_id: generateID()
        }
      ],
      percentOfUnit: "",
      totalSumBattalion: "",
      comments: "",
    },
  )
  const [currentBattailion, setCurrentBattailion] = useState(formBattalion)
  const [bregadeBattalion, setBregadeBattalion] = useState([])
  console.log(bregadeBattalion);

  const [formBregade, setFormBregade] = useState({
    brigadeName: "",
    brigade_id: generateID(),
    battalion:
      bregadeBattalion,
    lastUpdateTime: "14-04-2024",
    lastUpdater: "new battaleion",
    totalSumQualification: "40",
    totalViewQualification: [
      {
        meansName: "a",
        meansType: "24",
      },

    ],
    workSpace: "alpha",
    comments: "no comments",
  })

  useEffect(() => {
    if (params.get('q')) {
      console.log(getBregadeSingle(params.get('q')));
      const singleBregade = getBregadeSingle(params.get('q'))
      setFormBregade(singleBregade)
      setFormBattalion(singleBregade?.battalion && singleBregade?.battalion[0] || [])
      setBregadeBattalion(singleBregade?.battalion || [])
      setCurrentBattailion(singleBregade?.battalion && singleBregade?.battalion[0] || {})
      console.log(" singleBregade : ", singleBregade);
    }
  }, [params.get('q')])

  // find currnet battalion by click 
  const handleSelectBattalion = (id) => {
    const res = data?.find((item) => item.battalion.find((bt) => bt.battalion_id === id));
    setCurrentBattailion(res?.battalion?.find(item => item?.battalion_id == id))
  }

  const handleInputBregadeNameChange = (inputVal) => {
    setFormBregade({ ...formBregade, brigadeName: inputVal })
    console.log(formBregade.brigadeName);
  }

  console.log(currentBattailion);


  // console.log(formBregade.brigadeName);
  return (
    <div className='bg-primary dark:bg-dark_primary flex-1 rounded-r-3xl p-5'>
      <Topbar title={'הוספת חטיבה'} toggelExcle={false} showTheme={true} />

      {/* header content */}
      <HeaderCreateData btnAdd={'הוסף גדוד'} placeholderTitle={'הכנס שם חטיבה...'} handleSearch={handleInputBregadeNameChange} input={formBregade?.brigadeName} />

      <div className=" flex gap-5">
        {/* accordion */}
        {bregadeBattalion?.length > 0 && <div className="w-[24vw] min-w-[100px]">
          <div className="join join-vertical w-full flex-col flex gap-5">
            {/* start */}
            {bregadeBattalion?.map((item, index) => (
              <div key={item?.battalion_id} onClick={() => {
                setCurrentBattailion(item)
                setFormBattalion(item)
              }} className="collapse collapse-arrow join-item bg-accent_bg dark:bg-dark_accent">
                {item?.battalion_id == currentBattailion?.battalion_id && <div className=" absolute left-10 top-5 text-lg text-secoundary ">
                  <FaPen />
                </div>}
                <input type="radio" name="my-accordion-4" className='outline-none' defaultChecked />
                <div className="collapse-title text-xl font-medium text-secoundary dark:text-dark_secoundary ">
                  <div className={`text-neutral dark:text-dark_neutral ${currentBattailion?.battalion_id == item?.battalion_id && "bg-accent dark:bg-dark_accent_bg px-3 rounded-xl py-2 w-fit"}`}>
                    {item?.battalionName}
                  </div>
                </div>
                <div className="collapse-content">
                  {item?.means?.map((bat, index) => (
                    <p key={bat?.mean_id} onClick={() => handleSelectBattalion(bat?.mean_id)} className={` font-semibold cursor-pointer dark:text-dark_secoundary text-neutral px-3 rounded-xl py-2 `}>• {bat?.meansName}</p>
                  ))}
                </div>
              </div>))}
            {/* and */}

          </div>

        </div>}
        {/* vew item content */}
        <TableGrid setCurrentBattailion={setCurrentBattailion} bregadeBattalion={bregadeBattalion} currentBattailion={currentBattailion} formBattalion={formBattalion} setBregadeBattalion={setBregadeBattalion} setFormBattalion={setFormBattalion} />
      </div>

      {/* btn action */}
      <button className=" bg-green-600 text-primary dark:bg-dark_secoundary dark:text-primary py-2 text-sm px-5 rounded-3xl absolute bottom-4 left-3">
        שמירה וסיום
      </button>
    </div >
  )
}

export default EditBregade