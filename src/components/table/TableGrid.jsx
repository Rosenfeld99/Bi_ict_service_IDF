import React, { useEffect, useState } from 'react'
import { fixAndReturnNumber, generateID } from '../../utils/func';
import { FaTrash } from 'react-icons/fa';
import useDataStore from '../../hooks/useDataStore';
import Toast from '../../utils/tostify/Toast';
import icons from '../../utils/icons/icons';
import UploadImage from '../../utils/uploadImage/UploadImage';

const TableGrid = ({ handleClickSaveAndDone, setFormBregade, formBregade, setCheckChanges, setAwaitRoute, formBattalion, setFormBattalion, bregadeBattalion, setBregadeBattalion, currentBattailion, setCurrentBattailion }) => {
  const custumStyleTitle = ' text-center'
  const custumStyleBody = ' text-center border-t-[1px] border-r-[1px] border-secoundary dark:border-primary'
  const custumStyleBodyFirst = ' text-center border-t-[1px] border-secoundary dark:border-primary'
  const custumStyleInput = ' w-full h-full text-center outline-none bg-accent_bg dark:bg-dark_accent'

  const { systemStract, setSystemStract, handelToast, toast, setShowToast, showToast, data, halndleLocalStorage } = useDataStore()
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [validateMeansList, setValidateMeansList] = useState(false);
  const [indicatorErrors, setIndicatorErrors] = useState({ index: null, batIndex: null, itemGrid: false });

  // upload image
  const [newImage, setNewImage] = useState();
  useEffect(() => {
    console.log(newImage);
  }, [newImage])

  const handleAddBattalion = () => {
    console.log("Add battalion run!", formBattalion.means[0]?.meansName);
    // validate of form new battalion
    if (formBattalion?.battalionName == "") {
      handelToast("שגיאה", "לא הוגדר שם גדוד", "Error", 10)
      setIndicatorErrors({ index: null, batIndex: null, itemGrid: "battalionName" })
      setTimeout(() => {
        setIndicatorErrors({ ...indicatorErrors, itemGrid: null })
      }, 10000);
      return false
    }
    else if (formBattalion?.percentOfUnit == "") {
      handelToast("שגיאה", "נדרש להגדיר אחוזים של גדוד", "Error", 10)
      setIndicatorErrors({ index: null, batIndex: null, itemGrid: "percentOfUnit" })
      setTimeout(() => {
        setIndicatorErrors({ ...indicatorErrors, itemGrid: null })
      }, 10000);
      return false
    }
    else if (!formBattalion.means[0]?.meansName || !formBattalion.means[0]?.procent) {
      const listMeans = [...formBattalion.means]
      let flagValivateMeans = false;
      for (let i = 0; i < listMeans?.length; i++) {
        if (listMeans[i]?.meanName != "" && listMeans[i]?.procent != "") {
          flagValivateMeans = true
        }
      }
      if (!flagValivateMeans) {

        handelToast("שגיאה", "נדרש להגדיר אמצעים", "Error", 10)
        setIndicatorErrors({ index: null, batIndex: null, itemGrid: "battalionName" })
        setTimeout(() => {
          setIndicatorErrors({ ...indicatorErrors, itemGrid: null })
        }, 10000);
        return false
      }
    }
    else if (validateHandleSaveInSumProcent() != parseFloat(formBattalion?.percentOfUnit)) {
      return handelToast("שגיאה", "סך אחוזים פרטניים שונה מאחוזי הגדוד", "Error", 10)
    }
    else if (formBattalion?.battalion_id) {
      const listMeans = [...formBattalion.means]
      for (let i = 0; i < listMeans?.length; i++) {
        const currMeanStract = systemStract?.find((m) => m.meanName == listMeans[i]?.meansName);
        console.log("currMeanStract : ", currMeanStract);
        if (currMeanStract?.amount && listMeans[i]?.amount == "") {
          setValidateMeansList(false)
          setIndicatorErrors({ index: null, batIndex: null, itemGrid: "amount" })
          handelToast("שגיאה", "נדרש להוסיף כמות", "Error", 10)
          setTimeout(() => {
            setIndicatorErrors({ ...indicatorErrors, itemGrid: null })
          }, 10000);
          return false
        }
        else if (currMeanStract?.ict && listMeans[i]?.properICT == "") {
          setValidateMeansList(false)
          setIndicatorErrors({ index: null, batIndex: null, itemGrid: "ict" })
          handelToast("שגיאה", "נדרש להוסיף כמות", "Error", 10)
          setTimeout(() => {
            setIndicatorErrors({ ...indicatorErrors, itemGrid: null })
          }, 10000);
          handelToast("שגיאה", "נדרש להוסיף תקינות תקשובית", "Error", 10)
          return false
        }
        else if (currMeanStract?.arm && listMeans[i]?.properAmm == "") {
          setValidateMeansList(false)
          setIndicatorErrors({ index: null, batIndex: null, itemGrid: "arm" })
          handelToast("שגיאה", "נדרש להוסיף כמות", "Error", 10)
          setTimeout(() => {
            setIndicatorErrors({ ...indicatorErrors, itemGrid: null })
          }, 10000);
          handelToast("שגיאה", "נדרש להוסיף תקינות חימושית", "Error", 10)
          return false
        }
      }
      console.log("some logs");
      // TODO :  validation for meansName and procent the only yhis properties is requard
      setCheckChanges && setCheckChanges(true)
      setAwaitRoute && setAwaitRoute(true)
      console.log(newImage);
      // set the new bregade
      const filterdMeans = formBattalion?.means?.filter((item) => item?.meansName && item?.procent)
      let newBat = formBattalion
      newBat.means = filterdMeans
      newBat.imageURL = newImage
      newBat.battalion_id = generateID()
      setFormBattalion({ ...newBat })
      setNewImage("")
      console.log(newBat);
      const listBattalion = [...bregadeBattalion]
      listBattalion.push(formBattalion)
      setBregadeBattalion(listBattalion)
      setFormBregade({ ...formBregade, battalion: listBattalion })
      console.log("listBattalion : ", listBattalion);
      // halndleLocalStorage(JSON.stringify(formBregade))
      setFormBattalion({
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
            totalTypePercent: 0,
            comments: "",
          }
        ],
        percentOfUnit: 0,
        totalSumBattalion: "",
        comments: "",
      },)
      setCurrentBattailion(formBattalion)
      setIndicatorErrors({ index: null, batIndex: null, itemGrid: false })
    }
    // call func save the bregate 
  }

  const handleInputsBregadeChange = (inputVal, keyToUpdate, item_id) => {
    setCheckChanges && setCheckChanges(true)
    setAwaitRoute && setAwaitRoute(true)
    switch (keyToUpdate) {
      case "battalionName":
        setFormBattalion({ ...formBattalion, battalionName: inputVal });
        break;
      case "percentOfUnit":
        if (inputVal > 100) {
          alert("מקסימום מספר של אחוזים הוא 100%")
          break
        } else if (inputVal < 0) {
          alert("מינימום מספר של אחוזים הוא 1%")
          break
        }
        setFormBattalion({ ...formBattalion, percentOfUnit: fixAndReturnNumber(inputVal) });
        break;
      case "meansName":
        setFormBattalion(prevState => ({
          ...prevState,
          means: prevState.means.map(mean => {
            if (mean.type_id === item_id) {
              return { ...mean, meansName: inputVal };
            }
            return mean;
          })
        }));
        setIndicatorErrors({ index: null, batIndex: null, itemGrid: false })

        // console.log("meansName");
        break
      case "nameType":
        setFormBattalion(prevState => ({
          ...prevState,
          means: prevState.means.map(mean => {
            if (mean.type_id === item_id) {
              return { ...mean, nameType: inputVal };
            }
            return mean;
          })
        }));
        // console.log("nameType");
        break
      case "amount":
        setFormBattalion(prevState => ({
          ...prevState,
          means: prevState.means.map(mean => {
            if (mean.type_id === item_id) {
              return { ...mean, amount: inputVal };
            }
            return mean;
          })
        }));
        console.log("amount");
        break
      case "properICT":
        setFormBattalion(prevState => ({
          ...prevState,
          means: prevState.means.map(mean => {
            if (mean.type_id === item_id) {
              return { ...mean, properICT: inputVal };
            }
            return mean;
          })
        }));
        // console.log("properICT");
        break
      case "properAmm":
        setFormBattalion(prevState => ({
          ...prevState,
          means: prevState.means.map(mean => {
            if (mean.type_id === item_id) {
              return { ...mean, properAmm: inputVal };
            }
            return mean;
          })
        }));
        // console.log("properAmm");
        break
      case "procent":
        setFormBattalion(prevState => ({
          ...prevState,
          means: prevState.means.map(mean => {
            if (mean.type_id === item_id) {
              return { ...mean, procent: inputVal };
            }
            return mean;
          })
        }));
        let sum = 0;
        for (let i = 0; i < formBattalion?.means?.length; i++) {
          sum += formBattalion?.means[i]?.procent
          console.log(formBattalion?.means[i]?.procent);
        }
        console.log("procent sum : ", sum);
        break
      case "meansComments":
        setFormBattalion(prevState => ({
          ...prevState,
          means: prevState.means.map(mean => {
            if (mean.type_id === item_id) {
              return { ...mean, comments: inputVal };
            }
            return mean;
          })
        }));
        // console.log("procent");
        break
      default:
        break;
    }
    // console.log(formBattalion);
  };

  const handleAddNewLine = () => {
    const listMeens = [...formBattalion.means]
    listMeens.push({
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
    })
    setFormBattalion({ ...formBattalion, means: listMeens })
    console.log(formBattalion);
  }

  const handelDeleteLine = (type_id) => {
    console.log("type_id", type_id);
    const meenFilter = formBattalion.means.filter((item) => item.type_id !== type_id);
    setFormBattalion({ ...formBattalion, means: meenFilter });
  };

  const handleUpdateBattalion = () => {
    let currItem = formBattalion
    for (let i = 0; i < formBattalion?.means?.length; i++) {
      const element = formBattalion?.means[i];
      if (element?.meansName == "") {
        setValidateMeansList(false)
        handelToast("some tittle", "msg", "Error", 10)
        return alert("error : meansName")
      }
      else {
        const currMeanStract = systemStract?.find((m) => m.meanName == element?.meansName);

        if (currMeanStract?.amount && element?.amount == "") {
          setValidateMeansList(false)
          setIndicatorErrors({ index: null, batIndex: null, itemGrid: "amount" })
          handelToast("שגיאה", "נדרש להוסיף כמות", "Error", 10)
          setTimeout(() => {
            setIndicatorErrors({ ...indicatorErrors, itemGrid: null })
          }, 10000);
          return false
        }
        else if (currMeanStract?.ict && element?.properICT == "") {
          setValidateMeansList(false)
          setIndicatorErrors({ index: null, batIndex: null, itemGrid: "ict" })
          handelToast("שגיאה", "נדרש להוסיף כמות", "Error", 10)
          setTimeout(() => {
            setIndicatorErrors({ ...indicatorErrors, itemGrid: null })
          }, 10000);
          handelToast("שגיאה", "נדרש להוסיף תקינות תקשובית", "Error", 10)
          return false
        }
        else if (currMeanStract?.arm && element?.properAmm == "") {
          setValidateMeansList(false)
          setIndicatorErrors({ index: null, batIndex: null, itemGrid: "arm" })
          handelToast("שגיאה", "נדרש להוסיף כמות", "Error", 10)
          setTimeout(() => {
            setIndicatorErrors({ ...indicatorErrors, itemGrid: null })
          }, 10000);
          handelToast("שגיאה", "נדרש להוסיף תקינות חימושית", "Error", 10)
          return false
        }
      }
    }
    if (validateHandleSaveInSumProcent() != parseFloat(formBattalion?.percentOfUnit)) {
      return handelToast("שגיאה", "סך אחוזים פרטניים שונה מאחוזי הגדוד", "Error", 10)
    }
    if (currItem?.battalion_id && currItem?.battalionName && currItem?.percentOfUnit) {
      let allBattalion = [...bregadeBattalion]
      const filterdMeans = currItem?.means?.filter((item) => item?.meansName && item?.procent)
      let sum = 0;
      for (let i = 0; i < filterdMeans.length; i++) {
        const element = filterdMeans[i];
        sum += parseFloat(element?.procent)
        // TODO : chack all percent if is small from totlal pricent
      }
      console.log(sum);
      currItem.means = filterdMeans;
      for (let index = 0; index < allBattalion.length; index++) {
        if (allBattalion[index]?.battalion_id == currItem?.battalion_id) {
          allBattalion[index] = currItem;
        }
      }
      console.log(allBattalion);
      // call func save the bregate 
      setBregadeBattalion(allBattalion)
      setFormBregade({ ...formBregade, battalion: allBattalion })
      console.log(formBregade);
    }
    // handleClickSaveAndDone({}, true)
    setCurrentBattailion({})
    setFormBattalion({
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
          totalTypePercent: 0,
          comments: "",
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
          totalTypePercent: 0,
          comments: "",
        }
      ],
      percentOfUnit: 0,
      totalSumBattalion: "",
      comments: "",
    })
    setIndicatorErrors({ index: null, batIndex: null, itemGrid: false })
    console.log(formBregade);

  }

  const handleDeleteBattalion = (btId) => {
    if (btId) {
      if (confirm("למחוק את גדוד " + currentBattailion?.battalionName)) {
        let filteredBt = [...bregadeBattalion]
        filteredBt = filteredBt?.filter((item) => item?.battalion_id != btId)
        setBregadeBattalion(filteredBt)
        setFormBattalion({
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
            }
          ],
          percentOfUnit: "",
          totalSumBattalion: "",
          comments: "",
        },)
        // TODO get the index in array and update the state if currentBattalion to array in index -1
        // call func save the bregate 
        setCheckChanges(true)
        let updateData = [...data]
        for (let i = 0; i < updateData.length; i++) {
          if (updateData[i]?.brigade_id == formBregade?.brigade_id) {
            updateData[i].battalion = filteredBt
          }
        }
        console.log(updateData);
        halndleLocalStorage(JSON.stringify(updateData))
        handleClickSaveAndDone({}, true)
      }
    }
  }

  const selectOfTypeMeans = (index) => {
    let currSlect = formBattalion?.means[index]
    let renderOption;
    for (let j = 0; j < systemStract.length; j++) {
      if (systemStract[j]?.meanName === currSlect?.meansName) {
        renderOption = systemStract[j]
      }
    }
    return (
      <React.Fragment>

        {renderOption?.typeOption?.length > 0 ?
          <select disabled={!renderOption} onChange={(e) => handleInputsBregadeChange(e.target.value, "nameType", currSlect?.type_id)} className={`${!renderOption ? "cursor-not-allowed bg-[#ddd] opacity-50" : "bg-transparent outline-none"}`} >
            <option className=' bg-secoundary text-black' disabled selected>{currSlect?.nameType ? currSlect?.nameType : "בחר סוג אמצעי"}</option>
            {renderOption?.typeOption?.map((listOption, indexListOption) => (
              <option key={listOption?.id} value={listOption?.value}>{listOption?.value}</option>
            ))}
          </select> :
          // <select disabled className={"cursor-not-allowed bg-[#ddd] opacity-50"} ><option className=' bg-secoundary text-black' disabled selected>{currSlect?.nameType ? currSlect?.nameType : "בחר סוג אמצעי"}</option>{renderOption?.typeOption?.map((listOption, indexListOption) => (<option key={listOption?.id} value={listOption?.value}>{listOption?.value}</option>))}</select>
          <div className="cursor-not-allowed bg-[#ddd] opacity-50">אין סוגי אמצעים</div>
        }
      </React.Fragment>
    )
  }

  const isRequire = (index, lookingForKey) => {
    let currSlect = formBattalion?.means[index]

    let renderOption;
    for (let j = 0; j < systemStract.length; j++) {
      if (systemStract[j]?.meanName === currSlect?.meansName) {
        switch (lookingForKey) {
          case "amount":
            renderOption = systemStract[j]?.amount
            break;
          case "ict":
            renderOption = systemStract[j]?.ict
            break;
          case "arm":
            renderOption = systemStract[j]?.arm
            break;

          default:
            break;
        }
      }

    }
    return renderOption
  }

  const handleProcentMeansChange = (index, val, idToUpdate) => {
    console.log(idToUpdate);
    if (!formBattalion?.percentOfUnit) {
      handelToast("שגיאה", "הגדר אחוזים ברמת החטיבה", "Error", 10)
      return false
    }
    if (parseFloat(val) > parseFloat(formBattalion?.percentOfUnit)) {

      handelToast("שגיאה", "האחוזים הפרטנים לא יכולים להיות גדולים מהאחוזים הכללים", "Error", 10)
      return false
    }
    if (val < 0) {
      console.log(val);
      alert("נדרש מספר חיובי")
      return false
    }
    let sum = parseFloat(val);
    for (let i = 0; i < formBattalion?.means?.length; i++) {
      if (formBattalion?.means[i]?.procent) {
        if (index === i) {
          let old = [...formBattalion?.means]
          old[i].procent = 0;
        }
        sum += parseFloat(formBattalion?.means[i]?.procent)
        console.log(parseFloat(formBattalion?.means[i]?.procent));
      }
    }
    console.log(formBattalion?.means, sum);
    if (sum > parseFloat(formBattalion?.percentOfUnit)) {
      alert("האחוזים הפרטנים לא יכולים להיות גדולים מהאחוזים הכללים")
      return false
    }
    console.log(parseFloat(val));
    handleInputsBregadeChange(parseFloat(val), "procent", idToUpdate)
    return true
  }

  const elementError = (itemName, bat, index) => {
    return <p className={`${indicatorErrors.itemGrid == itemName && bat == "" && isRequire(index, itemName) && " bg-error loading loading-ring w-5 absolute right-[40%] top-1"}`} />
  }

  const validateHandleSaveInSumProcent = () => {
    let sum = 0;
    for (let i = 0; i < formBattalion?.means?.length; i++) {
      if (formBattalion?.means[i]?.procent) {
        sum += parseFloat(formBattalion?.means[i]?.procent)
      }
    }
    // console.log("sum : ", sum);
    return sum;
  }

  return (
    <div className="flex flex-col gap-3 w-full ">
      {/* shows errors */}
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
      <div className="overflow-x-auto w-full bg-accent_bg dark:bg-dark_accent h-fit rounded-lg border-secoundary border-[1px] dark:border-primary ">
        <div className="p-3 flex items-center justify-between">
          <div className=" relative flex  bg-accent dark:bg-dark_accent_bg">
            <p className={`${indicatorErrors.itemGrid == "battalionName" && formBattalion?.battalionName == "" && " bg-error loading loading-ring w-5 absolute left-12 top-2"}`} />
            <input type='text' placeholder='הכנס שם גדוד..' value={formBattalion?.battalionName} onChange={(e) => handleInputsBregadeChange(e.target.value, "battalionName")} className='outline-none placeholder:text-neutral font-bold dark:text-dark_secoundary text-neutral bg-accent dark:bg-dark_accent_bg px-3 rounded-lg py-1 w-fit text-xl flex-row-reverse' />
            {/* upload Image */}
            <UploadImage sizeImage={"w-12"} newImage={formBattalion?.imageURL} setNewImage={setNewImage} position={"dropdown-left"} />
          </div>
          <div className=" top-0 left-0 tooltip tooltip-right" data-tip="אחוזים בתפוסה">
            <div className="flex justify-center items-center font-bold relative text-xl border-2 border-secoundary dark:bg-dark_accent_bg rounded-lg px-7 py-1">
              {<icons.Percentage className='text-sm absolute top-0 right-[4px]' />} {typeof validateHandleSaveInSumProcent() === 'number' ? (validateHandleSaveInSumProcent() % 1 === 0 ? validateHandleSaveInSumProcent().toFixed(0) : validateHandleSaveInSumProcent().toFixed(1)) : validateHandleSaveInSumProcent()}
            </div>
          </div>
          <div className="border flex  bg-accent dark:bg-dark_accent_bg rounded-lg relative px-2">

            <div className=" tooltip tooltip-right" data-tip="הגדרת אחוזים של גדוד">
              <div className="flex justify-center items-center font-semibold text-2xl absolute right-[-15px] px-2">{<icons.Percentage className='text-sm absolute top-0 right-[10px]' />}</div>
              <input step={"any"} type='number' placeholder='0' value={formBattalion?.percentOfUnit !== 0 && formBattalion?.percentOfUnit}
                onChange={(e) => handleInputsBregadeChange(e.target.value, "percentOfUnit")}
                className='outline-none bg-transparent rounded-lg  w-[12vh] placeholder:text-neutral font-bold
               dark:text-dark_secoundary text-neutral px-3 py-1 text-xl'
              />
            </div>


            <p className={`${indicatorErrors.itemGrid == "percentOfUnit" && formBattalion?.percentOfUnit == "" && " bg-error loading loading-ring w-5 absolute left-12 top-2"}`} />
          </div>          <div className=" flex items-center gap-3">
            <div onClick={() => handleDeleteBattalion(formBattalion?.battalion_id)} className="tooltip tooltip-right" data-tip="מחיקת גדוד">
              <button className="flex items-center gap-3 p-1 px-2 bg-accent_bg text-red-500"> <FaTrash /></button>
            </div>
            <button onClick={bregadeBattalion?.find((bt) => bt.battalion_id == formBattalion?.battalion_id) ? handleUpdateBattalion : handleAddBattalion} className=" bg-secoundary text-primary dark:bg-dark_secoundary dark:text-primary py-1 text-sm px-5 rounded-3xl">
              {bregadeBattalion?.find((bt) => bt.battalion_id == formBattalion?.battalion_id) ? "שמירה" : "הוספה גדוד לחטיבה"}
            </button>

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
            {/* add condition if  */}
            {formBattalion?.means?.map((bat, index) => (
              <tr
                key={bat.type_id}
                className='relative'
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <th className={custumStyleBodyFirst}>{index + 1}</th>


                <td className={custumStyleBody}> <select onChange={(e) => { handleInputsBregadeChange(e.target.value, "meansName", bat?.type_id) }} className="bg-transparent outline-none" ><option disabled selected>{bat?.meansName ? bat?.meansName : "בחר אמצעים"}</option>{systemStract?.map((listOption, indexListOption) => (<option onClick={() => console.log("somet")} key={indexListOption} defaultValue={listOption?.meanName}>{listOption?.meanName}</option>))}</select> </td>
                <td className={custumStyleBody}>{selectOfTypeMeans(index)}</td>
                <td className={`${custumStyleBody} ${!isRequire(index, "amount") && "cursor-not-allowed bg-[#ddd] opacity-50"} relative`}><input type='number' disabled={!isRequire(index, "amount")} onChange={(e) => handleInputsBregadeChange(e.target.value, "amount", bat?.type_id)} className={`${custumStyleInput} ${!isRequire(index, "amount") && "cursor-not-allowed bg-[#ddd] opacity-50"} `} defaultValue={bat?.amount} />{elementError("amount", bat?.amount, index)}</td>
                <td className={`${custumStyleBody} ${!isRequire(index, "ict") && "cursor-not-allowed bg-[#ddd] opacity-50"} relative`}><input type='number' disabled={!isRequire(index, "ict")} max={bat?.amount} onChange={(e) => { parseFloat(e.target.value) > parseFloat(bat?.amount) ? e.target.value = "" : handleInputsBregadeChange(e.target.value, "properICT", bat?.type_id) }} className={`${custumStyleInput} ${!isRequire(index, "ict") && "cursor-not-allowed bg-[#ddd] opacity-50"}`} defaultValue={bat?.properICT} />{elementError("ict", bat?.properICT, index)}</td>
                <td className={`${custumStyleBody} ${!isRequire(index, "arm") && "cursor-not-allowed bg-[#ddd] opacity-50"} relative`}><input type='number' disabled={!isRequire(index, "arm")} max={bat?.amount} onChange={(e) => { parseFloat(e.target.value) > parseFloat(bat?.amount) ? e.target.value = "" : handleInputsBregadeChange(e.target.value, "properAmm", bat?.type_id) }} className={`${custumStyleInput} ${!isRequire(index, "arm") && "cursor-not-allowed bg-[#ddd] opacity-50"}`} defaultValue={bat?.properAmm} />{elementError("arm", bat?.properAmm, index)}</td>
                <td className={custumStyleBody}><div className="relative">
                  <input type='number' onChange={(e) => {
                    !handleProcentMeansChange(index, e.target.value, bat?.type_id) ? (e.target.value = "") :
                      handleProcentMeansChange(index, e.target.value, bat?.type_id)
                  }} className={custumStyleInput} defaultValue={bat?.procent} />{<icons.Percentage className='text-sm absolute top-0 right-0' />}
                </div></td>
                <td className={custumStyleBody}><textarea type='text' onChange={(e) => handleInputsBregadeChange(e.target.value, "meansComments", bat?.type_id)} className={custumStyleInput} defaultValue={bat?.comments} /></td>
                {hoveredIndex === index && (
                  <div onClick={() => handelDeleteLine(bat?.type_id)} className="absolute top-0 left-0 tooltip tooltip-right" data-tip="מחיקת שורה">
                    <button className="flex items-center gap-3 p-1 px-2 bg-accent_bg text-red-500"> <FaTrash /></button>
                  </div>
                )}
              </tr>
            ))}

          </tbody>

        </table>
      </div>
      <button onClick={handleAddNewLine} className=" w-fit bg-secoundary text-primary dark:bg-dark_secoundary dark:text-primary py-2 text-sm px-5 rounded-3xl">
        הוספה שורה
      </button>
    </div>)
}

export default TableGrid




