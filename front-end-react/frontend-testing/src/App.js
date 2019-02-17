import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import LoginForm from "./LoginForm"
import Signup from "./Signup"
import NotFound from "./NotFound"
import ForgotPassword from "./ForgotPassword"
import Profile from "./Profile"
import Test from "./Test"
import Notice from "./Notice"

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={LoginForm} />
					<Route path="/Signup" component={Signup} />
					<Route path="/ForgotPassword" component={ForgotPassword} />
					<Route path="/Profile/:Username" component={Profile} />
					<Route path="/Test" component={Test} />
					<Route path="/Notice" component={Notice} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		)
	}

}
export default App