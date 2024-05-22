import { useEffect, useState } from 'react'
import Topbar from '../components/topbar/Topbar'
import useDataStore from '../hooks/useDataStore'

import HeaderCreateData from '../utils/HeaderCreateData'
import { FaPen } from 'react-icons/fa'
import { generateID } from '../utils/func'
import { useNavigate, useSearchParams } from 'react-router-dom'
import TableGrid from '../components/table/TableGrid'

const EditBregade = () => {
  const { data, getBregadeSingle, user, apiMethods, setData, setAwaitRoute, halndleLocalStorage } = useDataStore()
  const [params] = useSearchParams()
  const navigateion = useNavigate()
  const [checkChanges, setCheckChanges] = useState(false)
  // console.log(params.get('q'));

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
    },
  )
  const [currentBattailion, setCurrentBattailion] = useState(formBattalion)
  const [bregadeBattalion, setBregadeBattalion] = useState([])
  console.log(currentBattailion);

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
  const [sunOfTotalPercent, setSunOfTotalPercent] = useState(currentBattailion?.totalSumBattalion || 0)


  useEffect(() => {
    if (params.get('q')) {
      // console.log(getBregadeSingle(params.get('q')));
      const singleBregade = getBregadeSingle(params.get('q'))
      setFormBregade(singleBregade)
      setFormBattalion(singleBregade?.battalion && singleBregade?.battalion[0] || [])
      setBregadeBattalion(singleBregade?.battalion || [])
      setCurrentBattailion(singleBregade?.battalion && singleBregade?.battalion[0] || {})
      console.log(" singleBregade : ", singleBregade);
      setSunOfTotalPercent(singleBregade?.battalion[0]?.totalSumBattalion)
    }
  }, [params.get('q')])

  // find currnet battalion by click 
  const handleSelectBattalion = (id) => {
    const res = data?.find((item) => item.battalion.find((bt) => bt.battalion_id === id));
    setCurrentBattailion(res?.battalion?.find(item => item?.battalion_id == id))

  }

  const handleInputBregadeNameChange = (inputVal) => {
    setCheckChanges(true)
    setAwaitRoute(true)
    const formattedDate = new Date().toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\./g, '-');
    setFormBregade({ ...formBregade, brigadeName: inputVal, lastUpdateTime: formattedDate, lastUpdater: user?.userName })
    // console.log(formBregade);
    // handleClickSaveAndDone({}, true)
  }

  // TODO : save in click the bregate state and also in clikc save and done

  const handleClickSaveAndDone = (state, isCalc) => {
    // handle cut data key for dashboard
    if (isCalc && formBregade?.battalion?.length > 0) {
      const newArrayMeans = [];
      for (let i = 0; i < formBregade?.battalion?.length; i++) {
        const element = formBregade?.battalion[i];
        for (let j = 0; j < element?.means?.length; j++) {
          newArrayMeans?.push({ meansName: element?.means[j]?.meansName, procent: element?.means[j]?.procent });
        }
      }
      // console.log(newArrayMeans);
      // const reducedData = Object.values(newArrayMeans.reduce((acc, { meansName, procent }) => {
      //   acc[meansName] = acc[meansName] || { meansName, procent: 0 };
      //   (acc[meansName].procent += parseFloat(procent).toFixed(1));
      //   return acc;
      // }, {}));
      const reducedData = Object.values(newArrayMeans.reduce((acc, { meansName, procent }) => {
        if (!acc[meansName]) {
          acc[meansName] = { meansName, procent: 0 };
        }
        acc[meansName].procent += parseFloat(procent);
        return acc;
      }, {}));

      // Convert the procent values to fixed decimal places if needed
      reducedData.forEach(item => {
        item.procent = parseFloat(item.procent.toFixed(1));
      });


      // Sum up all the percentages of the unit means
      let sumOfTotalPercent = 0;
      for (let index = 0; index < reducedData.length; index++) {
        const element = reducedData[index];
        sumOfTotalPercent += element.procent;
      }

      // console.log(reducedData);
      let allData = [...data];
      for (let i = 0; i < allData?.length; i++) {
        if (allData[i]?.brigade_id === formBregade?.brigade_id) {
          console.log(formBregade);
          allData[i] = formBregade
          allData[i].totalSumQualification = sumOfTotalPercent.toString();
          allData[i].totalViewQualification = reducedData
          console.log("in case");
        }
      }
      setData(allData)
      setAwaitRoute(false)
      halndleLocalStorage(JSON.stringify(allData))
      console.log("data : ", allData);
    }
    // if !isClac do clac and cut
  }

  // console.log(currentBattailion);

  const handleDleteBregade = () => {
    const filteredData = data?.filter((item) => item?.brigade_id != formBregade?.brigade_id)
    setData(filteredData)
    halndleLocalStorage(JSON.stringify(filteredData))
    navigateion(-1)
  }


  console.log(formBattalion);
  return (
    <div className='bg-primary dark:bg-dark_primary flex-1 rounded-r-3xl p-5'>
      <Topbar ManageSystem={true} title={'הוספת חטיבה'} toggelExcle={false} showTheme={true} />

      {/* header content */}
      <HeaderCreateData isVlaidation={!checkChanges} onClickBtnAdd={() => handleClickSaveAndDone({}, true)} onClickBtnDel={handleDleteBregade} delBtn={'מחיקת חטיבה'} btnAdd={'שמירה וסיום'} placeholderTitle={'הכנס שם חטיבה...'} handleSearch={handleInputBregadeNameChange} input={formBregade?.brigadeName} />

      <div className=" flex gap-5">
        {/* accordion */}
        {bregadeBattalion?.length > 0 && <div className="w-[24vw] min-w-[100px]">
          <div className="join join-vertical w-full flex-col flex gap-5">
            {/* start */}
            {bregadeBattalion?.map((item, index) => (
              <div key={item?.battalion_id} onClick={() => {
                setCurrentBattailion(item)
                setFormBattalion(item)
                setSunOfTotalPercent(item?.totalSumBattalion)
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
        <TableGrid setSunOfTotalPercent={setSunOfTotalPercent} sunOfTotalPercent={sunOfTotalPercent} setCheckChanges={setCheckChanges} setAwaitRoute={setAwaitRoute} formBregade={formBregade} setFormBregade={setFormBregade} setCurrentBattailion={setCurrentBattailion} bregadeBattalion={bregadeBattalion} currentBattailion={currentBattailion} formBattalion={formBattalion} setBregadeBattalion={setBregadeBattalion} setFormBattalion={setFormBattalion} />
      </div>

      {/* btn action */}
      {/* <button className=" bg-green-600 text-primary dark:bg-dark_secoundary dark:text-primary py-2 text-sm px-5 rounded-3xl absolute bottom-4 left-3">
        שמירה וסיום
      </button> */}
    </div >
  )
}

export default EditBregade