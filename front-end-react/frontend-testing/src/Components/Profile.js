import React, {Component, Fragment} from "react"
import Notices from "./Notices"
import Header from "./Header"
import Login from "./Login"

class Profile extends Component {	
	state = {
		username: ``,
		type: ``
	} 

	componentDidMount() {
		const username = localStorage.getItem(`username`)
		const type = localStorage.getItem(`type`)
		const user_input = this.props.match.params.username
		if(username === user_input) {
			this.setState({
			username: username,
			type: type
			})
		}
		else {
			this.redirect()
		}
		
	}

	redirect = () => {
		const username = localStorage.getItem(`username`)
		const type = localStorage.getItem(`type`)	
		if(username === ``) {
			this.props.history.push(`/login`)
		}
		else {
			this.props.history.push(`/Profile/${type}/${username}`)
		}
	}

	render() {

		return (

			<Fragment>

				<Header page="Profile"/>

				<h3 className="text-prime text-center"> Welcome!!</h3>

				<Notices />
				
			</Fragment>
		)	
	}
}
export default Profile