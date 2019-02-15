import React, {Component} from "react"
import Test from "./Test"
class Profile extends Component {

	state = {
		data: []
	}
	componentDidMount() {
		fetch("https://reqres.in/api/users?page=2")
			.then((res) => res.json())
			.then(result => {
				this.setState({
					data: result.data,
				})
			},
			(error) => {
				this.setState({
					placeholder: "error"
				})
			})		
		}
		handleChange = () => {this.props.history.push(`/`)}
	render() {
		const list = this.state.data.map((item,index) => <Test key={item.id} first_name={item.first_name} last_name={item.last_name}/>)
		return (
			<div>
			<h3 className="text-prime text-center"> Welcome!!</h3>
			<button onClick={this.handleChange}>Signout</button>
			<div className="well well-sm text-prime text-center">
			{list}
			</div>
			</div>
		)
	}
}
export default Profile