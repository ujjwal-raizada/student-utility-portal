import React, { Component } from "react";
import axios from "axios";
import config from "react-global-configuration";
import ReactTable from "react-table";
import "react-table/react-table.css";

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
          students: res.data.student_list
        });
      });
  }

  render() {
    const students_list = this.state.students.map((item, index) => {
      console.log(item);
      return {
        index: index,
        username: item.username
      };
    });
    const columns = [
      {
        Header: "Index",
        accessor: "index"
      },
      {
        Header: "Username",
        accessor: "username"
      }
    ];

    return (
      <div>
        <h2>Students Registered</h2>
        <br />

        <ReactTable
          data={students_list}
          columns={columns}
          defaultPageSize={10}
          resized={[
            {
              id: "index",
              value: 70
            }
          ]}
        />
      </div>
    );
  }
}

export default StudentsList;
