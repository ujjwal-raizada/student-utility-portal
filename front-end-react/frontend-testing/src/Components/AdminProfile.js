import React, { Component } from "react";
import axios from "axios";
import config from "react-global-configuration";
import StudentsList from "./StudentsList";
import SourcesList from "./SourcesList";
import CreateTag from "./CreateTag";
import DeleteTags from "./DeleteTags";
import { Tabs, Tab } from "react-bootstrap";
import AdminStats from "./AdminStats";

class AdminProfile extends Component {
  state = {
    key: "Students List"
  };

  componentDidMount() {
    const type = localStorage.getItem("type");
    if (type != "Admin") {
      this.props.history.push("/error");
    }
  }
  render() {
    return (
      <div>
        <Tabs
          activeKey={this.state.key}
          onSelect={key => {
            this.setState({ key: key });
          }}
        >
          <Tab title="Students List" eventKey="Students List">
            <StudentsList />
          </Tab>

          <Tab title="Sources List" eventKey="Sources List">
            <SourcesList />
          </Tab>

          <Tab title="Create Tag" eventKey="Create Tag">
            <CreateTag />
          </Tab>

          <Tab title="Delete Tags" eventKey="Delete Tags">
            <DeleteTags />
          </Tab>
          <Tab title="Stats" eventKey="Stats">
            <AdminStats />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default AdminProfile;
