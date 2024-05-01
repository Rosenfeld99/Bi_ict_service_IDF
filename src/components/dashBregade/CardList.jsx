import React from 'react'
import CardItem from './CardItem'
import ProgressPei from '../../utils/ProgressPei'

const CardList = () => {
  return (
    <div className=' grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3'>

      <div className=" bg-primary flex-1 items-center p-3 rounded-lg border flex flex-col justify-between">
        <div className=" flex flex-col items-center justify-between w-full">
          <div className=" font-semibold text-lg">כשירות פיקודית </div>
          <div className=" font-semibold text-sm"> 8 חטיבות </div>
        </div>
        <div className=" flex flex-col items-center justify-center h-full">
          <ProgressPei widthPei={"0.7vw"} perValue={80} color={"text-[#48cfae]"} size={"10vw"} sizeOfText={'text-2xl'}/>
        </div>


      </div>
      {Array.from({ length: 3 }).map((item, index) => (
        <CardItem key={index}/>
      ))}
    </div>
  )
}

export default CardList