import React, {Component, Fragment} from "react"
import axios from "axios"
import Header from './Header'
class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			userame: "",
			password: "",
			placeholder: "",
			users: [] ,
			error: {}
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.handlePassword = this.handlePassword.bind(this)
		this.checkLogin = this.checkLogin.bind(this)
		this.handleSignup = this.handleSignup.bind(this)

	}
	
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleLogin() {
		const user = {
			
			    "email": this.state.userame,
			    "password": this.state.password
			
		}
		this.setState({
					placeholder: "Logging in..."
				})

		axios.post('https://reqres.in/api/login', user)
      	.then(res => {
    		this.props.history.push(`/Profile/${this.state.userame}`)
	   //      this.setState({
				// 	// placeholder: res.data['token'] ,
				// 	// error: res
				//  })
				// })
			})
		.catch(error => {
			this.setState({
				error: error ,
				placeholder: error.response.data.error
			})
		})   
	}
	checkLogin(user,index) {
			if(user.email === user.password && user.email !== "") {
				this.setState({
					placeholder: "Login Successful"
				})
				return true
			}
			else {
				this.setState({
				placeholder: "Login Failed"
			})
				return false
			}
		}
	handlePassword() {
		this.props.history.push(`/ForgotPassword`)
	}

	handleSignup() {		
		this.props.history.push(`/Signup`)
	}
	render() {
		return (
			<Fragment >
			<Header />
			<div className="text-center">
				<h1 >Login Page</h1>
				<p className="text-danger">{this.state.placeholder}</p>
				<input 
				className = "well well-sm"
					name = "userame"
					type = "text" 
					placeholder = "User Name" 
					onChange = {this.handleChange}
				/>
				<br/>
				<input className = "well well-sm"
					name = "password" 
					type = "text" 
					placeholder = "Password" 
					onChange = {this.handleChange}
				/>
				<br/>
				<button 
					className = "btn btn-primary" onClick = {this.handleLogin}>Login 
				</button>
				<button 
					className = "btn btn-success" onClick = {this.handleSignup}>Signup
				</button>

				<br/>
				<br/>

				<button 
					className = "btn btn-danger" onClick = {this.handlePassword}>Forgot Password
				</button>
				</div>
			</Fragment>
		)
	}
}
export default LoginForm