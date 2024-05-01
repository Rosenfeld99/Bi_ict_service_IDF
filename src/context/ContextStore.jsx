import React, { createContext, useState } from 'react'
import { dataDB, userDB, usersListDB } from '../DB/data'
export const ContextStore = createContext()

export const ContextStoreProvider = ({ children }) => {
    const [usersList, setUsersList] = useState(usersListDB)
    const [user, setUser] = useState(userDB)
    const [data, setData] = useState(dataDB)
    const [showToast, setShowToast] = useState(false)
    const [toast, setToast] = useState({ title: "", message: "", type: "", time: 0 });

    const contextValue = {
        user, setUser,
        usersList, setUsersList,
        data, setData,
        showToast, setShowToast,
        toast, setToast,
    }

    return (
        <ContextStore.Provider value={contextValue}>
            {children}
        </ContextStore.Provider>
    )
}