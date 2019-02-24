import React, {Component, Fragment} from 'react'

const divStyle = {
  	margin: '40px',
	border: '5px solid pink'
};

class Piece extends Component {
	render() {
		return(
			<div className = "Piece" style = {divStyle}>
				<h1 align = "center">{this.props.data.name}</h1>
				<h6 align = "center">{this.props.data.hair_color}</h6>
				<h6 align = "center">{this.props.data.eye_color}</h6>
			</div>
		)
	}
}

export default Piece