import React, { useEffect, useState } from 'react'
import icons from '../utils/icons/icons'
import useDataStore from '../hooks/useDataStore'


export default function AddUser() {
    const { user } = useDataStore()
    const [newUser, setNewUser] = useState({
        FirstName: "",
        LastName: "",
        PicturURL: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
        ProferredName: "",
        Title: "",
        WorkEmail: "",
        userId: "",
        userName: "",
        access: "admin",
    })

    useEffect(() => {
        console.log(newUser);
    }, [newUser])


    return (
        <>
            <div className='bg-primary dark:bg-dark_primary flex-1 rounded-r-3xl p-5'>
                <div className="flex">
                    <div className="flex-1 flex justify-center items-center bg-accent_bg dark:bg-dark_secoundary rounded-3xl">
                        <div className="mx-2">
                            <div className="flex justify-around items-center">

                                {/* user? avater  */}
                                <div className="grow flex justify-center">
                                    <div className="avatar mx-2 ">
                                        <div className="w-28 rounded-full">
                                            <img src={user?.PicturURL} alt={user?.userName} />
                                        </div>
                                    </div>
                                </div>
                                {/* full name */}
                                <div className="">
                                    <label className="input rounded-3xl flex items-center gap-2 my-4">
                                        {<icons.User />}
                                        <input type="text" className="grow" placeholder="שם פרטי" defaultValue={newUser.FirstName} onChange={(e) => setNewUser({ ...user, FirstName: e.target.value })} />
                                    </label>
                                    <label className="input rounded-3xl flex items-center gap-2 my-4  ">
                                        {<icons.Card />}
                                        <input type="text" className="grow " placeholder="שם משפחה" defaultValue={newUser.LastName} onChange={(e) => setNewUser({ ...user, LastName: e.target.value })} />
                                    </label>
                                </div>
                            </div>

                            <div className="flex border justify-around">
                                <label className="input rounded-3xl flex items-center gap-2 my-2 ml-2">
                                    {<icons.Rank size={20} />}
                                    <input type="text" className="grow " placeholder="דרגה" defaultValue={newUser.Title} onChange={(e) => setNewUser({ ...user, Title: e.target.value })} />
                                </label>
                                <label className="input rounded-3xl flex items-center gap-2 my-2">
                                    {<icons.Numbers size={20} />}
                                    <input type="text" className="grow " placeholder="מספר אישי" defaultValue={newUser.userId} onChange={(e) => setNewUser({ ...user, userId: e.target.value })} />
                                </label>
                            </div>
                            <div className="flex border justify-around">
                                <label className="input rounded-3xl flex items-center gap-2 my-2">
                                    {<icons.Building />}
                                    <input type="text" className="grow " placeholder="שם בסיס" defaultValue={newUser.ProferredName} onChange={(e) => setNewUser({ ...user, FirstName: e.target.value })} />
                                </label>
                                {/* <label className="input rounded-3xl flex items-center gap-2 my-2">
                                    {<icons.Security />}
                                    <select dir='rtl' className="select select-bordered w-full max-w-xs border-none focus:border-none">
                                        <option disabled selected>Who shot first?</option>
                                        <option>Han Solo</option>
                                        <option>Greedo</option>
                                    </select>
                                </label> */}
                                <label className="input rounded-3xl flex items-center gap-2 my-2" defaultValue={newUser.access} onChange={(e) => setNewUser({ ...user, access: e.target.value })}>
                                    {<icons.Security />}
                                    <input type="text" className="grow " placeholder="רמת הרשאה" />
                                </label>
                            </div>
                            <div className="">
                                <label className="input rounded-3xl flex items-center gap-2 my-4">
                                    {<icons.Role />}
                                    <input type="text" className="grow " placeholder="תפקיד" defaultValue={newUser.FirstName} onChange={(e) => setNewUser({ ...user, FirstName: e.target.value })} />
                                </label>
                            </div>

                            <a href='' className="flex my-4">
                                <button className="btn btn-outline bg-accent grow rounded-3xl">
                                    הוספת משתמש
                                </button>
                            </a>


                        </div>
                    </div>

                </div>
            </div>)
        </>
    )
}
