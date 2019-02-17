import React from 'react';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {Home: "inactive", 
					  Login: "active",
					};
	}
	render() {
		return(
			<nav class="navbar navbar-inverse" navbar-fixed-top>
			    <div class="container-fluid">
					<div class= "navbar-header">
					<a class="navbar-brand" href="./">Student Portal</a>
					</div>
					<ul class = "nav navbar-nav">
						<li class = {this.state.Home}> <a href="./">Home</a> </li>
						<li ><a href="./Notice">Notices</a></li>
						<li class = {this.state.Login} ><a href="./">Login</a></li>
						<li><a href="./Signup">SignUp</a></li>
						<li><a href="#">Page 3</a></li>
						<li><a href="#">Contact Us</a></li>
					</ul>
					<form class="navbar-form navbar-right" action="/action_page.php">
						<div  class="input-group pull-right">
							<input type="text" class="form-control" placeholder="Search" name="search" />
							    <div class="input-group-btn">
							     	<button class="btn btn-default" type="submit">
							        	<i class="glyphicon glyphicon-search"></i>
							        </button>
							    </div>
						</div>
					</form>
			    </div>
 			</nav>
		)
	}
}
export default Header;