import React, { Component, Fragment } from "react";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import Header from "./Header";

class PostNotice extends Component {
	state = {
		username: "",
		type: "normal",
		placeholder: "",
		title: "",
		text: "",
		url: "",
		is_event: false,
		date: new Date(),
		tag1: false,
		tag2: false,
		tag3: false,
		tag4: false,
		tag5: false,
		status: "failure",
		error: ""
	};

	componentDidMount() {
		const username = localStorage.getItem("username");
		const type = localStorage.getItem("type");
		const user_input = this.props.match.params.username;
		if (username === user_input && type === "official") {
			this.setState({
				username: username,
				type: type
			});
		} else {
			this.redirect();
		}
	}

	redirect = () => {
		const username = localStorage.getItem("username");
		const type = localStorage.getItem("type");
		if (username === "") {
			this.props.history.push(`/login`);
		} else {
			this.props.history.push(`/Profile/${type}/${username}`);
		}
	};

	handleChange = event => {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	handleChangeDate = date => {
		this.setState({
			date: date
		});
	};

	postNotice = () => {
		this.setState({
			placeholder: "Submitting..."
		});
		const data = this.state;
		console.log(data);
		axios
			.post("https://damp-fjord-85414.herokuapp.com/create", data)
			.then(res => {
				console.log(res.data);
				const status = res.data.status;
				const message = res.data.message;
				if (status === "success") {
					alert("Notice Submitted Successfully!");
					const url = `/profile/official/${this.state.username}`;
					this.props.history.push(url);
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

	handleSubmit = event => {
		event.preventDefault();
		this.postNotice();
	};

	render() {
		return (
			<Fragment>
				<Header />
				<div className="text-center">
					<h1>Post Notice</h1>
					<p className="text-danger">{this.state.placeholder}</p>
					<form>
						<div>
							<input
								type="text"
								style={{ width: "600px" }}
								className="well well-sm"
								name="title"
								placeholder="Title"
								value={this.state.title}
								onChange={this.handleChange}
							/>
							<br />
							<br />
						</div>

						<div>
							<textarea
								style={{ height: "200px", width: "600px" }}
								className="well well-sm"
								name="text"
								placeholder="Text"
								value={this.state.text}
								onChange={this.handleChange}
							/>
							<br />
						</div>

						<div>
							<input
								type="text"
								style={{ width: "600px" }}
								className="well well-sm"
								name="url"
								placeholder="Url"
								value={this.state.url}
								onChange={this.handleChange}
							/>
							<br />
							<br />
						</div>

						<div>
							<label style={{ width: 100 }}>
								Is an Event :
								<input
									type="checkbox"
									name="is_event"
									checked={this.state.is_event}
									onChange={this.handleChange}
								/>
							</label>
							<br />
							<label>
								Starts At:
								<DateTimePicker
									value={this.state.date}
									onChange={this.handleChangeDate}
									disabled={!this.state.is_event}
								/>
							</label>
						</div>

						<div>
							<label style={{ width: 100 }}>
								<input
									type="checkbox"
									name="tag1"
									checked={this.state.tag1}
									onChange={this.handleChange}
								/>
								tag1
							</label>

							<label style={{ width: 100 }}>
								<input
									type="checkbox"
									name="tag2"
									checked={this.state.tag2}
									onChange={this.handleChange}
								/>
								tag2
							</label>

							<label style={{ width: 100 }}>
								<input
									type="checkbox"
									name="tag3"
									checked={this.state.tag3}
									onChange={this.handleChange}
								/>
								tag3
							</label>

							<label style={{ width: 100 }}>
								<input
									type="checkbox"
									name="tag4"
									checked={this.state.tag4}
									onChange={this.handleChange}
								/>
								tag4
							</label>

							<label style={{ width: 100 }}>
								<input
									type="checkbox"
									name="tag5"
									checked={this.state.tag5}
									onChange={this.handleChange}
								/>
								tag5
							</label>

							<br />
							<br />
						</div>

						<div>
							<input
								type="submit"
								className="btn btn-primary"
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
export default PostNotice;
