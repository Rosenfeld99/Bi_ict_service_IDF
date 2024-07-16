import { useEffect, useState } from 'react'
import Topbar from '../components/topbar/Topbar'
import useDataStore from '../hooks/useDataStore'

import HeaderCreateData from '../utils/HeaderCreateData'
import { FaPen } from 'react-icons/fa'
import { fixAndReturnNumber, generateID } from '../utils/func'
import { useNavigate, useSearchParams } from 'react-router-dom'
import TableGrid from '../components/table/TableGrid'

const EditBregade = () => {
  const { data, getBregadeSingle, user, apiMethods, setData, setAwaitRoute, halndleLocalStorage } = useDataStore()
  const [params] = useSearchParams()
  const navigateion = useNavigate()
  const [checkChanges, setCheckChanges] = useState(false)
  const [formBattalion, setFormBattalion] = useState({
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
  const [formBregade, setFormBregade] = useState()


  useEffect(() => {
    if (params.get('q')) {
      // console.log(getBregadeSingle(params.get('q')));
      const singleBregade = getBregadeSingle(params.get('q'))
      // console.log(" singleBregade : ", singleBregade);
      setFormBregade(singleBregade)
      setFormBattalion(singleBregade?.battalion && singleBregade?.battalion[0] || [])
      setBregadeBattalion(singleBregade?.battalion || [])
      setCurrentBattailion(singleBregade?.battalion && singleBregade?.battalion[0] || {})
      // console.log(" singleBregade : ", singleBregade);
    }
  }, [params.get('q')])

  // find currnet battalion by click 
  // const handleSelectBattalion = (id) => {
  //   const res = data?.find((item) => item.battalion.find((bt) => bt.battalion_id === id));
  //   setCurrentBattailion(res?.battalion?.find(item => item?.battalion_id == id))

  // }

  const handleInputBregadeNameChange = (inputVal, imageURL) => {
    setCheckChanges(true)
    setAwaitRoute(true)
    const formattedDate = new Date().toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\./g, '-');
    setFormBregade({ ...formBregade, brigadeName: inputVal, imageURL: imageURL, lastUpdateTime: formattedDate, lastUpdater: user?.userName })
    // console.log(formBregade);
    // handleClickSaveAndDone({}, true)
  }



  // const handleClickSaveAndDone = (state, isCalc) => {

  //   // handle cut data key for dashboard
  //   if (isCalc && formBregade?.battalion?.length > 0) {
  //     console.log("in case");

  //     const newArrayMeans = [];
  //     for (let i = 0; i < formBregade?.battalion?.length; i++) {
  //       const element = formBregade?.battalion[i];
  //       for (let j = 0; j < element?.means?.length; j++) {
  //         let createRealProcent = element?.means[j]?.procent || 0;
  //         if (element?.means[j]?.properAmm != "" && element?.means[j]?.amount != "") {
  //           createRealProcent = element?.means[j]?.procent * element?.means[j]?.properAmm / element?.means[j]?.amount
  //           newArrayMeans?.push({ meansName: element?.means[j]?.meansName, procent: element?.means[j]?.procent, realProcent: createRealProcent, amount: element?.means[j].amount });
  //           // console.log("create obj : ", { meansName: element?.means[j]?.meansName, procent: element?.means[j]?.procent, realProcent: createRealProcent });
  //         }
  //         else {
  //           if (element?.means[j]?.properICT != "" && element?.means[j]?.amount != "") {
  //             createRealProcent = element?.means[j]?.procent * element?.means[j]?.properICT / element?.means[j]?.amount
  //             newArrayMeans?.push({ meansName: element?.means[j]?.meansName, procent: element?.means[j]?.procent, realProcent: createRealProcent, amount: element?.means[j].amount });
  //           }
  //         }
  //       }
  //     }

  //     // reduce the array means --> to make shure without duplicate
  //     const reducedData = Object.values(newArrayMeans.reduce((acc, { meansName, procent, realProcent, amount }) => {
  //       if (!acc[meansName]) {
  //         acc[meansName] = { meansName, procent: 0, realProcent: 0, amount: 0 };
  //       }
  //       acc[meansName].procent += parseFloat(procent);
  //       acc[meansName].realProcent += parseFloat(realProcent);
  //       acc[meansName].amount += Number(amount);
  //       return acc;
  //     }, {}));

  //     // Convert the procent values to fixed decimal places if needed
  //     reducedData.forEach(item => {
  //       item.procent = parseFloat(item.procent.toFixed(1));
  //       item.realProcent = parseFloat(item.realProcent.toFixed(1));
  //     });


  //     // Sum up all the percentages of the unit means
  //     let sumOfTotalPercent = 0;
  //     for (let index = 0; index < reducedData.length; index++) {
  //       const element = reducedData[index];
  //       sumOfTotalPercent += element.realProcent;
  //       // console.log(element);
  //     }

  //     // console.log(sumOfTotalPercent);

  //     let element = formBregade?.battalion;
  //     // console.log(element);
  //     for (let j = 0; j < element.length; j++) {
  //       let sumTotalSumBattalion = 0;
  //       for (let i = 0; i < element[j]?.means.length; i++) {
  //         let curr = element[j]?.means[i]
  //         sumTotalSumBattalion += curr?.totalTypePercent
  //       }
  //       element[j].totalSumBattalion = fixAndReturnNumber(sumTotalSumBattalion > 0 ? Number(sumTotalSumBattalion)?.toFixed(1) : 0);
  //     }

  //     console.log("formBregade : ", formBregade);

  //     let allData = [...data];
  //     for (let i = 0; i < allData?.length; i++) {
  //       if (allData[i]?.brigade_id === formBregade?.brigade_id) {
  //         allData[i] = formBregade
  //         allData[i].totalSumQualification = Number(sumOfTotalPercent)?.toFixed(1)
  //         allData[i].totalViewQualification = reducedData
  //         let updateBatt = allData[i].battalion
  //         for (let j = 0; j < updateBatt?.length; j++) {
  //           let sumTotalSumBattalion = 0;
  //           // update totalSumBattalion-->
  //           let element = updateBatt[j]?.means;
  //           // console.log(element);
  //           for (let t = 0; t < element.length; t++) {
  //             // calc realprocent and update state
  //             element[t].totalTypePercent = fixAndReturnNumber(element[t]?.procent) || 0;
  //             if (element?.[t]?.properAmm != "" && element?.[t]?.amount != "") {
  //               element[t].totalTypePercent = fixAndReturnNumber(element?.[t]?.procent * element?.[t]?.properAmm / element?.[t]?.amount)
  //             }
  //             else {
  //               if (element?.[t]?.properICT != "" && element?.[t]?.amount != "") {
  //                 element[t].totalTypePercent = fixAndReturnNumber(element?.[t]?.procent * element?.[t]?.properICT / element?.[t]?.amount)
  //               }
  //             }
  //             sumTotalSumBattalion += element[t].totalTypePercent
  //           }
  //           updateBatt[j].totalSumBattalion = fixAndReturnNumber(sumTotalSumBattalion);

  //         }
  //         allData[i].battalion = updateBatt
  //       }
  //     }
  //     setData(allData)
  //     setAwaitRoute(false)
  //     halndleLocalStorage(JSON.stringify(allData))
  //     navigateion("/")
  //   }
  //   // if !isClac do clac and cut
  // }

  // ...................................................

  const handleClickSaveAndDone = (state, isCalc) => {
    // If calculation is needed and battalion data is available
    if (isCalc && formBregade?.battalion?.length > 0) {
      const newArrayMeans = [];

      // Collecting data from formBregade battalions
      formBregade.battalion.forEach((battalion) => {
        battalion.means.forEach((mean) => {
          let createRealProcent = mean.procent || 0;

          if (mean.properAmm !== "" && mean.amount !== "") {
            createRealProcent = (mean.procent * mean.properAmm) / mean.amount;
          } else if (mean.properICT !== "" && mean.amount !== "") {
            createRealProcent = (mean.procent * mean.properICT) / mean.amount;
          }

          newArrayMeans.push({
            meansName: mean.meansName,
            procent: mean.procent,
            realProcent: createRealProcent,
            amount: mean.amount,
          });
        });
      });

      // Reduce the array to eliminate duplicates and sum percentages and amounts
      const reducedData = Object.values(newArrayMeans.reduce((acc, { meansName, procent, realProcent, amount }) => {
        if (!acc[meansName]) {
          acc[meansName] = { meansName, procent: 0, realProcent: 0, amount: 0 };
        }
        acc[meansName].procent += parseFloat(procent);
        acc[meansName].realProcent += parseFloat(realProcent);
        acc[meansName].amount += Number(amount);
        return acc;
      }, {}));

      // Convert the procent values to fixed decimal places if needed
      reducedData.forEach(item => {
        item.procent = parseFloat(item.procent.toFixed(1));
        item.realProcent = parseFloat(item.realProcent.toFixed(1));
      });

      // Sum up all the percentages of the unit means
      const sumOfTotalPercent = reducedData.reduce((sum, element) => sum + element.realProcent, 0);

      // Update totalSumBattalion for each battalion
      formBregade.battalion.forEach(battalion => {
        let sumTotalSumBattalion = battalion.means.reduce((sum, mean) => {
          let totalTypePercent = mean.totalTypePercent || 0;
          if (mean.properAmm !== "" && mean.amount !== "") {
            totalTypePercent = (mean.procent * mean.properAmm) / mean.amount;
          } else if (mean.properICT !== "" && mean.amount !== "") {
            totalTypePercent = (mean.procent * mean.properICT) / mean.amount;
          }
          mean.totalTypePercent = fixAndReturnNumber(totalTypePercent);
          return sum + mean.totalTypePercent;
        }, 0);

        battalion.totalSumBattalion = fixAndReturnNumber(sumTotalSumBattalion > 0 ? Number(sumTotalSumBattalion).toFixed(1) : 0);
      });

      // Updating the formBregade object
      formBregade.totalViewQualification = reducedData;
      formBregade.totalSumQualification = Number(sumOfTotalPercent).toFixed(1);

      // Update data with the new formBregade
      const allData = data.map(item =>
        item.brigade_id === formBregade.brigade_id ? formBregade : item
      );

      setData(allData);
      setAwaitRoute(false);
      halndleLocalStorage(JSON.stringify(allData));
      navigateion("/");
    } else {
      // Handle the case when isCalc is false
      // ...
    }
  };
  // ...................................................


  const handleDleteBregade = () => {
    if (confirm("למחוק את חטיבה?")) {
      const filteredData = data?.filter((item) => item?.brigade_id != formBregade?.brigade_id)
      console.log(filteredData);
      setData(filteredData)
      halndleLocalStorage(JSON.stringify(filteredData))
      navigateion(-1)
    }
  }

  const calcAndGetSumAllBattalionOnBregate = () => {
    let sum = 0
    for (let i = 0; i < formBregade?.battalion.length; i++) {
      const element = formBregade.battalion[i].means;
      for (let j = 0; j < element.length; j++) {
        sum += element[j].procent
      }
    }
    return sum
  }

  return (
    <div className='bg-primary dark:bg-dark_primary flex-1 rounded-r-3xl p-5'>
      <Topbar ManageSystem={true} title={'הוספת חטיבה'} toggelExcle={false} showTheme={true} />
      {/* calculator all pecantage for all bregade */}
      {/* <div className="">{fixAndReturnNumber(calcAndGetSumAllBattalionOnBregate())}</div> */}
      {/* header content */}
      <HeaderCreateData isVlaidation={!checkChanges} onClickBtnAdd={() => handleClickSaveAndDone({}, true)} onClickBtnDel={handleDleteBregade} delBtn={'מחיקת חטיבה'} btnAdd={'שמירה וסיום'} placeholderTitle={'הכנס שם חטיבה...'} handleSearch={handleInputBregadeNameChange} input={formBregade?.brigadeName} imageUrl={formBregade?.imageURL} />

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

      {/* btn action */}
      {/* <button className=" bg-green-600 text-primary dark:bg-dark_secoundary dark:text-primary py-2 text-sm px-5 rounded-3xl absolute bottom-4 left-3">
        שמירה וסיום
      </button> */}
    </div >
  )
}

export default EditBregade