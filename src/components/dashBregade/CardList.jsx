import React, { useEffect, useState } from 'react'
import CardItem from './CardItem'
import ProgressPei from '../../utils/ProgressPei'
import useDataStore from '../../hooks/useDataStore'
const CardList = () => {
  const { data } = useDataStore()
  const [sumTotalPercentagesOfbrigade, setSumTotalPercentagesOfbrigade] = useState();
  useEffect(() => {
    let totalPercent = 0;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      totalPercent += Number(element.totalSumQualification)
    }
    setSumTotalPercentagesOfbrigade(totalPercent / data.length)
  }, [])
  return (
    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 w-full'>
      <div className=" bg-primary flex-1 items-center p-3 rounded-lg border flex flex-col justify-between">
        <div className=" flex flex-col items-center justify-between w-full">
          <div className=" font-semibold text-lg">כשירות פיקודית </div>
          <div className=" font-semibold text-sm"> {data.length} חטיבות </div>
        </div>
        <div className=" flex flex-col items-center justify-center h-full">
          <ProgressPei widthPei={"0.7vw"} perValue={sumTotalPercentagesOfbrigade} color={"text-[#48CFAE]"} size={"10vw"} sizeOfText={'text-2xl'} />
        </div>
      </div>
      {data?.map((item, index) => (
        <CardItem item={item} key={index} />
      ))}
    </div>
  )
}
export default CardList