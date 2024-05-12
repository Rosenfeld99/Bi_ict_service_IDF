import React, { useEffect, useState } from 'react'
import "./toast.css"
import { FaCircleExclamation } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
export default function Toast({ time, title, message, type, show, setShow }) {
    const [timer, setTimer] = useState(time)
    const status = {
        Information: {
            bg: "rgb(229, 241, 255)",
            bgBar: "rgb(128, 178, 255)",
            color: "blue",
            icon: <FaCircleExclamation size={40} color="blue" />,
        },
        Error: {
            bg: "rgb(253, 233, 231)",
            bgBar: "rgb(247, 168, 161)",
            color: "red",
            icon: <IoCloseCircle size={40} color="red" />,
        },
        Alert: {
            bg: "rgba(255, 247, 229)",
            bgBar: "rgb(255, 240, 204)",
            color: "orange",
            icon: <FaCircleExclamation size={40} color="orange" />,
        },
        Success: {
            bg: "rgba(233, 251, 233)",
            bgBar: "rgb(168, 240, 168)",
            color: "green",
            icon: <IoMdCheckmarkCircle size={40} color="green" />,
        },
        Neutral: {
            bg: "rgba(242, 242, 243)",
            bgBar: "rgb(201, 201, 207)",
            color: "gray",
            icon: <FaCircleExclamation size={40} color="gray" />,
        },
    }
    useEffect(() => {
        if (timer > 0) {
            if (timer == time) {
                setTimer(timer - 1);
            } else {
                setTimeout(() => {
                    setTimer(timer - 1);
                }, 1000);
            }
        } else {
            setTimeout(() => {
                if (document.getElementById("containerToast"))
                    document.getElementById("containerToast").classList = "box_toast row m-0 p-0 slideOutRight";
            }, 1000);
        }
    }, [timer])
    useEffect(() => {
        if (time > 0) {
            setTimeout(() => {
                setShow(false);
            }, (time + 1) * 1000);
        }
    }, [])
    return (
        <>
            {show &&
                <div id='containerToast' dir='rtl' className="box_toast m-0 p-0 slideInRight" style={{ backgroundColor: status[type].bg, }}>
                    <div style={{ display: "flex" }}>
                        <div className="divFlex" style={{ width: "18%" }}>
                            {status[type].icon}
                        </div>
                        <div style={{ width: "80%", display: "flex" }}>
                            <div className="divFlex">
                                <div className="boxDivider" style={{ backgroundColor: status[type].bgBar, }}>
                                    <div className="divider"></div>
                                </div>
                            </div>
                            <div style={{ color: status[type].color, width: "100%", }}>
                                <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 5px 0 10px" }}>
                                    <h5 style={{ fontWeight: "bold" }}>
                                        {title}
                                    </h5>
                                    <div style={{ cursor: "pointer" }} onClick={() => setShow(false)}>
                                        <FaXmark />
                                    </div>
                                </div>
                                <div className='border message' style={{ padding: "0 5px 5px 0" }}>
                                    {message}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: status[type].bgBar, borderRadius: "0px 0px 7px 7px ", width: "100%" }}>
                        <div style={{
                            backgroundColor: status[type].color,
                            borderRadius: "0px 0px 7px 7px ",
                            width: `${(timer / time) * 100}%`,
                            transition: "width 1s linear",
                            color: "transparent",
                            fontSize: "8px",
                        }}>Moshe</div>
                    </div>
                </div>
            }
        </>
    )
}