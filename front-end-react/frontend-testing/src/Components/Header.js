import React, {Component, Fragment} from "react"
import {Link} from "react-router-dom"


class Header extends Component {
	
	state = {

			Home: false, 
	  	Profile: false,
	  	Notice: false,
	  	ContactUs: false,
	  	LoggedIn: false,
	  	Type: "normal",
	  	Username: "",
	  	page: ``
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
		const {username,type,LoggedIn} = this.state
		const brand = (
			<div className= "navbar-header" >
				<Link className="navbar-brand" to="/">	Student Portal </Link>
			</div>
		)

		const login = (
			<li className = {this.state.Login} > 
				<Link to={`/Login`}> Login </Link>
			</li>
		)

		const signup = (
			<li className = {this.state.Signup}>
				<Link to={`/signup`}> Signup </Link>
			</li>
		)

		const contact_us = (
			<li className = {this.state.ContactUs}>
				<Link to={`/contactus`}> Contact Us </Link>
			</li>
		)

		const profile = (
			<li className = {this.state.Profile}>
				<Link to={`/Profile/${sessionStorage.getItem(type)}/${sessionStorage.getItem(username)}`}> Profile </Link>
			</li>
		)

		const post_notice = (
			<li className = {this.state.Notice}>
				<Link to={`/postnotice`}> Post Notice</Link>
			</li>
		)
		return(
			<Fragment>
				<div style = {{marginBottom: '60px'}} >
					<nav className="navbar navbar-inverse navbar-fixed-top ">

					    <div className="container-fluid">
					    	{brand}
							

							<ul className = "nav navbar-nav">

								{this.state.LoggedIn === false  && login}					
								{this.state.LoggedIn === true && profile}
								{signup}
								{contact_us}
								{this.state.type === `official` && post_notice}
								

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