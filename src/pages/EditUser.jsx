import React, { useEffect, useState } from 'react';
import Topbar from '../components/topbar/Topbar';
import { useParams } from 'react-router-dom';
import useDataStore from '../hooks/useDataStore';
import icons from '../utils/icons/icons';
import "../App.css";

const EditUser = () => {
    const { id } = useParams();
    const { usersList, data, setData, setUsersList } = useDataStore();
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getSingleUser();
    }, [id]);

    const getSingleUser = () => {
        const filteredUser = usersList.find((item) => item.userId == id);
        setUser(filteredUser);
    };

    const styleItem = "h-12 px-4 text-sm font-medium bg-primary rounded-3xl flex items-center gap-2 my-5";

    const handleAccessChange = (item, accessVal) => {
        let updatedUserList = [...usersList];
        for (let i = 0; i < updatedUserList.length; i++) {
            if (updatedUserList[i]?.userId == user?.userId) {
                const accessIndex = updatedUserList[i]?.access?.findIndex((uid) => uid?.brigade_id == item?.brigade_id);
                if (accessIndex == -1) {
                    updatedUserList[i].access.push({ brigade_id: item.brigade_id, brigadeRole: accessVal });
                } else {
                    updatedUserList[i].access[accessIndex].brigadeRole = accessVal;
                }
            }
        }
        setUsersList(updatedUserList);
    };

    const getRoleForBrigade = (brigade_id) => {
        const userAccess = user?.access?.find((access) => access.brigade_id == brigade_id);
        return userAccess ? userAccess.brigadeRole : null;
    };

    const handleUpdateUser = () => {
        // add update the file of users
        console.log(usersList);
    };

    return (
        <div className='bg-primary dark:bg-dark_primary flex-1 rounded-r-3xl p-5 py-10'>
            <Topbar ManageSystem={true} title={'עריכת הרשאות משתמש'} toggelExcle={false} showTheme={true} />
            <div className="flex gap-8 my-10 bg-accent_bg w-fit mx-auto dark:bg-dark_secoundary rounded-3xl overflow-hidden">
                <div className="flex items-center justify-center h-full">
                    <div className="p-10 flex justify-center items-center">
                        <div className="m-2">
                            <div className="flex justify-around items-center">
                                <div className="grow flex justify-center">
                                    <div className="avatar mx-2">
                                        <div className="w-28 rounded-full">
                                            <img className='bg-gray-400' src={user?.PicturURL} alt={user?.userName} />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label className="input rounded-3xl flex items-center gap-2 my-4">
                                        <icons.User />
                                        <p className='flex-1'>{user?.FirstName}</p>
                                    </label>
                                    <label className="input rounded-3xl flex items-center gap-2 my-4">
                                        <icons.Card />
                                        <p className='flex-1'>{user?.LastName}</p>
                                    </label>
                                </div>
                            </div>
                            <div className="">
                                <label className={styleItem}>
                                    <icons.Rank size={20} />
                                    <p type="text">{user?.Title}</p>
                                </label>
                            </div>
                            <div className="">
                                <label className={styleItem}>
                                    <icons.Numbers size={20} />
                                    <p type="text">{user?.userId}</p>
                                </label>
                            </div>
                            <div className="">
                                <label className={styleItem}>
                                    <icons.Building />
                                    <p type="text" className="">{user?.ProferredName}</p>
                                </label>
                            </div>
                            <div className="" onChange={(e) => { setUser({ ...user, role: e.target.value }) }}>
                                <label className={styleItem}>
                                    <icons.Security />
                                    <select className='flex-1 w-full outline-none'>
                                        <option disabled selected>רמת הרשאה מערכת</option>
                                        <option value="admin">מנהל</option>
                                        <option value="editor">עורך</option>
                                        <option value="user">צופה</option>
                                    </select>
                                </label>
                            </div>
                            <div className="">
                                <label className={styleItem}>
                                    <icons.Partition />
                                    <p className='flex-1 w-full outline-none'>רמת הרשאה מערכת</p>
                                    <button onClick={() => setOpen(true)}><icons.Pen /></button>
                                </label>
                            </div>
                            <div className="">
                                <label className={styleItem}>
                                    <icons.Role />
                                    <input type="text" className="grow" value={user?.ProferredName} />
                                </label>
                            </div>
                            <div onClick={handleUpdateUser} className="flex mt-4">
                                <button className="btn btn-outline bg-accent grow rounded-3xl">
                                    עריכת משתמש
                                </button>
                            </div>
                        </div>
                        <div className="2xl:flex justify-center hidden">
                            <img height={500} width={500} src="../../public/Update-bro.png" alt="Add user" />
                        </div>
                    </div>
                </div>
                {open && <div className="animate__slideInLeft flex-1 relative bg-secoundary px-10 max-h-[715px] overflow-y-auto shadow-sm shadow-gray-400">
                    <button onClick={() => setOpen(false)} className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center bg-accent rounded-l-xl rounded-t-none shadow-[#0000003c] shadow-md">
                        <icons.Close className='w-full h-full p-1' />
                    </button>
                    <div className="text-xl font-semibold text-center pt-12 pb-5 text-primary"> הגדר הרשאה לפי חטיבות</div>
                    {data.map((item, index) => (
                        <div className="border mt-2 relative" key={index}>
                            <div className="absolute right-[-20px] shadow-sm shadow-gray-400 items-center flex justify-center top-2 font-semibold bg-accent w-7 h-7 rounded-full">{index + 1}</div>
                            <div className="bg-primary px-3 py-1.5 font-medium text-gray-800 dark:text-white shadow-[#0000003c] shadow-md text-xl">{item?.brigadeName}</div>
                            <div className="p-2 flex items-center gap-7">
                                <div className="flex items-center gap-2">
                                    <input
                                        checked={getRoleForBrigade(item.brigade_id) === "admin"}
                                        onChange={() => handleAccessChange(item, "admin")}
                                        type='checkbox'
                                        className="bg-primary px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-white"
                                    />
                                    <div className="text-primary">מנהל</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        checked={getRoleForBrigade(item.brigade_id) === "editor"}
                                        onChange={() => handleAccessChange(item, "editor")}
                                        type='checkbox'
                                        className="bg-primary px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-white"
                                    />
                                    <div className="text-primary">עורך</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        checked={getRoleForBrigade(item.brigade_id) === "user"}
                                        onChange={() => handleAccessChange(item, "user")}
                                        type='checkbox'
                                        className="bg-primary px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-white"
                                    />
                                    <div className="text-primary">צופה</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
        </div>
    );
};

export default EditUser;
