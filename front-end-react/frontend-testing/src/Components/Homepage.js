import React, {Component, Fragment} from 'react'
import Header from './Header'
import Notices from './Notices'
class Homepage extends Component {
	render() {		

		return (
			<Fragment>
				<Header />
				<Notices/>	
			</Fragment>
		)
	}
}

export default Homepage


