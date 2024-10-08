import React, { createContext, useState } from 'react'
import { dataDB, userDB, usersListDB } from '../../DB/data'
import { systemMeans } from '../../DB/tractingMeans'
// import { dataDB, userDB, usersListDB } from '../DB/data.js'
export const ContextStore = createContext()

export const ContextStoreProvider = ({ children }) => {
    const [usersList, setUsersList] = useState(usersListDB)
    const [user, setUser] = useState(userDB)
    const [data, setData] = useState(localStorage.getItem("BI_DATA") ? JSON.parse(localStorage.getItem("BI_DATA")) : dataDB || [])
    const [systemStract, setSystemStract] = useState(systemMeans)
    const [awaitRoute, setAwaitRoute] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toast, setToast] = useState({ title: "", message: "", type: "", time: 0 });

    // modal
    const [open, setOpen] = useState(false)

    const contextValue = {
        user, setUser,
        usersList, setUsersList,
        data, setData,
        showToast, setShowToast,
        toast, setToast,
        awaitRoute, setAwaitRoute,
        systemStract, setSystemStract,
        open, setOpen,
    }

    return (
        <ContextStore.Provider value={contextValue}>
            {children}
        </ContextStore.Provider>
    )
}