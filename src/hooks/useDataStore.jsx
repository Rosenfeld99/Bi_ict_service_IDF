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

    const halndleLocalStorage = (newData) => {
        localStorage.setItem("BI_DATA", newData)
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

    // upload image
    // const HandleGetImages = (URL, newUpload,) => {
    //     // try {
    //     //     const response = await fetch(
    //     //         URL,
    //     //         {
    //     //             method: 'POST',
    //     //             headers: {
    //     //                 accept: 'application/json;',
    //     //                 'Content-Type': 'application/json;'
    //     //             },
    //     //         })
    //     //     const result = await response.json();
    //     //     const arrayOfResImage = result.row;
    //     //     if (newUpload) {
    //     //         return arrayOfResImage[0]
    //     //     } else {
    //     //         return arrayOfResImage
    //     //     }

    //     // } catch (error) {
    //     //     console.log('Error Get Image: ', error);
    //     //     return { status: "failed", error }
    //     // }
    //     return "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
    // }

    const HandleGetImages = (URL, newUpload,) => {
        // try {
        //     const response = await fetch(
        //         URL,
        //         {
        //             method: 'POST',
        //             headers: {
        //                 accept: 'application/json;',
        //                 'Content-Type': 'application/json;'
        //             },
        //         })
        //     const result = await response.json();
        //     const arrayOfResImage = result.row;
        //     if (newUpload) {
        //         return arrayOfResImage[0]
        //     } else {
        //         return arrayOfResImage
        //     }

        // } catch (error) {
        //     console.log('Error Get Image: ', error);
        //     return { status: "failed", error }
        // }
        return "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
        systemStract, setSystemStract,
        halndleLocalStorage,
        HandleGetImages,
    }
}

export default useDataStore
