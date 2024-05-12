import React, { useState } from 'react'
import { generateID } from '../../utils/func';
import { FaTrash } from 'react-icons/fa';
import useDataStore from '../../hooks/useDataStore';

const TableGrid = ({ setFormBregade, formBregade, setCheckChanges, setAwaitRoute, formBattalion, setFormBattalion, bregadeBattalion, setBregadeBattalion, currentBattailion, setCurrentBattailion }) => {
  const custumStyleTitle = ' text-center'
  const custumStyleBody = ' text-center border-t-[1px] border-r-[1px] border-secoundary dark:border-primary'
  const custumStyleBodyFirst = ' text-center border-t-[1px] border-secoundary dark:border-primary'
  const custumStyleInput = ' w-full h-full text-center outline-none bg-accent_bg dark:bg-dark_accent'

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [validateMeansList, setValidateMeansList] = useState(false);
  const { systemStract, setSystemStract } = useDataStore()
  const [sunOfTotalPercent, setSunOfTotalPercent] = useState(formBattalion?.totalSumBattalion || 0)


  console.log(formBattalion?.totalSumBattalion);

  const handleAddBattalion = () => {
    console.log("Add battalion run!");
    // validate of form new battalion
    if (formBattalion?.battalionName && formBattalion?.battalion_id && formBattalion?.percentOfUnit) {
      console.log("some logs");
      // TODO :  validation for meansName and procent the only yhis properties is requard
      setCheckChanges && setCheckChanges(true)
      setAwaitRoute && setAwaitRoute(true)
      const filterdMeans = formBattalion?.means?.filter((item) => item?.meansName && item?.procent)
      let newBat = formBattalion
      newBat.means = filterdMeans
      setFormBattalion({ ...newBat, battalion_id: generateID() })

      const listBattalion = [...bregadeBattalion]
      listBattalion.push(formBattalion)
      setBregadeBattalion(listBattalion)
      setFormBregade({ ...formBregade, battalion: listBattalion })
      console.log("listBattalion : ", listBattalion);
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
      setCurrentBattailion(formBattalion)
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
        setFormBattalion({ ...formBattalion, percentOfUnit: inputVal });
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
        // console.log("amount");
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
          sum += parseInt(formBattalion?.means[i]?.procent);
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
      totalTypePercent: "",
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
        return alert("error : meansName")
      } else {
        const currMeanStract = systemStract?.find((m) => m.meanName == element?.meansName);

        if (currMeanStract?.amount && element?.amount == "") {
          setValidateMeansList(false)
          return alert("error : amount")
        }
        else if (currMeanStract?.ict && element?.properICT == "") {
          setValidateMeansList(false)
          return alert("error : ict")
        }
        else if (currMeanStract?.arm && element?.properAmm == "") {
          setValidateMeansList(false)
          return alert("error : amm")
        }
      }
    }
    if (currItem?.battalion_id && currItem?.battalionName && currItem?.percentOfUnit) {
      let allBattalion = [...bregadeBattalion]
      const filterdMeans = currItem?.means?.filter((item) => item?.meansName && item?.procent)
      let sum = 0;
      for (let i = 0; i < filterdMeans.length; i++) {
        const element = filterdMeans[i];
        sum += parseInt(element?.procent)
        // TODO : chack all percent if is small from totlal pricent
      }
      console.log(sum);
      currItem.means = filterdMeans;
      for (let index = 0; index < allBattalion.length; index++) {
        if (allBattalion[index]?.battalion_id == currItem?.battalion_id) {
          allBattalion[index] = currItem;
        }
      }
      // call func save the bregate 
      setBregadeBattalion(allBattalion)
    }
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
    })
  }

  const handleDeleteBattalion = (btId) => {
    if (btId) {
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
            totalTypePercent: "",
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
            totalTypePercent: "",
            comments: "",
          }
        ],
        percentOfUnit: "",
        totalSumBattalion: "",
        comments: "",
      },)
      // TODO get the index in array and update the state if currentBattalion to array in index -1
      // call func save the bregate 
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
    // console.log(currSlect, index, renderOption);
    return (
      <React.Fragment>

        {renderOption?.typeOption?.length > 0 ? <select disabled={!renderOption} onChange={(e) => handleInputsBregadeChange(e.target.value, "nameType", currSlect?.type_id)} className={`${!renderOption ? "cursor-not-allowed bg-[#ddd] opacity-50" : "bg-transparent outline-none"}`} ><option className=' bg-secoundary text-black' disabled selected>{currSlect?.nameType ? currSlect?.nameType : "בחר סוג אמצעי"}</option>{renderOption?.typeOption?.map((listOption, indexListOption) => (<option key={listOption?.id} value={listOption?.value}>{listOption?.value}</option>))}</select> :
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
      alert("הגדר אחוזים ברמת החטיבה")
      return false
    }
    if (parseInt(val) > parseInt(formBattalion?.percentOfUnit)) {

      alert("האחוזים הפרטנים לא יכולים להיות גדולים מהאחוזים הכללים")
      // setSunOfTotalPercent(sunOfTotalPercent - val)
      return false
    }
    if (val < 0) {
      console.log(val);
      alert("נדרש מספר חיובי")
      return false
    }
    let sum = parseInt(val);
    for (let i = 0; i < formBattalion?.means?.length; i++) {
      if (formBattalion?.means[i]?.procent) {
        if (index === i) {
          let old = [...formBattalion?.means]
          old[i].procent = 0;
        }
        sum += parseInt(formBattalion?.means[i]?.procent)
        console.log(parseInt(formBattalion?.means[i]?.procent));
      }
    }
    if (sum <= formBattalion?.totalSumBattalion) {
      setSunOfTotalPercent(sum)
    }
    console.log(formBattalion?.means, sum);
    if (sum > parseInt(formBattalion?.percentOfUnit)) {
      alert("האחוזים הפרטנים לא יכולים להיות גדולים מהאחוזים הכללים")
      setSunOfTotalPercent(sunOfTotalPercent - val)
      return false
    }
    handleInputsBregadeChange(parseInt(val), "procent", idToUpdate)
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="overflow-x-auto w-full bg-accent_bg dark:bg-dark_accent h-fit rounded-lg border-secoundary border-[1px] dark:border-primary">
        <div className="p-3 flex items-center justify-between">
          <input type='text' placeholder='הכנס שם גדוד..' value={formBattalion?.battalionName} onChange={(e) => handleInputsBregadeChange(e.target.value, "battalionName")} className=' outline-none placeholder:text-neutral font-bold dark:text-dark_secoundary text-neutral bg-accent dark:bg-dark_accent_bg px-3 rounded-lg py-1 w-fit text-xl flex-row-reverse' />
          <div className="border flex  bg-accent dark:bg-dark_accent_bg rounded-lg">
            <div className="flex justify-center items-center font-semibold text-2xl mx-2">
              % {formBattalion?.totalSumBattalion}
            </div>
            <div className="flex justify-center items-center font-semibold text-2xl mx-1">%</div>
            <input type='number' placeholder='...' value={formBattalion?.percentOfUnit}
              onChange={(e) => handleInputsBregadeChange(e.target.value, "percentOfUnit")}
              className='outline-none bg-transparent rounded-lg  w-[9vh] placeholder:text-neutral font-bold
               dark:text-dark_secoundary text-neutral px-3 py-1 text-xl'
            />
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
                {/* <td className={custumStyleBody}><input type='text' onChange={(e) => handleInputsBregadeChange(e.target.value, "meansName", bat?.type_id)} className={custumStyleInput} defaultValue={bat?.meansName} /></td> */}
                {/* <td className={custumStyleBody}><input type='text' onChange={(e) => handleInputsBregadeChange(e.target.value, "nameType", bat?.type_id)} className={custumStyleInput} defaultValue={bat?.nameType} /></td> */}


                <td className={custumStyleBody}> <select onChange={(e) => { handleInputsBregadeChange(e.target.value, "meansName", bat?.type_id) }} className="bg-transparent outline-none" ><option disabled selected>{bat?.meansName ? bat?.meansName : "בחר אמצעים"}</option>{systemStract?.map((listOption, indexListOption) => (<option onClick={() => console.log("somet")} key={indexListOption} defaultValue={listOption?.meanName}>{listOption?.meanName}</option>))}</select> </td>
                <td className={custumStyleBody}>{selectOfTypeMeans(index)}</td>
                <td className={`${custumStyleBody} ${!isRequire(index, "amount") && "cursor-not-allowed bg-[#ddd] opacity-50"}`}><input type='number' disabled={!isRequire(index, "amount")} onChange={(e) => handleInputsBregadeChange(e.target.value, "amount", bat?.type_id)} className={`${custumStyleInput} ${!isRequire(index, "amount") && "cursor-not-allowed bg-[#ddd] opacity-50"}`} defaultValue={bat?.amount} /></td>
                <td className={`${custumStyleBody} ${!isRequire(index, "ict") && "cursor-not-allowed bg-[#ddd] opacity-50"}`}><input type='number' disabled={!isRequire(index, "ict")} max={bat?.amount} onChange={(e) => { parseInt(e.target.value) > parseInt(bat?.amount) ? e.target.value = "" : handleInputsBregadeChange(e.target.value, "properICT", bat?.type_id) }} className={`${custumStyleInput} ${!isRequire(index, "ict") && "cursor-not-allowed bg-[#ddd] opacity-50"}`} defaultValue={bat?.properICT} /></td>
                <td className={`${custumStyleBody} ${!isRequire(index, "arm") && "cursor-not-allowed bg-[#ddd] opacity-50"}`}><input type='number' disabled={!isRequire(index, "arm")} max={bat?.amount} onChange={(e) => { parseInt(e.target.value) > parseInt(bat?.amount) ? e.target.value = "" : handleInputsBregadeChange(e.target.value, "properAmm", bat?.type_id) }} className={`${custumStyleInput} ${!isRequire(index, "arm") && "cursor-not-allowed bg-[#ddd] opacity-50"}`} defaultValue={bat?.properAmm} /></td>
                <td className={custumStyleBody}><input type='number' onChange={(e) => {
                  !handleProcentMeansChange(index, e.target.value, bat?.type_id) && (e.target.value = bat?.procent)
                }} className={custumStyleInput} defaultValue={bat?.procent} /></td>
                <td className={custumStyleBody}><input type='text' onChange={(e) => handleInputsBregadeChange(e.target.value, "meansComments", bat?.type_id)} className={custumStyleInput} defaultValue={bat?.comments} /></td>
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