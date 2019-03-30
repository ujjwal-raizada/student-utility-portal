import React, { Component, Fragment } from "react";
import axios from "axios";
import Header from "./Header";

const ColoredLine = ({ color }) => (
	<hr
		style={{
			color: color,
			backgroundColor: color,
			height: 1
		}}
	/>
);

class Login extends Component {
	state = {
		username: "",
		password: "",
		placeholder: "Login",
		placeholder2: "",
		error: {}
	};

	componentDidMount() {
		localStorage.setItem(`username`, ``);
		localStorage.setItem(`type`, ``);
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleLogin = event => {
		event.preventDefault();
		const user = {
			username: this.state.username,
			password: this.state.password
		};

		this.setState({
			placeholder: "Logging in..."
		});

		axios
			.post("https://damp-fjord-85414.herokuapp.com/login", user)

			.then(res => {
				console.log(res);
				const { type, username, status } = res.data;

				if (status === "success") {
					localStorage.setItem(`username`, username);
					localStorage.setItem(`type`, type);
					this.props.history.push(`/Profile/${type}/${username}`);
				} else if (status === "failure") {
					this.setState({
						placeholder2: `Failed login of ${username}`,
						placeholder: `Login`
					});
				}
			})

			.catch(error => {
				console.log(error);

				this.setState({
					error: error,
					placeholder: error.message
				});
			});
	};

	handlePassword = () => {
		this.props.history.push(`/forgotpassword`);
	};

	handleSignup = () => {
		this.props.history.push(`/signup`);
	};

	render() {
		return (
			<div>
				<Header page="login" />
				<div className = "jumbotron jumbotron-fluid">
					<h2 align="center"> Login </h2>
					<br />
					<form class="form-horizontal" action={this.handleLogin}>
						<div class="form-group">
							<label class="control-label col-sm-4" for="email">
								Username
							</label>
							<div class="col-sm-4">
								<input
									type="email"
									class="form-control"
									id="email"
									value={this.state.username}
									name="username"
									placeholder="Enter Email"
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-4" for="pwd">
								Password
							</label>
							<div class="col-sm-4">
								<input
									type="password"
									class="form-control"
									id="password"
									value={this.state.password}
									name="password"
									placeholder="Enter password"
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-offset-5 col-sm-4">
								<button
									onClick={this.handleLogin}
									className="btn btn-primary col-sm-5"
								>
									{this.state.placeholder}
								</button>
							</div>
						</div>
						<ColoredLine color="black" />
						<div class="form-group">
							<div class="col-sm-offset-4 col-sm-4">
								<span>
									<h5 class="col-sm col-sm-4"> Don't have account?</h5>
									<button
										onClick={this.handleSignup}
										className="btn btn-success col-sm-4"
									>
										Sign Up
									</button>
									<br />
									<br />
									<h5 class="col-sm col-sm-4"> Forgot Password?</h5>
									<button
										onClick={this.handlePassword}
										className="btn btn-danger col-sm-4"
									>
										Reset
									</button>
								</span>
								<br />
								<br />
								<h4 align="center" className="text-danger">
									{" "}
									{this.state.placeholder2}{" "}
								</h4>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
export default Login;
