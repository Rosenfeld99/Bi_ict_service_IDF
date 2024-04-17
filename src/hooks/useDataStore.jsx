import React from 'react'
import { useContext } from 'react'
import { ContextStore } from '../context/ContextStore'

const useDataStore = () => {
    const { user, setUser,
        usersList, setUsersList,
        data, setData } = useContext(ContextStore);
    return {
        user, setUser,
        usersList, setUsersList,
        data, setData
    }
}

export default useDataStore