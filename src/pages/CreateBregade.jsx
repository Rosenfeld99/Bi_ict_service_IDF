import { useState } from 'react'
import Topbar from '../components/topbar/Topbar'
import useDataStore from '../hooks/useDataStore'
import HeaderCreateData from '../utils/HeaderCreateData'
import { fixAndReturnNumber, generateID } from '../utils/func'
import TableGrid from '../components/table/TableGrid'
import { useNavigate } from 'react-router-dom'

const CreateBregade = () => {
  const { data, getBregadeSingle, user, setData, apiMethods, setAwaitRoute, halndleLocalStorage } = useDataStore()
  const navigateion = useNavigate()
  const [formBattalion, setFormBattalion] = useState({
    battalionName: "",
    imageURL: "",
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
        totalTypePercent: 0,
        comments: "",
      }, {
        meansName: "",
        nameType: "",
        type_id: generateID(),
        amount: "",
        properICT: "",
        properAmm: "",
        procent: "",
        comments: "",
        totalTypePercent: 0,
        comments: "",
      }],
    percentOfUnit: 0,
    totalSumBattalion: 0,
    comments: "",
  },);

  const [currentBattailion, setCurrentBattailion] = useState(formBattalion)
  const [bregadeBattalion, setBregadeBattalion] = useState([])
  // console.log(bregadeBattalion);

  const [formBregade, setFormBregade] = useState({
    brigadeName: "",
    imageURL: "",
    brigade_id: generateID(),
    battalion: bregadeBattalion,
    lastUpdateTime: "14-04-2024",
    lastUpdater: "new battaleion",
    totalSumQualification: 0,
    totalViewQualification: [
      { meansName: "x", meansType: "20" },
    ],
    workSpace: "alpha",
    comments: "no comments",
  })

  const [checkChanges, setCheckChanges] = useState(false)


  // find currnet battalion by click 
  const handleSelectBattalion = (id) => {
    const res = data?.find((item) => item.battalion.find((bt) => bt.battalion_id === id));
    setCurrentBattailion(res?.battalion?.find(item => item?.battalion_id == id))
  }

  const handleInputBregadeNameChange = (inputVal, imageURL) => {
    setAwaitRoute(true)
    const formattedDate = new Date().toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\./g, '-');
    setFormBregade({ ...formBregade, brigadeName: inputVal, imageURL: imageURL, lastUpdateTime: formattedDate, lastUpdater: user?.userName })
    // console.log(formBregade.brigadeName);
    // handleClickSaveAndDone({}, true)
  }

  const handleClickSaveAndDone = (state, isCalc) => {
    // handle cut data key for dashboard
    if (isCalc && formBregade?.battalion?.length > 0) {
      let newB = formBregade
      let allBattalion = newB?.battalion
      let totalViewQualification = newB?.totalViewQualification

      for (let i = 0; i < allBattalion?.length; i++) {
        let cuurBat = allBattalion[i]
        for (let j = 0; j < cuurBat?.means?.length; j++) {
          let currMean = cuurBat?.means[j]
          if (currMean?.procent && currMean?.amount && currMean?.properICT) {
            let createRealProcent = currMean?.procent || 0;
            if (currMean?.properAmm != "" && currMean?.amount != "") {
              currMean.totalTypePercent = fixAndReturnNumber(currMean?.procent * currMean?.properAmm / currMean?.amount)
            }
            else {
              if (currMean?.properICT != "" && currMean?.amount != "") {
                createRealProcent = currMean?.procent * currMean?.properICT / currMean?.amount
              }
            }
            currMean.totalTypePercent = fixAndReturnNumber(currMean?.procent / currMean?.amount * currMean?.properICT);
            // console.log("currMean?.procent / currMean?.amount * currMean?.properICT ", currMean?.procent / currMean?.amount * currMean?.properICT);
          } else {
            currMean.totalTypePercent = fixAndReturnNumber(currMean?.procent);
          }
        }
      }

      const newArrayMeans = [];
      for (let i = 0; i < allBattalion?.length; i++) {
        const element = allBattalion[i];
        for (let j = 0; j < element?.means?.length; j++) {
          newArrayMeans?.push({ meansName: element?.means[j]?.meansName, procent: element?.means[j]?.procent, realProcent: element?.means[j]?.totalTypePercent, amount: element?.means[j]?.amount });
        }
      }

      // reduce the array means --> to make shure without duplicate 
      totalViewQualification = Object.values(newArrayMeans.reduce((acc, { meansName, procent, realProcent, amount }) => {
        if (!acc[meansName]) {
          acc[meansName] = { meansName, procent: 0, realProcent: 0, amount: 0 };
        }
        acc[meansName].procent += parseFloat(procent);
        acc[meansName].realProcent += parseFloat(realProcent);
        acc[meansName].amount += Number(amount);
        return acc;
      }, {}));

      // Sum up all the percentages of the unit means
      let sumOfTotalPercent = 0;
      for (let index = 0; index < totalViewQualification.length; index++) {
        const element = totalViewQualification[index];
        sumOfTotalPercent += element.realProcent;
      }

      // Convert the procent values to fixed decimal places if needed
      totalViewQualification?.forEach(item => {
        item.procent = parseFloat(item.procent.toFixed(1));
        item.realProcent = parseFloat(item.realProcent.toFixed(1));
      });

      newB.totalViewQualification = totalViewQualification
      newB.totalSumQualification = sumOfTotalPercent

      const updateData = [...data]
      updateData.push(newB)
      setData(updateData)
      halndleLocalStorage(JSON.stringify(updateData))
      setAwaitRoute(false)
      navigateion("/")
    }
    // if !isCalc do calc and cut
  }

  const handleResetBregade = () => {
    setFormBregade({
      brigadeName: "",
      imageURL: "",
      brigade_id: generateID(),
      battalion: bregadeBattalion,
      lastUpdateTime: "14-04-2024",
      lastUpdater: "new battaleion",
      totalSumQualification: 0,
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
        imageURL: "",
        battalion_id: generateID(),
        means: [{
          meansName: "",
          nameType: "",
          type_id: generateID(),
          amount: "",
          properICT: "",
          properAmm: "",
          procent: "",
          comments: "",
          totalTypePercent: 0,
          comments: "",
        },],
        percentOfUnit: 0,
        totalSumBattalion: 0,
        comments: "",
      },)
  }


  return (
    <div className='bg-primary dark:bg-dark_primary flex-1 rounded-r-3xl p-5'>
      <Topbar ManageSystem={true} title={'הוספת חטיבה'} toggelExcle={false} showTheme={true} />

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
              }} className=" join-item bg-accent_bg dark:bg-dark_accent">
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
        <TableGrid handleClickSaveAndDone={handleClickSaveAndDone} setCheckChanges={setCheckChanges} setAwaitRoute={setAwaitRoute} formBregade={formBregade} setFormBregade={setFormBregade} setCurrentBattailion={setCurrentBattailion} bregadeBattalion={bregadeBattalion} currentBattailion={currentBattailion} formBattalion={formBattalion} setBregadeBattalion={setBregadeBattalion} setFormBattalion={setFormBattalion} />
      </div>

      {/* btn action
      <button className=" bg-green-600 text-primary dark:bg-dark_secoundary dark:text-primary py-2 text-sm px-5 rounded-3xl absolute bottom-4 left-3">
        שמירה וסיום
      </button> */}
    </div >
  )
}

export default CreateBregade
