import React from 'react'
import CardItem from './CardItem'

const CardList = () => {
  return (
    <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
    {Array.from({length:5}).map((item,index) =>(
        <CardItem/>
    ))}
    </div>
  )
}

export default CardList