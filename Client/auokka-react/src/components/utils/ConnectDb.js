import React from "react";
import axios from "axios";

const API = axios.create({baseURL:"https://localhost:5001/api/courses/0/10"});

class ConnectDb extends React.Component{
    constructor(props){
        super(props);
        this.state = {courses: []};
    }

    componentDidMount(){
        this.getCourseList();
    }

    getCourseList = async ()=>{
        const res = await API.get();
        // DEBUG
        // console.log(res.data.courses)
        this.setState({courses: res.data.courses});

        // when finishing get request and retrieve data, update to parent (App.js)

        this.props.reviseCourseList(this.state.courses)
        // DEBUG
        // console.log(idList)
    }

    render(){
        return(
            <div></div>
        )
    }

}

export default ConnectDb;