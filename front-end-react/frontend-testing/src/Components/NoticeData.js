import React, {Component, Fragment} from 'react'

const divStyle = {
	margin: '40px',
	border: '5px solid pink'
};

class NoticeData extends Component {
	render() {
		const {title, text, username} = this.props.data[1]
		return(
			<div className = "NoticeData" style = {divStyle}>
				<h3 align = "center">{title}</h3>
				<h5 align = "center">{text}</h5>
				<h6 align = "right">-{username}</h6>
			</div>
		)
	}
}

export default NoticeData