import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Users from '../pages/Users'
import Navbar from '../components/sidebar/Sidebar'
import Data from '../pages/Data'
import Help from '../pages/Help'
import Error404 from '../pages/Error404'
import useDataStore from '../hooks/useDataStore'
import Register from '../pages/Register'
import CreateBregade from '../pages/CreateBregade'
import DashBattalion from '../pages/DashBattalion'
import EditBregade from '../pages/EditBregade'

const AppRoutes = () => {
    const { user } = useDataStore();

    return (
        <BrowserRouter >
            {/* navbar */}
            <Navbar />
            <Routes>

                {/* routes protected */}
                {user &&
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/:id" element={<DashBattalion />} />
                        {user.access != "user" && <>
                            <Route path="/users" element={<Users />} />
                            <Route path="/data" element={<Data />} />
                            <Route path="/data/create/bregade" element={<CreateBregade />} />
                            <Route path="/data/update/bregade/" element={<EditBregade />} />
                        </>}

                    </>
                }
                {!user && <Route path="/" element={<Register />} />}

                {/* routes public */}
                <Route path="/help" element={<Help />} />
                <Route path="/*" element={<Error404 />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes