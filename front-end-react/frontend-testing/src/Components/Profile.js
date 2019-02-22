import React, {Component, Fragment} from "react"
import Test from "./Test"
import Login from "./Login"
import axios from "axios"

class Profile extends Component {	
		
	// handleClick = () => {this.props.history.push(`/`)}
	handleClick = () => <Login/>
	render() {

		return (
			<div>
				<h3 className="text-prime text-center"> Welcome!!</h3>
				<button onClick={this.handleClick}>Signout</button>
			</div>
		)
	}
}
export default Profile