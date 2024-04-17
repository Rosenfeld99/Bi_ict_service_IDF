import React from 'react'
import Topbar from '../components/topbat/Topbar'
import useDataStore from '../hooks/useDataStore'
import { Link } from 'react-router-dom'

const Help = () => {
  const { user } = useDataStore()

  return (
    <div className='bg-primary dark:bg-dark_primary flex-1 rounded-r-3xl p-5'>
      <Topbar title={'דף עזרה'} toggelExcle={false} showTheme={true} />
      {!user && <Link to={'/'}>
        <button>חזרה לדף הרשמה</button>
      </Link>}
    </div>
  )
}

export default Help