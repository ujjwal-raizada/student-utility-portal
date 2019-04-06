import React, { Component } from "react";
import axios from "axios";
import config from "react-global-configuration";

class StudentsList extends Component {
  state = {
    students: []
  };

  componentDidMount() {
    axios
      .get(config.get("host_url") + config.get("routes.students"))
      .then(res => {
        console.log(res);
        this.setState({
          students: res.data
        });
      });
  }

  render() {
    const students_list = this.state.students.map((item, index) => (
      <h6 key={index}>
        {index + 1}
        {" . "}
        {item.username}
      </h6>
    ));

    return (
      <div>
        <h2>Students Registered</h2>
        <br />
        {students_list}
      </div>
    );
  }
}

export default StudentsList;
