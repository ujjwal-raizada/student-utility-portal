import React, {Component, Fragment} from "react"
import {Link} from "react-router-dom"


class Header extends Component {
	
	state = {

			Home: "inactive", 
	  	Login: "inactive",
	  	Notice: "inactive",
	  	ContactUs: "inactive",
	}

	componentDidMount() {
		this.updateState()	
	}
	

	updateState = () => {
		const username = sessionStorage.getItem(username)
		const type = sessionStorage.getItem(type)
		const LoggedIn = username === null ? false : true
		this.setState({
			page:this.props.page,
			[this.state.page]: true,
			LoggedIn: LoggedIn,
			Type: type,
			Username: username
		})
	}

	render() {

		return(
			<Fragment>
				<div style = {{marginBottom: '60px'}} >
					<nav className="navbar navbar-inverse navbar-fixed-top ">

					    <div className="container-fluid">

							<div className= "navbar-header" >
								<Link className="navbar-brand" to="/">	Student Portal </Link>
							</div>

							<ul className = "nav navbar-nav">

								{/*<li className = {this.state.Home}>
									<Link to={`/`}> Home </Link> 
								</li>

								}<li className = {this.state.Notice}> 
									<Link to={`/notice`}> Notices </Link>
								</li>{*/}

								<li className = {this.state.Login} > 
									<Link to={`/Login`}> Login </Link>
								</li>

								<li className = {this.state.Signup}>
									<Link to={`/signup`}> Signup </Link>
								</li>

								{/*<li className = {this.state.AdminPage}>
									<Link to={`/admin`}> Admin Page </Link>
								</li>*/}

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
	 			</div>
 			</Fragment>
		)
	}
}
export default Header