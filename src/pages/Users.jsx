import React, { useEffect, useState } from 'react'
import Topbar from '../components/topbar/Topbar'
import HeaderContent from '../utils/HeaderContent'
import useDataStore from '../hooks/useDataStore'
import icons from '../utils/icons/icons'
const Users = () => {
  const { usersList, setUsersList } = useDataStore()
  const [dataRender, setDataRender] = useState(usersList || []);

  // style
  const customStyleBgColors = 'text-secoundary dark:text-dark_secoundary bg-accent_bg dark:bg-dark_accent'
  const customStyleBgColorsText = 'text-secoundary dark:text-dark_accent'

  const handleSearch = (seachValue) => {
    const res = usersList?.filter((item) => item.userName.includes(seachValue));
    // console.log(res);
    setDataRender(res || [])
  }

  const handleDeleadUser = (user) => {
    const { userId, userName } = user;
    const res = window.confirm(`אתה בטוח רוצה למחוק את ${userName} מרשימת המשתמשים?`);
    if (res) {
      const filtered = usersList.filter((user, i) => user.userId !== userId)
      // console.log(filtered);
      setDataRender(filtered);
      setUsersList(filtered);
      console.log(`Deleting user with ID ${userId}`);
    }
  }

  // When adding a new user
  useEffect(() => {
    setDataRender(usersList)
  }, [usersList])


  return (
    <div className='bg-primary dark:bg-dark_primary flex-1 rounded-r-3xl p-5'>
      <Topbar title={'משתמשים'} toggelExcle={false} showTheme={true} />
      {/* header content */}
      <HeaderContent btnAdd={'הוסף משתמש'} numOfTitle={usersList.length} placeholderTitle={'חפש שם משתמש'} title={'משתמשים'} handleSearch={handleSearch} />
      {/* list of all users */}
      {/* <UserList /> */}
      <div className="">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className={customStyleBgColors}>שם מלא</th>
              <th className={customStyleBgColors}>דרגה</th>
              <th className={customStyleBgColors}>מ.א</th>
              <th className={customStyleBgColors}>הרשאות</th>
              <th className={customStyleBgColors}>תפקיד</th>
              <th className={`${customStyleBgColors} text-center`}>הגדרות</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {dataRender?.map((user, index) =>
              <tr key={index} className={customStyleBgColorsText}>
                {/* userName + user pic */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className=" w-12 h-12 rounded-full shadow">
                        <img src={user?.PicturURL} alt={user?.userName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.FirstName}</div>
                      <div className="text-sm opacity-50">{user?.LastName}</div>
                    </div>
                  </div>
                </td>
                {/* rank */}
                <td>
                  <div className="flex items-center gap-3">
                    {user?.Title}
                  </div>
                </td>
                {/* personal number */}
                <td>
                  <div className="flex items-center gap-3">
                    {user?.userId}
                  </div>
                </td>
                {/* permissions */}
                <td>
                  <div className="flex items-center gap-3 font-semibold">
                    {user?.access.toUpperCase()}
                  </div>
                </td>
                {/* role */}
                <td>
                  <div className={`flex items-center gap-3`}>
                    <div>
                      <div className="font-bold">
                        {user?.ProferredName?.split("/")[user?.ProferredName?.split("/").length - 1]}
                      </div>
                      <div className="text-sm opacity-50">
                        {user?.ProferredName?.split("-")[1]?.split("/")[0]}
                        {'/'}
                        {user?.ProferredName?.split("-")[1]?.split("/")[1]}
                        {user?.ProferredName?.split("-")[1]?.split("/")[2] !== user?.ProferredName?.split("/")[user?.ProferredName.split("/").length - 1] && (
                          '/' +
                          user?.ProferredName?.split("-")[1]?.split("/")[2]
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='text-center'>
                  <div className={`dropdown ${!index < 1 ? 'dropdown-left dropdown-end' : 'dropdown-left dropdown-start'}`}>
                    <button className={`btn btn-circle ${customStyleBgColors}`}>
                      {<icons.Gears />}
                    </button>
                    <ul tabIndex={0} className={`dropdown-content z-[1] menu shadow rounded-box w-60 ${customStyleBgColors}`}>
                      <li>
                        <a>
                          <div className='flex'>
                            <div className="flex items-center">
                              {<icons.Pen size={20} />}
                            </div>
                            <div className="mx-3">
                              <div className="font-bold">עריכה</div>
                              <div className="text-sm opacity-50">עריכת הרשאת משתמש</div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div className='flex' onClick={() => handleDeleadUser(user)}>
                            <div className="flex items-center">
                              {<icons.Trash size={20} />}
                            </div>
                            <div className="mx-3">
                              <div className="font-bold">מחיקה</div>
                              <div className="text-sm opacity-50">מחיקת משתמש  </div>
                            </div>
                          </div></a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            )}
            {!dataRender[0] && (
              <div className='m-1 font-bold '> אין משתמשים להצגה</div>
            )}
          </tbody>
        </table>
      </div>
    </div >
  )
}
export default Users