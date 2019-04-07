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
    page: ``
  };

  componentDidMount() {
    const username = localStorage.getItem(`username`);
    const loggedin = username == `` ? false : true;
    this.setState({
      page: this.props.page,
      [this.state.page]: true,
      loggedin: loggedin
    });
  }

  handleSignout = () => {
    localStorage.setItem(`username`, ``);
    localStorage.setItem(`type`, ``);
    localStorage.setItem(`name`, ``);
  };

  render() {
    const { loggedin, page } = this.state;
    const username = localStorage.getItem(`username`);
    const name = localStorage.getItem(`name`);
    const type = localStorage.getItem(`type`);

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
      <Nav.Link href={`/Profile/${type}/${username}`}>{name}</Nav.Link>
    );

    const post_notice = (
      <Nav.Link href={`/postnotice/${username}`}>Post Notice</Nav.Link>
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
            {type === `Official Source` && post_notice}
          </Nav>
          <Nav className="ml-auto">
            {loggedin === false && login}
            {loggedin === true && profile}
            {loggedin === false && signup}
            {loggedin === true && signout}
          </Nav>
        </Navbar>
      </Fragment>
    );
  }
}
export default Header;
