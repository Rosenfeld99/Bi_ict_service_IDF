import { useState } from 'react'
import Topbar from '../components/topbar/Topbar'
import useDataStore from '../hooks/useDataStore'
import HeaderCreateData from '../utils/HeaderCreateData'
import { FaPen } from 'react-icons/fa'
import { generateID } from '../utils/func'
import TableGrid from '../components/table/TableGrid'
import { useNavigate } from 'react-router-dom'

const CreateBregade = () => {
  const { data, getBregadeSingle, user, setData, apiMethods, setAwaitRoute } = useDataStore()
  const navigateion = useNavigate()
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
          comments: "",          // we need to add uniq id for mean element --> and add more in data file (data.js) 
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
          comments: "",        }
      ],
      percentOfUnit: "",
      totalSumBattalion: "",
      comments: "",
    },
  )
  const [currentBattailion, setCurrentBattailion] = useState(formBattalion)
  const [bregadeBattalion, setBregadeBattalion] = useState([])
  // console.log(bregadeBattalion);

  const [formBregade, setFormBregade] = useState({
    brigadeName: "",
    brigade_id: generateID(),
    battalion:
      bregadeBattalion,
    lastUpdateTime: "14-04-2024",
    lastUpdater: "new battaleion",
    totalSumQualification: "40",
    totalViewQualification: [
      { meansName: "x", meansType: "20" },
    ],
    workSpace: "alpha",
    comments: "no comments",
  })


  // find currnet battalion by click 
  const handleSelectBattalion = (id) => {
    const res = data?.find((item) => item.battalion.find((bt) => bt.battalion_id === id));
    setCurrentBattailion(res?.battalion?.find(item => item?.battalion_id == id))
  }


  const handleInputBregadeNameChange = (inputVal) => {
    setAwaitRoute(true)
    const formattedDate = new Date().toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\./g, '-');
    setFormBregade({ ...formBregade, brigadeName: inputVal, lastUpdateTime: formattedDate, lastUpdater: user?.userName })
    console.log(formBregade.brigadeName);
    // handleClickSaveAndDone({}, true)
  }

  // TODO : save in click the bregate state and also in clikc save and done

  const handleClickSaveAndDone = (state, isCalc) => {
    // handle cut data key for dashboard
    // console.log("run time", formBregade?.battalion?.length);
    if (isCalc && formBregade?.battalion?.length > 0) {
      let newB = { ...formBregade }
      let allBattalion = newB?.battalion
      let totalViewQualification = newB?.totalViewQualification

      for (let i = 0; i < allBattalion?.length; i++) {
        let cuurBat = allBattalion[i]
        for (let j = 0; j < cuurBat?.means?.length; j++) {
          let currMean = cuurBat?.means[j]
          if (currMean?.procent && currMean?.amount && currMean?.properICT) {
            currMean.totalTypePercent = currMean?.procent / currMean?.amount * currMean?.properICT;
          } else {
            currMean.totalTypePercent = currMean?.procent;
          }

        }
      }

      const newArrayMeans = [];
      for (let i = 0; i < allBattalion?.length; i++) {
        const element = allBattalion[i];
        for (let j = 0; j < element?.means?.length; j++) {
          newArrayMeans?.push({ meansName: element?.means[j]?.meansName, totalTypePercent: element?.means[j]?.totalTypePercent });
        }
      }

      totalViewQualification = Object.values(newArrayMeans.reduce((acc, { meansName, totalTypePercent }) => {
        acc[meansName] = acc[meansName] || { meansName, totalTypePercent: 0 };
        acc[meansName].totalTypePercent += parseInt(totalTypePercent);
        return acc;
      }, {}));

      newB.totalViewQualification = totalViewQualification

      const updateData = [...data]
      updateData.push(newB)
      setData(updateData)
      setAwaitRoute(false)
      navigateion("/")
    }
    // if !isCalc do calc and cut
  }



  console.log("data : ", data);

  const handleResetBregade = () => {
    setFormBregade({
      brigadeName: "",
      brigade_id: generateID(),
      battalion:
        bregadeBattalion,
      lastUpdateTime: "14-04-2024",
      lastUpdater: "new battaleion",
      totalSumQualification: "40",
      totalViewQualification: [
        { meansName: "x", meansType: "20" },
      ],
      workSpace: "alpha",
      comments: "no comments",
    })
    setBregadeBattalion([])
    setFormBattalion(
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
          }
        ],
        percentOfUnit: "",
        totalSumBattalion: "",
        comments: "",
      },)
  }


  // console.log(currentBattailion);


  // console.log(formBattalion?.battalionName);
  return (
    <div className='bg-primary dark:bg-dark_primary flex-1 rounded-r-3xl p-5'>
      <Topbar title={'הוספת חטיבה'} toggelExcle={false} showTheme={true} />

      {/* header content */}
      <HeaderCreateData delBtn={'איפוס '} onClickBtnDel={handleResetBregade} isVlaidation={formBregade?.brigadeName == "" || formBregade?.battalion?.length == 0} btnAdd={'שמירה וסיום'} onClickBtnAdd={() => { handleClickSaveAndDone({}, true) }} placeholderTitle={'הכנס שם חטיבה...'} handleSearch={handleInputBregadeNameChange} input={formBregade?.brigadeName} />

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
                {/* {item?.battalion_id == currentBattailion?.battalion_id && <div className=" absolute left-10 top-5 text-lg text-secoundary ">
                  <FaPen />
                </div>} */}
                <input type="radio" name="my-accordion-4" className='outline-none' defaultChecked />
                <div className="collapse-title text-xl font-medium text-secoundary dark:text-dark_secoundary ">
                  <div className={`text-neutral dark:text-dark_neutral ${currentBattailion?.battalion_id == item?.battalion_id && "bg-accent dark:bg-dark_accent_bg px-3 rounded-xl py-2 w-fit"}`}>
                    {item?.battalionName}
                  </div>
                </div>

              </div>))}
            {/* and */}

          </div>

        </div>}
        {/* vew item content */}
        <TableGrid formBregade={formBregade} setFormBregade={setFormBregade} setCurrentBattailion={setCurrentBattailion} bregadeBattalion={bregadeBattalion} currentBattailion={currentBattailion} formBattalion={formBattalion} setBregadeBattalion={setBregadeBattalion} setFormBattalion={setFormBattalion} />
      </div>

      {/* btn action
      <button className=" bg-green-600 text-primary dark:bg-dark_secoundary dark:text-primary py-2 text-sm px-5 rounded-3xl absolute bottom-4 left-3">
        שמירה וסיום
      </button> */}
    </div >
  )
}

export default CreateBregade