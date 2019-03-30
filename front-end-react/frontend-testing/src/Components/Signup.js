import React, { Component, Fragment } from "react";
import axios from "axios";
import Header from "./Header";

class Signup extends Component {
	state = {
		username: "",
		password: "",
		type: "normal"
	};

	componentDidMount() {
		localStorage.setItem(`username`, ``);
		localStorage.setItem(`type`, ``);
	}

	handleChange = event => {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		const data = this.state;

		this.setState({
			placeholder: "Submitting..."
		});

		axios
			.post("https://damp-fjord-85414.herokuapp.com/signup", data)
			.then(res => {
				const { status, message } = res.data;
				if (status === "success") {
					this.setState({
						placeholder: message
					});
					const { type, username } = this.state;
					localStorage.setItem(`username`, username);
					localStorage.setItem(`type`, type);
					this.props.history.push(`/profile/${type}/${username}`);
				} else if (status === "failure") {
					this.setState({
						placeholder: message
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

	render() {
		return (
			<Fragment>
				<Header page="Signup" />
				<div className="text-center">
					<h1>Signup</h1>
					<p className="text-danger">{this.state.placeholder}</p>

					<form>
						<div>
							<label>
								Username:
								<input
									className="well well-sm"
									type="text"
									name="username"
									value={this.state.username}
									onChange={this.handleChange}
								/>
							</label>
							<br />
							<br />
						</div>

						<div>
							<label>
								Password:
								<input
									className="well well-sm"
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
							</label>
							<br />
							<br />
						</div>

						<div>
							<label>
								User Type:
								<select
									value={this.state.type}
									onChange={this.handleChange}
									name="type"
								>
									<option value="normal">Student</option>
									<option value="official">
										Official Source
									</option>
								</select>
							</label>
							<br />
							<br />
						</div>

						<div>
							<label>
								Description:
								<br />
								<textarea
									className="well well-sm"
									style={{ height: `100px`, width: `300px` }}
									name="Description"
								/>
								<br />
							</label>
							<br />
						</div>

						<div>
							<input
								className="btn btn-primary"
								type="submit"
								name="Submit"
								onClick={this.handleSubmit}
							/>
							<br />
						</div>
					</form>
				</div>
			</Fragment>
		);
	}
}

export default Signup;
