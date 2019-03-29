import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'

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
	}

	componentDidMount() {
		this.updateState()
	}
	

	updateState = () => {
		const username = localStorage .getItem(`username`)
		const type = localStorage .getItem(`type`)
		const loggedin = username === `` ? false : true
		this.setState({
			page:this.props.page,
			[this.state.page]: true,
			loggedin: loggedin,
			type: type,
			username: username
		})
	}

	handleSignout = () => {

		localStorage.setItem(`username`,``)
		localStorage.setItem(`type`,``)
	}

	render() {
		const {username,type,loggedin} = this.state
		const brand = (
			<div className= 'navbar-header' >
				<Link className='navbar-brand' to='/'>	Student Portal </Link>
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
				<Link to={`/Profile/${localStorage.getItem(`type`)}/${localStorage .getItem(`username`)}`}> Profile </Link>
			</li>
		)

		const post_notice = (
			<li className = {this.state.PostNotice}>
				<Link to={`/postnotice/${this.state.username}`}> Post Notice</Link>
			</li>
		)

		const signout = (
			<li >
				<Link to={`/login`} onClick = {this.handleSignout} > Signout </Link>
			</li>
		)

		const search_bar = (
			<form className='navbar-form navbar-right' action='/action_page.php'>

								<div  className='input-group pull-right'>

									<input 
										type='text' 
									   	className='form-control' 
								  	 	placeholder='Search' 
									   	name='search' 
								   		/>

									    <div className='input-group-btn'>

									     	<button 
									     		className='btn btn-default' 
									     		type='submit'
								     			>
									        	<i className='glyphicon glyphicon-search'></i>
									        </button>

									    </div>

								</div>

							</form>
		)

		return(
			<Fragment>
				<div style = {{marginBottom: '60px'}} >
					<nav className='navbar navbar-inverse navbar-fixed-top '>

					    <div className='container-fluid'>
					    	{brand}
							

							<ul className = 'nav navbar-nav'>

								{this.state.loggedin === false  && login}					
								{this.state.loggedin === true && profile}
								{this.state.loggedin === false && signup}
								{this.state.type === `official` && post_notice}
								{contact_us}
								{this.state.loggedin === true && signout}

							</ul>

							{this.state.page === `Profile` && search_bar}
							
					    </div>

		 			</nav>
	 			</div>
 			</Fragment>
		)
	}
}
export default Header