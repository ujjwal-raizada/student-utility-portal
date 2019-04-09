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
    logged_in: false,
    page: " "
  };

  componentDidMount() {
    const username = localStorage.getItem("username");
    if (username == null) {
      var logged_in = false;
    } else {
      var logged_in = true;
    }
    this.setState({
      page: this.props.page,
      [this.state.page]: true,
      logged_in: logged_in
    });
  }

  handleSignout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("type");
    localStorage.removeItem("name");
  };

  render() {
    const { logged_in, page } = this.state;
    const name = localStorage.getItem("name");
    const type = localStorage.getItem("type");

    const brand = <Navbar.Brand href="/">Student Utility Portal</Navbar.Brand>;

    const login = <Nav.Link href={`/login`}>Login</Nav.Link>;

    const signup = <Nav.Link href={`/signup`}>Sign Up</Nav.Link>;

    const contact_us = <Nav.Link href={`/contactus`}>Contact Us</Nav.Link>;

    const profile = <Nav.Link href={`/profile`}>{name}</Nav.Link>;

    const post_notice = <Nav.Link href={`/postnotice`}>Post Notice</Nav.Link>;

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
          {brand}
          <Nav className="mr-auto">
            {type === `Official Source` && post_notice}
          </Nav>
          <Nav className="ml-auto">
            {logged_in === false && login}
            {logged_in === true && profile}
            {logged_in === false && signup}
            {logged_in === true && signout}
          </Nav>
        </Navbar>
      </Fragment>
    );
  }
}
export default Header;
