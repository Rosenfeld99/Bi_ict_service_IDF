import React from 'react'
import { useContext } from 'react'
import { ContextStore } from '../context/ContextStore'

const useDataStore = () => {
    const { user, setUser,
        usersList, setUsersList,
        data, setData, toast, setToast, showToast, setShowToast } = useContext(ContextStore);

    {/* Toast */ }
    const handelToast = (title, message, type, time) => {
        setShowToast(true)
        setToast({ title: title, message: message, type: type, time: time });
    }
    return {
        user, setUser,
        usersList, setUsersList,
        data, setData,
        toast, setToast, showToast, setShowToast,
        handelToast
    }
}

export default useDataStore