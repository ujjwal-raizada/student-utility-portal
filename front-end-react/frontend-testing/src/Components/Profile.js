import React, { Component, Fragment } from "react";
import Header from "./Header";
import StudentProfile from "./StudentProfile";
import OfficialProfile from "./OfficialProfile";
import AdminProfile from "./AdminProfile";

class Profile extends Component {
  state = {};

  componentDidMount() {
    const username = localStorage.getItem(`username`);
    if (username == ``) {
      this.props.history.push(`/login`);
    }
  }

  render() {
    var type = localStorage.getItem(`type`);
    if (type == "Student") {
      var profile = <StudentProfile />;
    } else if (type == "Official Source") {
      var profile = <OfficialProfile />;
    } else if (type == "Admin") {
      var profile = <AdminProfile />;
    }
    return (
      <Fragment>
        <Header page="Profile" />
        {profile}
      </Fragment>
    );
  }
}
export default Profile;
