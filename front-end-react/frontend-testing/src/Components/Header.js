import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

class Header extends Component {
  state = {
    Home: false,
    Profile: false,
    ContactUs: false,
    PostNotice: false,
    Login: false,
    Signup: false,
    loggedin: false,
    type: ``,
    username: ``,
    page: ``
  };

  componentDidMount() {
    this.updateState();
  }

  updateState = () => {
    const username = localStorage.getItem(`username`);
    const type = localStorage.getItem(`type`);
    const loggedin = username === `` ? false : true;
    console.log(`Hey Man`);
    console.log(loggedin);
    this.setState({
      page: this.props.page,
      [this.state.page]: true,
      loggedin: loggedin,
      type: type,
      username: username
    });
  };

  handleSignout = () => {
    localStorage.setItem(`username`, ``);
    localStorage.setItem(`type`, ``);
  };

  render() {
    const { username, type, loggedin } = this.state;
    const brand = (
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">
          {" "}
          Student Portal{" "}
        </Link>
      </div>
    );

    const login = <Nav.Link href={`/Login`}>Login</Nav.Link>;

    const signup = <Nav.Link href={`/signup`}>Sign Up</Nav.Link>;

    const contact_us = <Nav.Link href={`/contactus`}>Contact Us</Nav.Link>;

    const profile = (
      <Nav.Link
        href={`/Profile/${localStorage.getItem(`type`)}/${localStorage.getItem(
          `username`
        )}`}
      >
        {this.state.username}
      </Nav.Link>
    );

    const post_notice = (
      <Nav.Link href={`/postnotice/${this.state.username}`}>
        Post Notice
      </Nav.Link>
    );

    const signout = (
      <Nav.Link href={`/login`} onClick={this.handleSignout}>
        Sign Out
      </Nav.Link>
    );

    const search = (
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-light">Search</Button>
      </Form>
    );

    return (
      <Fragment>
        <Navbar sticky="top" bg="info" variant="dark">
          <Navbar.Brand href="/">Stud Util Port</Navbar.Brand>
          <Nav className="mr-auto">
            {this.state.type === `OfficialSource` && post_notice}
          </Nav>
          {this.state.page === "Profile" && search}
          <Nav className="ml-auto">
            {this.state.loggedin === false && login}
            {this.state.loggedin === true && profile}
            {this.state.loggedin === false && signup}
            {this.state.loggedin === true && signout}
          </Nav>
        </Navbar>
      </Fragment>
    );
  }
}
export default Header;
