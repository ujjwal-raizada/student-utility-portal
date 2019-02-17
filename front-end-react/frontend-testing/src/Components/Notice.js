import React, {Component, Fragment} from "react"
import Header from './Header'

class Notice extends Component {

	render() {

		return (
			<Fragment>
				<Header />
				<h3 className="text text-center"> Notices </h3>
			</Fragment>
		)
	}
}

export default Notice