import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ContextStore } from '../context/ContextStore'
import { API_URL_DATA_DB } from '../constant';

const useDataStore = () => {
    const { user, setUser,
        usersList, setUsersList,
        data, setData, toast, setToast, showToast, setShowToast, awaitRoute, setAwaitRoute, systemStract, setSystemStract } = useContext(ContextStore);

    // useEffect(() => {
    //     apiGet(API_URL_DATA_DB, "GET")
    // }, [])

    {/* Toast */ }
    const handelToast = (title, message, type, time) => {
        setShowToast(true)
        setToast({ title: title, message: message, type: type, time: time });
    }

    const getBregadeSingle = (bregadeId) => {
        return data.find((item) => item?.brigade_id == bregadeId)
    }

    const apiMethods = async (url, bodyData, method) => {
        console.log(JSON.stringify(bodyData));
        console.log(url);
        console.log(method);
        try {
            await fetch(url, {
                method,
                headers: {
                    accept: 'application/json; odata=verbose',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
                mode: "no-cors"
            }).then(response => {
                if (!response.ok) {
                    console.log(response);
                    throw Error('could Not fetch data!!!')
                }
                return response.json()
            }).then(data => { console.log(data); })
        } catch (error) {
            console.log('Error registering: ', error);
            return { status: "failed", error }
        }
    }



    const apiGet = async (url, method) => {
        try {
            fetch(url, {
                method,
                headers: {
                    accept: 'application/json; odata=verbose',
                    'Content-Type': 'application/json; odata=verbose',
                },
            })
                .then(response => {

                    if (!response.ok) {
                        throw Error('could Not fetch data!!!')
                    }
                    return response.json()
                }).then(data => { console.log(data); })
        } catch (error) {
            console.log('Error registering: ', error);
            return { status: "failed", error }
        }
    }

    return {
        user, setUser,
        usersList, setUsersList,
        data, setData,
        toast, setToast, showToast, setShowToast,
        handelToast,
        getBregadeSingle,
        apiMethods,
        awaitRoute, setAwaitRoute,
        systemStract, setSystemStract
    }
}

export default useDataStore