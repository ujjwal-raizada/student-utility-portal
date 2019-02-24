import React, {Component, Fragment} from 'react'
import Header from './Header'
import Piece from './Piece'
import json_data from './json_data'
import Sidebar from './Sidebar'

class Homepage extends Component {
	render() {
		const notice_data = json_data  // recieving data in array form of json
		const display_data = notice_data.map(item => (
			<Piece key = {item.url} data = {item} />
			))

		return (
			<Fragment>
				<Header />
				<div className="container-fluid" style = {{marginTop:'60px'}}>
				  <div className="col">
				    <div className="col-sm-8">
				      {display_data}
				    </div>
				    <div className="col-sm-4 ">
				    	<div className = "affix">
				    		<Sidebar/>
				    		{/* to do */}
				    	</div>  
				    </div>
				  </div>
				</div> 				
			</Fragment>
		)
	}
}

export default Homepage


