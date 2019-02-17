import React, {Component, Fragment} from "react"


class Header extends Component {
	
	state = {
		Home: "inactive", 
	  	Login: "active",
	}

	render() {
		return(
			<nav className="navbar navbar-inverse" navbar-fixed-top>
			    <div className="container-fluid">
					<div className= "navbar-header">
					<a className="navbar-brand" href="./">Student Portal</a>
					</div>
					<ul className = "nav navbar-nav">
						<li className = {this.state.Home}> <a href="./">Home</a> </li>
						<li ><a href="./notice">Notices</a></li>
						<li className = {this.state.Login} ><a href="./">Login</a></li>
						<li><a href="./signup">Signup</a></li>
						<li><a href="./contactus">Contact Us</a></li>
					</ul>
					<form className="navbar-form navbar-right" action="/action_page.php">
						<div  className="input-group pull-right">
							<input type="text" className="form-control" placeholder="Search" name="search" />
							    <div className="input-group-btn">
							     	<button className="btn btn-default" type="submit">
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