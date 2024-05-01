import React from 'react'
import Topbar from '../components/topbar/Topbar'
import HeaderContent from '../utils/HeaderContent'

const Users = () => {
  return (
    <div className='bg-primary dark:bg-dark_primary flex-1 rounded-r-3xl p-5'>
      <Topbar title={'משתמשים'} toggelExcle={false} showTheme={true} />

      {/* header content */}
      <HeaderContent btnAdd={'הוסף משתמש'} numOfTitle={39} placeholderTitle={'חפש שם משתמש'} title={'משתמשים'} />
    </div>
  )
}

export default Users