import React from 'react'
import Topbar from '../components/topbar/Topbar'
import icons from '../utils/icons/icons'
import registerImg from '../../public/imageRegister.png'
import useDataStore from '../hooks/useDataStore'


const Register = () => {
    const { user } = useDataStore()

    const set = async (num) => {
        try {
            const res = await fetch(
                "http://localhost/users.txt",
                {
                    method: "PUT",
                    headers: {
                        accept: 'application/json; odata=verbose',
                        'Content-Type': 'application/json; odata=verbose',
                    },
                    body: JSON.stringify(num),
                }
            ).then((response) => { console.log(response); })
        } catch (error) {
            console.log('Error registering: ', error);
            return { status: "failed", error }
        }
    }

    const get = async () => {
        try {
            const res = await fetch(
                "http://localhost/users.txt",
                {
                    method: "GET",
                    headers: {
                        accept: 'application/json; odata=verbose',
                        'Content-Type': 'application/json; odata=verbose',
                    },
                }
            ).then((response) => response.text()).then((text) => { console.log(text); })
        } catch (error) {
            console.log('Error registering: ', error);
            return { status: "failed", error }
        }
    }

    return (
        <div className='bg-primary dark:bg-dark_primary flex-1 rounded-r-3xl p-5'>
            <Topbar title={'דף הרשמה'} toggelExcle={true} showTheme={true} />
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
                                    {/* <div className="grow">
                                        {user?.FirstName}
                                    </div> */}
                                    <input type="text" className="grow " placeholder="שם פרטי" value={user?.FirstName} />
                                </label>
                                <label className="input rounded-3xl flex items-center gap-2 my-4  ">
                                    {<icons.Card />}
                                    <input type="text" className="grow " placeholder="שם משפחה" value={user?.LastName} />
                                </label>
                            </div>
                        </div>

                        <div className="flex border justify-around">
                            <label className="input rounded-3xl flex items-center gap-2 my-2 ml-2">
                                {<icons.Rank size={20} />}
                                <input type="text" className="grow " placeholder="דרגה" value={user?.Title} />
                            </label>
                            <label className="input rounded-3xl flex items-center gap-2 my-2">
                                {<icons.Numbers size={20} />}
                                <input type="text" className="grow " placeholder="מספר אישי" value={user?.userId} />
                            </label>
                        </div>
                        <div className="">
                            <label className="input rounded-3xl flex items-center gap-2 my-4">
                                {<icons.Building />}
                                <input type="text" className="grow " placeholder="שם בסיס" value={user?.ProferredName.split("/")[user?.ProferredName.split("/").length - 3]} />
                            </label>
                        </div>
                        <div className="">
                            <label className="input rounded-3xl flex items-center gap-2 my-4">
                                {<icons.Role />}
                                <input type="text" className="grow " placeholder="תפקיד" value={user?.ProferredName.split("/")[user?.ProferredName.split("/").length - 1]} />
                            </label>
                        </div>

                        <a href='' className="flex my-4">
                            <button className="btn btn-outline bg-accent grow rounded-3xl">
                                שלח
                            </button>
                        </a>


                    </div>
                </div>
                <div className="border flex-1 flex justify-center items-center">
                    <img src={registerImg} alt="register" />
                </div>
            </div>
        </div>)
}

export default Register
