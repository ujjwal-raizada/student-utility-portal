import React ,{Component, Fragment} from "react"

class Test extends Component {
	render() {
		return (
			<Fragment>
				<h1 className="text-danger text-center">Login</h1>
				<form>
				  <label>
				    Username:
				    <input type="text" name="Username" />
				  </label>
			   	  <label>
				    Password:
				    <input type="text" name="Password" />
				  </label>
				  	<input type="submit" value="Submit" />
				</form>
			</Fragment>
		)
	}
}
export default Test