import React, {Component, Fragment} from "react"
import Notices from "./Notices"
import Header from "./Header"

class Profile extends Component {	
	state = {
		username: ``,
		type: ``
	} 

	componentDidMount() {
		const {username,type} = this.props.match.params
		this.setState({
			username: username,
			type: type
		})
	}

	handleSignout = () => {this.props.history.push(`/`)}
	handlePost = () => {this.props.history.push(`/postnotice`)}

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