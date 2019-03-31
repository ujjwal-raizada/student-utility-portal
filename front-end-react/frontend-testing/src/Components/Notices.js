import React, { Component, Fragment } from "react";
import NoticeData from "./NoticeData";
import Sidebar from "./Sidebar";
import axios from "axios";

class Notices extends Component {
	state = {
		notice_data: [],
		loading: true,
		error: "",
		placeholder: ""
	};

	componentDidMount() {
		axios
			.get(`https://damp-fjord-85414.herokuapp.com/notices`)
			.then(res => {
				console.log(res);
				this.setState({
					loading: false,
					notice_data: res.data.notices
				});
			})
			.then(res => console.log("success"))
			.catch(error => {
				console.log(error);
				this.setState({
					error: error,
					placeholder: error.message
				});
			});
	}
	render() {
		const display_data = this.state.notice_data.map((item, index) => (
			<NoticeData key={index} data={item} />
		));

		return (
			<Fragment>
				<div className="row">
					<div className="col col-sm-8">
						<h1 className="text-center">Notices</h1>
						<h4 className="text-danger text-center">
							{this.state.loading
								? `loading...`
								: this.state.placeholder}
						</h4>
						<div>{display_data}</div>
					</div>
					<div className="col col-sm-4">
						<Sidebar />
						{/* to do */}
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Notices;
