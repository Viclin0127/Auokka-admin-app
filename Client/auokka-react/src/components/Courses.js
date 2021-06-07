import React from "react";
import { Link } from "react-router-dom";

const IMG_SOURCE_URL = "http://resource.auokka.com.au/api/files/image/course/";
const EDIT_LINK = "course/edit/";

class Course extends React.Component {

    renderCourseList(){
        const courseList = this.props.courseList.map((c,index)=>{
            const src = IMG_SOURCE_URL.concat(c.image);
            const editLink = EDIT_LINK.concat(c.id.toString())
            return (
                <tr key={index+1}>
                    <td>{index+1}</td>
                    <td><img src={src} alt={c.name}/></td>
                    <td>{c.name}</td>
                    <td>{c.level}</td>
                    {c.active === 1 ? <td><input type="checkbox" defaultChecked/></td> : <td><input type="checkbox"/></td>}
                    <td>{c.createTime.slice(0,10)}</td>
                    <td><Link to={editLink}><span>Details</span></Link></td>
                </tr>
            )
        })
        return courseList
    }

    render(){
        return (
            <div className="main__course">
                <div className="course-header">
                    <div className="course-header__content">
                        Course
                    </div>
                    <div className="course-header__button">
                        <button className="btn_blue">Create New Course</button>
                    </div>
                </div>
    
                <div className="course-container">
                    <table className="course-container__table">
                        <thead className="course-container__head">
                            <tr>
                                <th>No.</th>
                                <th>Img</th>
                                <th>Title</th>
                                <th>Level</th>
                                <th>Active</th>
                                <th>Create</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="course-container__body">
                            {this.renderCourseList()}
                        </tbody>
                    </table>
                </div>
    
                <div className="course-footer">
                    <span className="course-footer__content">END OF THE LIST</span>
                </div>
            </div>
        );
    }
}

export default Course;

