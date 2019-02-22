import React, {Component, Fragment} from "react"
import Header from './Header'

class ContactUs extends Component {

	render() {

		return (
			<Fragment>
				<Header page='ContactUs'/>
				<h3 className="text text-center"> Contact Us </h3>
				<pre>
				Ujjwal Raizada (Scrum Master)<br/>
				Satyam Mani (Product Owner)<br/>
				Daksh Yashlaha (Developer)<br/>
				Prakhar Goenka (Developer)<br/>
				Pranjal Gupta (Developer)<br/>
				</pre>
			</Fragment>
		)
	}
}

export default ContactUs