import React, {Component, Fragment} from 'react'
import Header from './Header'
import Notices from './Notices'
class Homepage extends Component {
	render() {		

		return (
			<Fragment>
				<Header page={`Home`}/>
				<Notices/>	
			</Fragment>
		)
	}
}

export default Homepage


