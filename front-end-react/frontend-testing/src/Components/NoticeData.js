import React, { Component, Fragment } from "react";
import "./Stylesheets/NoticeData-stylesheet.css";

const divStyle = {
	margin: "40px",
	borderStyle: "rounded"
};

class NoticeData extends Component {
	render() {
		const { title, text, username } = this.props.data[1];
		return (
			<div>
				<div className="cont">
					<h4 align="center">{title}</h4>
					<hr className="my-4" />
					<pre>{text}</pre>
					<hr className="my-4" />
					<h6 align="center">-{username}</h6>
				</div>
			</div>
		);
	}
}

export default NoticeData;
