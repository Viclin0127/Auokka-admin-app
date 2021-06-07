import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import ConnectDb from "./components/utils/ConnectDb";

import Course from "./components/Courses";
import Edit from "./components/Edit";
import Navbar from "./components/Navbar";

class App extends React.Component {

  state = {courseList: []};

  // callback func to propogate from child component(courses.js)
  reviseCourseList = (data) => {
    this.setState({courseList: data})
    // DEBUG
    // console.log(this.state.courseList)
  }

  renderEdit(){
    const editLink = "/course/edit/";//TODO: can be improved, duplicate in courses.js
    const editList = this.state.courseList.map((data)=>{
      return (
        <Route exact path={editLink.concat(data.id.toString())} key={data.name}>
          <Edit id={data.id}/>
        </Route>
      )
    })
    return editList
  }

  render(){

    return (
      <div className="main">
        <BrowserRouter>
          <ConnectDb reviseCourseList={this.reviseCourseList}/>
          <Navbar />
          <Route exact path="/course">
            <Course courseList={this.state.courseList}/>
          </Route>
          {this.renderEdit()}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
