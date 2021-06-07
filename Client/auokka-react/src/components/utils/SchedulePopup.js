import React,{useRef, useState, useEffect} from "react";
import DatePicker from 'react-date-picker';
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export const SchedulePopup = ({courseData, showSchedule, setShowSchedule, isNewSchedule, setIsNewSchedule}) =>{

    const [beginDate, setBeginDate] = useState(new Date(courseData.schedule[0].from.slice(0,10)));
    const [endDate, setEndDate] = useState(new Date(courseData.schedule[0].to.slice(0,10)));

    const popupRef = useRef();
    const closePopup = (e)=>{
        if(popupRef.current === e.target){
            setShowSchedule(false)
            // close the new schedule window
            if (isNewSchedule){
                setIsNewSchedule(false)
            }
        }
    }

    // render page with courseData
    const renderSchedule = () =>{
        return (
            <div className="popup" onClick={closePopup} ref={popupRef}>
                <div className="popup-container">
                    <div className="popup-header">
                        <span>Edit Schedule</span>
                        <span style={{cursor:"pointer"}} onClick={()=>{setShowSchedule(!showSchedule);}}><i className="far fa-times-circle"></i></span>
                    </div>
                    <div className="popup-body">
                        <div className="popup-body__item">
                            <div className="popup-body__title">
                                Begin
                                <span className="red-star">*</span>
                            </div>
                            <DatePicker 
                                locale="en-US"
                                value={beginDate}
                                onChange={setBeginDate}
                                format="y-MM-dd"
                            />
                        </div>
                        <div className="popup-body__item">
                            <div className="popup-body__title">
                                End
                                <span className="red-star">*</span>
                            </div>
                            <DatePicker 
                                locale="en-US"
                                value={endDate}
                                onChange={setEndDate}
                                format="y-MM-dd"
                            />
                        </div>
                        <div className="popup-body__item">
                            <div className="popup-body__title">
                                Location
                                <span className="red-star">*</span>
                            </div>
                            <select className="popup-body__select" defaultValue={courseData.schedule[0].location}>
                                <option>Sydney</option>
                                <option>Melbourne</option>
                                <option>Brisbane</option>
                                <option>Perth</option>
                                <option>Adelaide</option>
                            </select>
                        </div>
                        <div className="popup-body__item">
                            <div className="popup-body__title">
                                Fee
                                <span className="red-star">*</span>
                            </div>
                            <input className="popup-body__input" type="number" defaultValue={courseData.schedule[0].defaultPrice.amount}></input>
                        </div>
                        <div className="popup-body__item popup-body__active">
                            <div className="popup-body__title">
                                Active
                            </div>
                            {(courseData.schedule[0].active===1)?<input type="checkbox" defaultChecked></input>:<input type="checkbox"></input>}
                        </div>
                        <div className="popup-body__submit">
                            <button className="btn_blue">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // render empty page
    const renderNewSchedule = () =>{
        return (
            <div className="popup" onClick={closePopup} ref={popupRef}>
                <div className="popup-container">
                    <div className="popup-header">
                        <span>Edit Schedule</span>
                        <span style={{cursor:"pointer"}} onClick={()=>{
                            setShowSchedule(!showSchedule);
                            setIsNewSchedule(!isNewSchedule);
                            }}><i className="far fa-times-circle"></i></span>
                    </div>
                    <div className="popup-body">
                        <div className="popup-body__item">
                            <div className="popup-body__title">
                                Begin
                                <span className="red-star">*</span>
                            </div>
                            <input className="popup-body__input" type="text"></input>
                        </div>
                        <div className="popup-body__item">
                            <div className="popup-body__title">
                                End
                                <span className="red-star">*</span>
                            </div>
                            <input className="popup-body__input" type="text"></input>
                        </div>
                        <div className="popup-body__item">
                            <div className="popup-body__title">
                                Location
                                <span className="red-star">*</span>
                            </div>
                            <select className="popup-body__select">
                                <option>Sydney</option>
                                <option>Melbourne</option>
                                <option>Brisbane</option>
                                <option>Perth</option>
                                <option>Adelaide</option>
                            </select>
                        </div>
                        <div className="popup-body__item">
                            <div className="popup-body__title">
                                Fee
                                <span className="red-star">*</span>
                            </div>
                            <input className="popup-body__input" type="number"></input>
                        </div>
                        <div className="popup-body__item popup-body__active">
                            <div className="popup-body__title">
                                Active
                            </div>
                            <input type="checkbox"></input>
                        </div>
                        <div className="popup-body__submit">
                            <button className="btn_blue">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {showSchedule ? ((isNewSchedule)?renderNewSchedule():renderSchedule()) : null}
        </>
    )
}