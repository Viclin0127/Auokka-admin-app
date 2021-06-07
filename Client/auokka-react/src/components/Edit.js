import React, {useState, useEffect} from "react";
import axios from "axios";
import RichEditor from "./utils/RichEditor";
import RichEditorSecond from "./utils/RichEditorSecond";
import { SchedulePopup } from "./utils/SchedulePopup";

const IMG_SOURCE_URL = "http://resource.auokka.com.au/api/files/image/course/";

const Edit = (props) =>{
    const URL = ("https://localhost:5001/api/courses/").concat(props.id.toString());

    const [courseData, setCourseData] = useState();
    const [selectedInfo, setSelectedInfo] = useState("basic");
    const [richTextData, setRichTextData] = useState();
    const [richTextDataSecond, setRichTextDataSecond] = useState();
    const [showSchedule, setShowSchedule] = useState(false);
    const [isNewSchedule, setIsNewSchedule] = useState(false);

    useEffect(()=>{
        const getCourseData = async () =>{
            const res = await axios.get(URL);
            // DEBUG
            // console.log(res.data)
            setCourseData(res.data)
        }
        getCourseData();
    },[]);

    // schedule popup window
    const openSchedule = ()=>{
        setShowSchedule(!showSchedule)
    }
    // New schedule popup window
    const openNewSchedule = ()=>{
        setShowSchedule(!showSchedule)
        setIsNewSchedule(!isNewSchedule)
    }

    // select info
    const onClickedBasic = ()=>{
        setSelectedInfo("basic")
    }
    const onClickedDetails = () => {
        setSelectedInfo("details")
    }
    const onClickedSchedule = () => {
        setSelectedInfo("schedule")
    }

    // extract data from Editor 1
    const extractData = (data) => {
        setRichTextData(data)
        // DEBUG
        // console.log(richTextData)
    }

    // extract data from Editor 2
    const extractDataSecond = (data) => {
        setRichTextDataSecond(data)
        // DEBUG
        // console.log(richTextDataSecond)
    }

    // render basic information
    const renderBasic = () => {
        return (
            <div className={selectedInfo==="basic"?"basic-body":"basic-body hidden"}>
                <div className="basic-body__course">
                    <div className="basic-body__title">
                        Course Title
                        <span className="red-star">*</span>
                    </div>
                    <input id="courseTitle" className="basic-body__input" defaultValue={courseData.name}>
                    </input>
                </div>
                <div className="basic-body__level">
                    <div className="basic-body__title">
                        Level
                        <span className="red-star">*</span>
                    </div>
                    <select id="courseLevel" className="basic-body__select" defaultValue={courseData.level}>
                        <option>Entry</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>
                <div className="basic-body__desc">
                    <div className="basic-body__title">
                        Short Description
                        <span className="red-star">*</span>
                    </div>
                    <div className="rich_editor">
                        <RichEditor extractData={extractData} courseData={courseData}/>
                    </div>
                </div>
                <div className="basic-body__imgarea">
                    <div className="basic-body__title">
                        Image
                    </div>
                    <div className="basic-body__img">
                        <img src={IMG_SOURCE_URL.concat(courseData.image)} alt={courseData.name}/>
                    </div>
                    <div className="basic-body__upload">
                        <button className="btn_red">Upload</button>
                    </div>
                </div>
            </div>
        )
    }

    // render details information
    const renderDetails = () => {
        return (
            <div className={selectedInfo==="details"?"details-body":"details-body hidden"}>
                <div className="details-body__header">
                    <div className="details-body__header--content">
                        Content
                        <span className="red-star">*</span>
                    </div>
                </div>
                <div className="details-body__content">
                    <div className="rich_editor_second">
                        <RichEditorSecond extractDataSecond={extractDataSecond} courseData={courseData}/>
                    </div>
                </div>
            </div>
        )
    }

    // render schedule information
    const renderSchedule = () => {
        return (
            <div className={selectedInfo==="schedule"?"schedule-body":"schedule-body hidden"}>
                <table className="schedule-body__table">
                    <thead className="schedule-body__head">
                        <tr>
                            <th>No.</th>
                            <th>Begin</th>
                            <th>End</th>
                            <th>Location</th>
                            <th>Fee</th>
                            <th>Active</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="schedule-body__body">
                        <tr>
                            <td>1</td>
                            <td>{courseData.schedule[0].from.slice(0,10)}</td>
                            <td>{courseData.schedule[0].to.slice(0,10)}</td>
                            <td>{courseData.schedule[0].location}</td>
                            <td>${courseData.schedule[0].defaultPrice.amount}</td>
                            {(courseData.schedule[0].active===1)?<td><input type="checkbox" defaultChecked></input></td>:<td><input type="checkbox"></input></td>}
                            <td><span onClick={openSchedule}>Details</span></td>
                        </tr>
                    </tbody>
                </table>
                <div className="schedule-body__add">
                    <button className="btn_red" onClick={openNewSchedule}>Add Schedule</button>
                </div>
            </div>
        )
    }

    const renderPage = () => {
        return (
            <div className="main__edit">
                <div className="edit-header">
                    <div className="edit-header__content">
                        Edit Course
                    </div>
                </div>

                <div className="edit-container">
                    <div className="edit-container__header">
                        <div onClick={onClickedBasic} className={selectedInfo==="basic"?"edit-container__header--item-active":"edit-container__header--item"}>
                            Basic Information
                        </div>
                        <div onClick={onClickedDetails} className={selectedInfo==="details"?"edit-container__header--item-active":"edit-container__header--item"}>
                            Details Information
                        </div>
                        <div onClick={onClickedSchedule} className={selectedInfo==="schedule"?"edit-container__header--item-active":"edit-container__header--item"}>
                            Schedule Information
                        </div>
                    </div>

                    {renderBasic()}
                    {renderDetails()}
                    {renderSchedule()}

                    <div className="operate-button">
                        <div className="operate-button__cancel">
                            <button className="btn_red">Cancel</button>
                        </div>
                        <div className="operate-button__submit">
                            <button className="btn_blue" onClick={clickSubmit}>Submit</button>
                        </div>
                    </div>
                    <SchedulePopup courseData={courseData} showSchedule={showSchedule} setShowSchedule={setShowSchedule} isNewSchedule={isNewSchedule} setIsNewSchedule={setIsNewSchedule}/>
                </div>
            </div>
        )
    }

    // submit edit data
    const clickSubmit = ()=>{
        // for (var i = 0; i < document.getElementsByTagName("td").length; i++) {
        //     if (document.getElementsByTagName("td").item(i).innerHTML.includes("checked")){
        //         console.log(document.getElementsByTagName("td").item(i).innerHTML)
        //     }
            
        // }
        // deep copy the courseData
        const deepCopyCourseData = JSON.parse(JSON.stringify(courseData))
        
        // extracts contents from user
        deepCopyCourseData.name = document.getElementById("courseTitle").value
        deepCopyCourseData.level = document.getElementById("courseLevel").value
        deepCopyCourseData.description = richTextData;
        deepCopyCourseData.detail = richTextDataSecond;
        // DEBUG
        // console.log(courseData)
        // console.log(deepCopyCourseData)

        const updateCourseData = async () =>{
            // const res = await axios.put(URL, deepCopyCourseData);
            // console.log("UPDATED!")
            console.log("Need to uncomment the submit function")
            // DEBUG
            // console.log(deepCopyCourseData)
        }
        updateCourseData();
    }

    return (
        <>
            { (courseData) ? renderPage() : null }
        </>
    )
}

export default Edit;