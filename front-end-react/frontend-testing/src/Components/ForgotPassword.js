import React, { Component, Fragment } from "react";
import Header from "./Header";

class ForgotPassword extends Component {
	state = {
		email: ""
	};

	handleChange = event => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		return (
			<Fragment>
				<Header page="ForgotPassword" />
				<form class="form-horizontal" action="/action_page.php">
					<div class="form-group">
						<label class="control-label col-sm-4" for="email">
							Email:
						</label>
						<div class="col-sm-4">
							<input
								type="email"
								class="form-control"
								id="email"
								value={this.state.email}
								name="email"
								placeholder="Enter Email"
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-offset-5 col-sm-4">
							<button type="submit" class="btn btn-default">
								Submit
							</button>
						</div>
					</div>
				</form>
			</Fragment>
		);
	}
}
export default ForgotPassword;