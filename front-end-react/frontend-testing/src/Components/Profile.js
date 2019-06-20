import React, { Component, Fragment } from "react";
import Header from "./Header";
import StudentProfile from "./StudentProfile";
import OfficialProfile from "./OfficialProfile";
import AdminProfile from "./AdminProfile";

class Profile extends Component {
  componentDidMount() {
    const username = localStorage.getItem("username");
    if (username == null) {
      this.props.history.push(`/login`);
    }
  }

  render() {
    var type, profile;
    type = localStorage.getItem(`type`);
    if (type == "Student") {
      profile = <StudentProfile />;
    } else if (type == "Official Source") {
      profile = <OfficialProfile />;
    } else if (type == "Admin") {
      profile = <AdminProfile />;
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
