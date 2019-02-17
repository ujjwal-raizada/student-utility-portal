import React, {Component} from "react"
import Header from './Header'
class NotFound extends Component {
	render() {
		return (
			<React.Fragment>
			<Header />
			<h3 className="text-danger text-center">Error 404!!!</h3>
			</React.Fragment>
		)
	}
}
export default NotFound