import React, {Component, Fragment} from "react"
import Header from './Header'
import Piece from './Piece'
import json_data from './json_data'
import Sidebar from './Sidebar'
import axios from 'axios'

class Notices extends Component {
	state = {
		notice_data : []
	}

	componentDidMount() {
		axios.get(`https://damp-fjord-85414.herokuapp.com/notices`)
		.then(res => {
			console.log(res)
			this.setState({
				notice_data:res.data.notices
			})
		})
		.then(res => console.log("success"))
		.catch(error => {
				console.log(error)
				this.setState({
				error: error ,
				placeholder: error.message
			})
		})
	}
	render() {		
		const display_data = this.state.notice_data.map((item,index) => (
			<Piece key = {index} data = {item} />
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

export default Notices