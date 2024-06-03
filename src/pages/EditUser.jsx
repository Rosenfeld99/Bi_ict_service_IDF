import React, { useEffect, useState } from 'react'
import Topbar from '../components/topbar/Topbar'
import { useParams } from 'react-router-dom'
import useDataStore from '../hooks/useDataStore'
import icons from '../utils/icons/icons'

const EditUser = () => {
    const { id } = useParams()
    // console.log(id);
    const { usersList, data } = useDataStore()
    const [user, setUser] = useState(null)
    const [open, setOpen] = useState(false)
    // console.log(data);

    useEffect(() => {
        getSingleUser()
    }, [id])

    const getSingleUser = () => {
        const filterdUser = usersList.find((item, index) => item.userId == id)
        // console.log(filterdUser);
        setUser(filterdUser)
    }
    return (
        <div className='bg-primary dark:bg-dark_primary flex-1 p-5 py-10'>
            <Topbar ManageSystem={true} title={'משתמשים'} toggelExcle={false} showTheme={true} />
            <div className="flex gap-8 py-10">
                <div className="flex items-center justify-center h-full">
                    <div className=" p-10 flex justify-center items-center bg-accent_bg dark:bg-dark_secoundary rounded-3xl">
                        <div className="m-2">

                            <div className="flex justify-around items-center">
                                {/* user? avater  */}
                                <div className="grow flex justify-center">
                                    <div className="avatar mx-2 ">
                                        <div className="w-28 rounded-full">
                                            <img className=' bg-gray-400' src={user?.PicturURL} alt={user?.userName} />
                                        </div>
                                    </div>
                                </div>

                                {/* full name */}
                                <div className=" w-full">
                                    <label className="input rounded-3xl flex items-center gap-2 my-4">
                                        {<icons.User />}
                                        <p className='flex-1'>{user?.FirstName}</p>
                                    </label>
                                    <label className="input rounded-3xl flex items-center gap-2 my-4  ">
                                        {<icons.Card />}
                                        <p className=' flex-1'>{user?.LastName}</p>
                                    </label>
                                </div>

                            </div>

                            {/* title */}
                            <div className="">
                                <label className="input rounded-3xl flex items-center gap-2 mb-5">
                                    {<icons.Rank size={20} />}
                                    <p type="text"  >{user?.Title}</p>
                                </label>

                            </div>

                            {/* user ID */}
                            <div className="">
                                <label className="input rounded-3xl flex items-center gap-2 my-5">
                                    {<icons.Numbers size={20} />}
                                    <p type="text"  >{user?.userId}</p>
                                </label>
                            </div>

                            {/* name base */}
                            <div className="">
                                <label className="input rounded-3xl flex items-center gap-2 my-5">
                                    {<icons.Building />}
                                    <p type="text" className=""  >{user?.ProferredName}</p>
                                </label>
                            </div>

                            {/* access */}
                            <div className="">
                                <label className="input w-full rounded-3xl flex items-center gap-2 my-2">
                                    {<icons.Security />}
                                    <select className='flex-1 w-full outline-none' >
                                        <option disabled selected>רמת הרשאה מערכת</option>
                                        <option value="מנהל">מנהל</option>
                                        <option value="עורך">עורך</option>
                                        <option value="צופה">צופה</option>
                                    </select>
                                </label>
                            </div>
                            <div className="">
                                <label className="input w-full rounded-3xl flex items-center gap-2 my-5">
                                    {<icons.Partition />}
                                    <p className='flex-1 w-full outline-none'>רמת הרשאה מערכת</p>
                                    <button onClick={() => setOpen(true)}>{<icons.Pen />}</button>
                                </label>
                            </div>

                            {/* role */}
                            <div className="">
                                <label className="input rounded-3xl flex items-center gap-2 my-5">
                                    {<icons.Role />}
                                    <input type="text" className="grow " value={user?.ProferredName} />
                                </label>
                            </div>

                            <div onClick={() => handleAdduser()} className="flex my-4">
                                <button className="btn btn-outline bg-accent grow rounded-3xl">
                                    עריכת משתמש
                                </button>
                            </div>


                        </div>
                        <div className="flex justify-center">
                            <img height={500} width={500} src="../../public/Update-bro.png" alt="Add user" />
                        </div>
                    </div>

                </div>
                {/* part select and make access for bregade */}
                {open && <div className=" flex-1 relative bg-secoundary px-10">
                    <button onClick={() => setOpen(false)} className=" absolute top-0 right-0 w-8 h-8 flex items-center justify-center bg-accent rounded-l-xl  rounded-t-none shadow-[#0000003c] shadow-md">
                        <icons.Close className=' w-full h-full p-1' />
                    </button>
                    <div className=" text-xl font-semibold text-center pt-10 pb-5 text-primary"> הגדר הרשאה לפי חטיבות</div>
                    {data.map((item, index) => (
                        <div className=" border">
                            <div className="bg-primary px-3 py-1.5 font-medium text-gray-800 dark:text-white shadow-[#0000003c] shadow-md text-xl">{item?.brigadeName}</div>
                            <div className=" p-2 flex items-center gap-7">
                                <div className=" flex items-center gap-2">
                                    <input onChange={'(e) => setFormInputs({ ...formInputs, amount: e.target.checked })'} type='checkbox' className=" bg-primary px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-white" />
                                    <div className=" text-primary">מנהל</div>
                                </div>
                                <div className=" flex items-center gap-2">
                                    <input onChange={'(e) => setFormInputs({ ...formInputs, ict: e.target.checked })'} type='checkbox' className=" bg-primary px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-white" />
                                    <div className=" text-primary">עורך</div>
                                </div>
                                <div className=" flex items-center gap-2">
                                    <input onChange={'(e) => setFormInputs({ ...formInputs, arm: e.target.checked })'} type='checkbox' className=" bg-primary px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-white" />
                                    <div className=" text-primary">צופה</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
        </div>
    )
}

export default EditUser