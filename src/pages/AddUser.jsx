import React, { useEffect, useState } from 'react'
import icons from '../utils/icons/icons'
import useDataStore from '../hooks/useDataStore'


export default function AddUser() {
    const { user, usersList, setUsersList, setToast } = useDataStore()
    // console.log(usersList);
    const [newUser, setNewUser] = useState({
        FirstName: "",
        LastName: "",
        PicturURL: "../../public/imageRegister.png",
        ProferredName: "",
        Title: "",
        WorkEmail: "",
        userId: "",
        userName: "",
        access: "admin",
    })


    const handleAddNewUser = () => {
        console.log({ "new user": newUser });
        if (!newUser.userId) { alert("חסר מספר אישי"); return; }
        if (usersList.find(user => user.userId === newUser.userId)) { alert("משתמש כבר קיים"); return; }
        const newArray = [...usersList]
        newArray.push(newUser)
        setUsersList(newArray);
    }


    return (
        <>
            <div className='bg-primary dark:bg-dark_primary flex-1 p-5 py-10'>
                <div className="flex h-full">
                    <div className="flex-1 flex justify-center items-center bg-accent_bg dark:bg-dark_secoundary rounded-3xl">
                        <div className="m-2">

                            <div className="flex justify-around items-center">
                                {/* user? avater  */}
                                <div className="grow flex justify-center">
                                    <div className="avatar mx-2 ">
                                        <div className="w-28 rounded-full">
                                            <img src={newUser?.PicturURL} alt={newUser?.userName} />
                                        </div>
                                    </div>
                                </div>

                                {/* full name */}
                                <div className="">
                                    <label className="input rounded-3xl flex items-center gap-2 my-4">
                                        {<icons.User />}
                                        <input type="text" className="grow" placeholder="שם פרטי" defaultValue={newUser.FirstName} onChange={(e) => setNewUser({ ...newUser, FirstName: e.target.value })} />
                                    </label>
                                    <label className="input rounded-3xl flex items-center gap-2 my-4  ">
                                        {<icons.Card />}
                                        <input type="text" className="grow " placeholder="שם משפחה" defaultValue={newUser.LastName} onChange={(e) => setNewUser({ ...newUser, LastName: e.target.value })} />
                                    </label>
                                </div>

                            </div>

                            {/* title */}
                            <div className="">
                                <label className="input rounded-3xl flex items-center gap-2 mb-5">
                                    {<icons.Rank size={20} />}
                                    <input type="text" className="grow " placeholder="דרגה" defaultValue={newUser.Title} onChange={(e) => setNewUser({ ...newUser, Title: e.target.value })} />
                                </label>

                            </div>

                            {/* user ID */}
                            <div className="">
                                <label className="input rounded-3xl flex items-center gap-2 my-5">
                                    {<icons.Numbers size={20} />}
                                    <input type="text" className="grow " placeholder="מספר אישי" defaultValue={newUser.userId} onChange={(e) => setNewUser({ ...newUser, userId: e.target.value })} />
                                </label>
                            </div>

                            {/* name base */}
                            <div className="">
                                <label className="input rounded-3xl flex items-center gap-2 my-5">
                                    {<icons.Building />}
                                    <input type="text" className="" placeholder="שם בסיס" defaultValue={newUser.ProferredName} onChange={(e) => setNewUser({ ...newUser, ProferredName: e.target.value })} />
                                </label>
                            </div>

                            {/* access */}
                            <div className="">
                                <label className="input w-full rounded-3xl flex items-center gap-2 my-2">
                                    {<icons.Security />}
                                    <select className='flex-1 w-full outline-none' onChange={(e) => setNewUser({ ...newUser, access: e.target.value })}>
                                        <option disabled selected>רמת הרשאה</option>
                                        <option value="מנהל">מנהל</option>
                                        <option value="עורך">עורך</option>
                                        <option value="צופה">צופה</option>
                                    </select>
                                </label>
                            </div>

                            {/* role */}
                            <div className="">
                                <label className="input rounded-3xl flex items-center gap-2 my-5">
                                    {<icons.Role />}
                                    <input type="text" className="grow " placeholder="תפקיד" defaultValue={newUser.ProferredName} onChange={(e) => setNewUser({ ...newUser, ProferredName: e.target.value })} />
                                </label>
                            </div>

                            <div onClick={() => handleAddNewUser()} className="flex my-4">
                                <button className="btn btn-outline bg-accent grow rounded-3xl">
                                    הוספת משתמש
                                </button>
                            </div>

                            <div className="border flex justify-center">
                                <img height={285} width={285} src="../../public/Add friends-rafiki.png" alt="Add user" />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
