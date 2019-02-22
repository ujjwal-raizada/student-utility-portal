import React, {Component, Fragment} from "react"
import {Link} from "react-router-dom"


class Header extends Component {
	
	state = {

		Home: "inactive", 
	  	Login: "inactive",
	  	Notice: "inactive",
	  	AdminPage: "inactive",
	  	ContactUs: "inactive",
	}

	componentDidMount() {
		this.setState({
			[this.props.page]: "active"
		})
	}

	render() {

		return(

			<nav className="navbar navbar-inverse" navbar-fixed-top>

			    <div className="container-fluid">

					<div className= "navbar-header">
					<Link className="navbar-brand" to="./">	Student Portal </Link>
					</div>

					<ul className = "nav navbar-nav">

						<li className = {this.state.Home}>
							<Link to={`/`}> Home </Link> 
						</li>

						<li className = {this.state.Notice}> 
							<Link to={`/notice`}> Notices </Link>
						</li>

						<li className = {this.state.Login} > 
							<Link to={`/`}> Login </Link>
						</li>

						<li className = {this.state.Signup}>
							<Link to={`/signup`}> Signup </Link>
						</li>

						<li className = {this.state.AdminPage}>
							<Link to={`/admin`}> Admin Page </Link>
						</li>

						<li className = {this.state.ContactUs}>
							<Link to={`/contactus`}> Contact Us </Link>
						</li>

					</ul>

					<form className="navbar-form navbar-right" action="/action_page.php">

						<div  className="input-group pull-right">

							<input 
								type="text" 
							   	className="form-control" 
						  	 	placeholder="Search" 
							   	name="search" 
						   		/>

							    <div className="input-group-btn">

							     	<button 
							     		className="btn btn-default" 
							     		type="submit"
						     			>
							        	<i className="glyphicon glyphicon-search"></i>
							        </button>

							    </div>

						</div>

					</form>
					
			    </div>

 			</nav>
		)
	}
}
export default Header