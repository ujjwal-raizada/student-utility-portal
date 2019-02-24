import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import NotFound from "./Components/NotFound"
import ForgotPassword from "./Components/ForgotPassword"
import Profile from "./Components/Profile"
import Test from "./Components/Test"
import Notice from "./Components/Notice"
import AdminPage from "./Components/AdminPage"
import ContactUs from "./Components/ContactUs"
import Homepage from "./Components/Homepage"

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/forgotpassword" component={ForgotPassword} />
					<Route path="/profile/:username" component={Profile} />
					<Route path="/test" component={Test} />
					<Route path="/notice" component={Homepage} />
					<Route path="/contactus" component={ContactUs} />
					<Route path="/admin" component={AdminPage} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		)
	}

}
export default App