import React, {Component, Fragment} from "react"
import Header from './Header'

const divStyle = {
  	margin: '40px',
	border: '5px solid pink',
	padding: '15px'
};

class ContactUs extends Component {

	render() {

		return (
			<Fragment>
				<Header page='ContactUs'/>
				<div style = {{marginTop: '60px'}}>	
					<h3 className="text text-center"> Contact Us </h3>
					<div style = {divStyle}>
					<h3>Ujjwal Raizada (Scrum Master)</h3>
					<h3>Satyam Mani (Product Owner)</h3>
					<h3>Daksh Yashlaha (Developer)</h3>
					<h3>Prakhar Goenka (Developer)</h3>
					<h3>Pranjal Gupta (Developer)</h3>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default ContactUs