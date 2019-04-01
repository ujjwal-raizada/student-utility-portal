import React, { Component, Fragment } from "react";
import axios from "axios";
import Header from "./Header";
import { Form, Jumbotron, Button, Container, Row, Col } from "react-bootstrap";

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
				<Jumbotron>
					<div className="container">
						<div className="row">
							<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
								<div className="card card-signin my-5">
									<div className="card-body">
										<h5 className="card-title text-center">
											Sign In
										</h5>
										<form className="form-signin">
											<div className="form-label-group">
												<label for="inputEmail">
													Email address
												</label>
												<input
													type="email"
													id="inputEmail"
													className="form-control"
													placeholder="Email address"
													name="username"
													value={this.state.username}
													onChange={this.handleChange}
												/>
											</div>
											<label for="inputPassword">
												Password
											</label>
											<div className="form-label-group">
												<input
													type="password"
													id="inputPassword"
													className="form-control"
													placeholder="Password"
													name="password"
													value={this.state.password}
													onChange={this.handleChange}
												/>
											</div>
											<div className="custom-control custom-checkbox mb-3">
												<input
													type="checkbox"
													className="custom-control-input"
													id="customCheck1"
												/>
												<label
													className="custom-control-label"
													for="customCheck1"
												>
													Remember password
												</label>
											</div>
											<button
												className="btn btn-lg btn-primary btn-block text-uppercase"
												type="submit"
												onClick={this.handleLogin}
											>
												{this.state.placeholder}
											</button>
											<br />
											<div className="col text-center">
												Forgot Password? &nbsp;&nbsp;
												<a href="/forgotpassword">
													Reset here{" "}
												</a>
											</div>
											<hr className="my-4" />
											<div className="col text-center">
												<button
													className="btn btn-success"
													type="submit"
													onClick={this.handleSignup}
												>
													Sign Up
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Jumbotron>
			</div>
		);
	}
}
export default Login;
