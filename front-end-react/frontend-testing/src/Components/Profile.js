import React, {Component, Fragment} from "react"
import Notices from "./Notices"
import Header from "./Header"
import Login from "./Login"

class Profile extends Component {	
	state = {
		username: ``,
		type: ``,
		valid: false
	} 

	componentDidMount() {
		const username = sessionStorage.getItem(`username`)
		const type = sessionStorage.getItem(`type`)
		const user_input = this.props.match.params.username
		if(username === user_input) {
			this.setState({
			username: username,
			type: type,
			valid: true,
			})
		}
		else {
			this.redirect()
		}
		
	}

	redirect = () => {
		const username = sessionStorage.getItem(`username`)
		const type = sessionStorage.getItem(`type`)	
		if(username === ``) {
			this.props.history.push(`/login`)
		}
		else {
			this.props.history.push(`/Profile/${type}/${username}`)
		}
	}
	handleSignout = () => {

		sessionStorage.setItem(`username`,``)
		sessionStorage.setItem(`type`,``)
		this.props.history.push(`/`)
	}

	handlePost = () => {this.props.history.push(`/postnotice/${this.state.username}`)}

	render() {

		return (

			<Fragment>

				<Header page="Profile"/>

				<h3 className="text-prime text-center"> Welcome!!</h3>

				<div>

					<button onClick={this.handleSignout}>Signout </button>

					{this.state.type==='official' && <button onClick={this.handlePost}>Post Notice </button>}

				</div>

				<Notices />
				
			</Fragment>
		)	
	}
}
export default Profile