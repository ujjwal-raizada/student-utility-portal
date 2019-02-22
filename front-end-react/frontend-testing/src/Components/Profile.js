import React, {Component, Fragment} from "react"
import Test from "./Test"
import Login from "./Login"
import Header from "./Header"
import axios from "axios"

class Profile extends Component {	
		
	// handleClick = () => {this.props.history.push(`/`)}
	handleClick = () => <Login/>
	render() {

		return (
			<Fragment>
				<Header page="Profile"/>
				<h3 className="text-prime text-center"> Welcome!!</h3>
				<button onClick={this.handleClick}>Signout</button>
			</Fragment>
		)	
	}
}
export default Profile