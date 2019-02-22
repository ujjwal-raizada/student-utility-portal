import React, {Component, Fragment} from "react"
import axios from "axios"
import Header from './Header'

class Login extends Component {
		
	state = {
		userame: "",
		password: "",
		placeholder: "",
		error: {}
	}	
	
	handleChange = (event) => {

		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleLogin = () => {		
		
		const user = {			
		    "username": this.state.userame ,
		    "password": this.state.password			
		}

		this.setState({
				placeholder: "Logging in..."
		})

		axios.post('http://localhost:8080/login', user)

      	.then(res => {

      		const status = res.data.status

      		if(status === 'success') {
    			this.props.history.push(`/Profile/${this.state.userame}`)      			
      		}

      		else if(status === 'failure') {
      			this.setState({
      				placeholder: `Failed login of ${user.username}`
      			})
      		}
		})

		.catch(error => {

			console.log(error)

			this.setState({
				error: error ,
				placeholder: error.message
			})
		})   
	}

	handlePassword = () => {
		this.props.history.push(`/forgotpassword`)
	}

	handleSignup = () => {		
		this.props.history.push(`/signup`)
	}
	render() {
		return (
			<Fragment >
				<Header page='Header'/>
					<div className="text-center">
						<h1 >Login</h1>
						<p className="text-danger">{this.state.placeholder}</p>
						<input 
							className = "well well-sm"
							name = "userame"
							type = "text" 
							placeholder = "User Name" 
							onChange = {this.handleChange}
						/>
						<br/>
						<input 
							className = "well well-sm"
							name = "password" 
							type = "password" 
							placeholder = "Password" 
							onChange = {this.handleChange}
						/>
						<br/>
						<button 
							className = "btn btn-primary" 
							onClick = {this.handleLogin}>
							Login 
						</button>
						<button 
							className = "btn btn-success" 
							onClick = {this.handleSignup}>
							Signup
						</button>

						<br/>
						<br/>

						<button 
							className = "btn btn-danger" 
							onClick = {this.handlePassword}>
							Forgot Password
						</button>
					</div>
			</Fragment>
		)
	}
}
export default Login