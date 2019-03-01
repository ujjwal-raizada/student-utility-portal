import React, {Component, Fragment} from 'react'

const divStyle = {
  	margin: '40px',
	border: '5px solid pink'
};

class Piece extends Component {
	render() {
		return(
			<div className = "Piece" style = {divStyle}>
				<h3 align = "center">{this.props.data[1].title}</h3>
				<h5 align = "center">{this.props.data[1].text}</h5>
				<h6 align = "right">-{this.props.data[1].username}</h6>
			</div>
		)
	}
}

export default Piece