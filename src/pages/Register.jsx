import React from 'react'
import Topbar from '../components/topbat/Topbar'

const Register = () => {
    return (
        <div className='bg-primary dark:bg-dark_primary flex-1 rounded-r-3xl p-5'>
            <Topbar title={'דף הרשמה'} toggelExcle={true} showTheme={true} />
        </div>)
}

export default Register