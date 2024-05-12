import React, { useEffect, useState } from 'react'
import Topbar from '../components/topbar/Topbar'
import CardListBattalion from '../components/dashBattalion/CardListBattalion'
import { useParams } from 'react-router-dom';
import useDataStore from '../hooks/useDataStore';
const DashBattalion = () => {
    let { id } = useParams();
    const { data } = useDataStore();
    const [item, setItem] = useState([]);
    useEffect(() => {
        const findItem = data.find((f) => f.brigade_id === id);
        setItem(findItem);
    }, [data, id]);
    return (
        <div className='bg-primary dark:bg-dark_primary dark:shadow-xl dark:shadow-[#fcfcfca8] flex-1 rounded-r-3xl p-5'>
            <Topbar title={'דשבורד'} toggelExcle={true} showTheme={true} />
            <div className=" text-xl text-secoundary font-semibold pt-16">כשירות פיקודית -  {item?.brigadeName}</div>
            {/* Progress Pei */}
            <div className=" flex bg-[#FCF7FD] p-4 rounded-lg gap-3 my-4 ">
                <CardListBattalion item={item} />
            </div>
        </div>)
}
export default DashBattalion