import { useEffect, useState } from 'react'
import Topbar from '../components/topbar/Topbar'
import useDataStore from '../hooks/useDataStore'

import HeaderCreateData from '../utils/HeaderCreateData'
import { FaPen, FaTrash } from 'react-icons/fa'
import { generateID } from '../utils/func'

const CreateBregade = () => {
  const { data } = useDataStore()
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // console.log(data[0]);
  const [formBattalion, setFormBattalion] = useState(
    {
      battalionName: "",
      battalion_id: generateID(),
      means: [
        {
          meansName: "",
          meansType: {
            nameType: "",
            type_id: generateID(),
            amount: "",
            properICT: "",
            properAmm: "",
            procent: "",
            comments: "",
          },
          totalTypePercent: "",
          comments: "",
          mean_id: generateID()
          // we need to add uniq id for mean element --> and add more in data file (data.js) 
        },
        {
          meansName: "",
          meansType: {
            nameType: "",
            type_id: generateID(),
            amount: "",
            properICT: "",
            properAmm: "",
            procent: "",
            comments: "",
          },
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

  // find currnet battalion by click 
  const handleSelectBattalion = (id) => {
    const res = data?.find((item) => item.battalion.find((bt) => bt.battalion_id === id));
    setCurrentBattailion(res?.battalion?.find(item => item?.battalion_id == id))
  }

  const custumStyleTitle = ' text-center'
  const custumStyleBody = ' text-center border-t-[1px] border-r-[1px] border-secoundary dark:border-primary'
  const custumStyleBodyFirst = ' text-center border-t-[1px] border-secoundary dark:border-primary'
  const custumStyleInput = ' w-full h-full text-center outline-none bg-accent_bg dark:bg-dark_accent'


  const handleInputBregadeNameChange = (inputVal) => {
    setFormBregade({ ...formBregade, brigadeName: inputVal })
    console.log(formBregade.brigadeName);
  }

  const handleAddBattalion = () => {
    console.log("Add battalion run!");
    // validate of form new battalion
    if (formBattalion?.battalionName) {
      setFormBattalion({ ...formBattalion, battalion_id: generateID() })
      const listBattalion = [...bregadeBattalion]
      listBattalion.push(formBattalion)
      setBregadeBattalion(listBattalion)
      setFormBattalion({
        battalionName: "",
        battalion_id: generateID(),
        means: [
          {
            meansName: "",
            meansType: {
              nameType: "",
              type_id: generateID(),
              amount: "",
              properICT: "",
              properAmm: "",
              procent: "",
              comments: "",
            },
            totalTypePercent: "",
            comments: "",
            mean_id: generateID()
            // we need to add uniq id for mean element --> and add more in data file (data.js) 
          },
          {
            meansName: "",
            meansType: {
              nameType: "",
              type_id: generateID(),
              amount: "",
              properICT: "",
              properAmm: "",
              procent: "",
              comments: "",
            },
            totalTypePercent: "",
            comments: "",
            mean_id: generateID()
          }
        ],
        percentOfUnit: "",
        totalSumBattalion: "",
        comments: "",
      },)
      setCurrentBattailion(formBattalion)
    }
  }

  const handleInputsBregadeChange = (inputVal, keyToUpdate, item_id) => {
    switch (keyToUpdate) {
      case "battalionName":
        if (inputVal) {
          setFormBattalion({ ...formBattalion, battalionName: inputVal });
        }
        break;
      case "meansName":
        setFormBattalion(prevState => ({
          ...prevState,
          means: prevState.means.map(mean => {
            if (mean.mean_id === item_id) {
              return { ...mean, meansName: inputVal };
            }
            return mean;
          })
        }));


        // console.log("meansName");
        break

      default:
        break;
    }
    console.log(formBattalion);
  };

  const handleAddNewLine = () => {
    const listMeens = [...formBattalion.means]
    listMeens.push({
      meansName: "",
      meansType: {
        nameType: "",
        type_id: "",
        amount: "",
        properICT: "",
        properAmm: "",
        procent: "",
        comments: "",
      },
      totalTypePercent: "",
      comments: "",
      mean_id: generateID()
    })
    setFormBattalion({ ...formBattalion, means: listMeens })
    console.log(formBattalion);
  }

  const handelDeleteLine = (type_id) => {
    console.log("type_id", type_id);
    const meenFilter = formBattalion.means.filter((item) => item.mean_id !== type_id);
    setFormBattalion({ ...formBattalion, means: meenFilter });
  };

  const handleUpdateBattalion = () => {
    const currItem = formBattalion
    if (currItem?.battalion_id) {
      let allBattalion = [...bregadeBattalion]
      for (let index = 0; index < allBattalion.length; index++) {
        if (allBattalion[index]?.battalion_id == currItem?.battalion_id) {
          allBattalion[index] = currItem;
        }
      }
      setBregadeBattalion(allBattalion)
    }
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
            meansType: {
              nameType: "",
              type_id: generateID(),
              amount: "",
              properICT: "",
              properAmm: "",
              procent: "",
              comments: "",
            },
            totalTypePercent: "",
            comments: "",
            mean_id: generateID()
            // we need to add uniq id for mean element --> and add more in data file (data.js) 
          },
          {
            meansName: "",
            meansType: {
              nameType: "",
              type_id: generateID(),
              amount: "",
              properICT: "",
              properAmm: "",
              procent: "",
              comments: "",
            },
            totalTypePercent: "",
            comments: "",
            mean_id: generateID()
          }
        ],
        percentOfUnit: "",
        totalSumBattalion: "",
        comments: "",
      },)
      // TODO get the index in array and update the state if currentBattalion to array in index -1

    }
  }


  // console.log(formBregade.brigadeName);
  return (
    <div className='bg-primary dark:bg-dark_primary flex-1 rounded-r-3xl p-5'>
      <Topbar title={'הוספת חטיבה'} toggelExcle={false} showTheme={true} />

      {/* header content */}
      <HeaderCreateData btnAdd={'הוסף גדוד'} placeholderTitle={'הכנס שם חטיבה...'} handleSearch={handleInputBregadeNameChange} />

      <div className=" flex gap-5">
        {/* accordion */}
        {bregadeBattalion?.length > 0 && <div className="w-[24vw] min-w-[100px]">
          <div className="join join-vertical w-full flex-col flex gap-5">
            {/* start */}
            {bregadeBattalion?.map((item, index) => (
              <div key={index} onClick={() => {
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
                    <p key={index} onClick={() => handleSelectBattalion(bat?.battalion_id)} className={` font-semibold cursor-pointer dark:text-dark_secoundary text-neutral px-3 rounded-xl py-2 `}>• {bat?.meansName}</p>
                  ))}
                </div>
              </div>))}
            {/* and */}

          </div>

        </div>}
        {/* vew item content */}
        <div className="flex flex-col gap-3 w-full">
          <div className="overflow-x-auto w-full bg-accent_bg dark:bg-dark_accent h-fit rounded-lg border-secoundary border-[1px] dark:border-primary">
            <div className="p-3 flex items-center justify-between">
              <input placeholder='הכנס שם גדוד..' value={formBattalion.battalionName} onChange={(e) => handleInputsBregadeChange(e.target.value, "battalionName")} autoFocus className=' outline-none placeholder:text-neutral font-bold dark:text-dark_secoundary text-neutral bg-accent dark:bg-dark_accent_bg px-3 rounded-lg py-1 w-fit text-xl flex-row-reverse' />
              <div className=" flex items-center gap-3">
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
                    key={bat.mean_id}
                    className='relative'
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <th className={custumStyleBodyFirst}>{index + 1}</th>
                    <td className={custumStyleBody}><input type='text' onChange={(e) => handleInputsBregadeChange(e.target.value, "meansName", bat?.mean_id)} className={custumStyleInput} defaultValue={bat?.meansName} /></td>
                    <td className={custumStyleBody}><input type='text' className={custumStyleInput} defaultValue={bat?.meansType.nameType} /></td>
                    <td className={custumStyleBody}><input type='number' className={custumStyleInput} defaultValue={bat?.meansType.amount} /></td>
                    <td className={custumStyleBody}><input type='number' className={custumStyleInput} defaultValue={bat?.meansType.properICT} /></td>
                    <td className={custumStyleBody}><input type='number' className={custumStyleInput} defaultValue={bat?.meansType.properAmm} /></td>
                    <td className={custumStyleBody}><input type='number' className={custumStyleInput} defaultValue={bat?.meansType.procent} /></td>
                    <td className={custumStyleBody}><input type='text' className={custumStyleInput} defaultValue={currentBattailion?.comments} /></td>
                    {hoveredIndex === index && (
                      <div onClick={() => handelDeleteLine(bat?.mean_id)} className="absolute top-0 left-0 tooltip tooltip-right" data-tip="מחיקת שורה">
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
        </div>
      </div>

      {/* btn action */}
      <button className=" bg-green-600 text-primary dark:bg-dark_secoundary dark:text-primary py-2 text-sm px-5 rounded-3xl absolute bottom-4 left-3">
        שמירה וסיום
      </button>
    </div >
  )
}

export default CreateBregade