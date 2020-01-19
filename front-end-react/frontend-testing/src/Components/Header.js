import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu,
   DropdownItem, InputGroup, InputGroupAddon, InputGroupText, FormInput, Collapse
} from "shards-react";

class Header extends Component {
  state = {
    Home: false,
    Profile: false,
    ContactUs: false,
    PostNotice: false,
    Login: false,
    Signup: false,
    logged_in: false,
    page: " ",
    collapseOpen: false
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

  toggleNavbar = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    })
  }

  render() {
    const { logged_in, page } = this.state;
    const name = localStorage.getItem("name");
    const type = localStorage.getItem("type");

    const brand = <NavbarBrand href="/">Student Utility Portal</NavbarBrand>

    const login = ( 
      <NavItem>
        <NavLink active = {this.state.page === "Login"} href={`/login`}>Login</NavLink>
      </NavItem>
    )

    const signup = ( 
      <NavItem>
        <NavLink active = {this.state.page === "Signup"} href={`/signup`}>Sign Up</NavLink>
      </NavItem>
    )

    const contact_us = ( 
      <NavItem>
        <NavLink active = {this.state.page === "ContactUs"} href={`/contactus`}>Contact Us</NavLink>
      </NavItem>
    )

    const profile = ( 
      <NavItem>
        <NavLink active = {this.state.page === "Profile"} href={`/profile`}>{name}</NavLink>
      </NavItem>
    )

    const post_notice = ( 
      <NavItem>
        <NavLink active = {this.state.page === "PostNotice"}  href={`/postnotice`}>Post Notice</NavLink>
      </NavItem>
    )

    const signout = ( 
      <NavItem>
        <NavLink href={`/login`} onClick={this.handleSignout}>Sign Out</NavLink>
      </NavItem>
    )

    return (
        <Navbar type="dark" theme="primary" expand="md">
          { brand }
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar>
            {type === `Official Source` && post_notice}
          </Nav>
            
          <Nav navbar className="ml-auto">
            {logged_in === false && login}
            {logged_in === true && profile}
            {logged_in === false && signup}
            {logged_in === true && signout}
          </Nav>
          </Collapse>
        </Navbar>
    );
  }
}
export default Header;
