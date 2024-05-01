import React from 'react'
import Topbar from '../components/topbar/Topbar'

const Error404 = () => {
  return (
    <div className='bg-primary dark:bg-dark_primary flex-1 rounded-r-3xl p-5'>
      <Topbar title={'דף שגיאה 404'} toggelExcle={false} showTheme={true} />
    </div>
  )
}

export default Error404