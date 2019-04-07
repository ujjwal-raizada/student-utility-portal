import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NotFound from "./Components/NotFound";
import ForgotPassword from "./Components/ForgotPassword";
import Profile from "./Components/Profile";
import PostNotice from "./Components/PostNotice";
import ContactUs from "./Components/ContactUs";
import Homepage from "./Components/Homepage";
import AdminLogin from "./Components/AdminLogin";

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route exact path="/admin/login" component={AdminLogin} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/login" component={Login} />
					<Route
						exact
						path="/forgotpassword"
						component={ForgotPassword}
					/>
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/notice" component={Homepage} />
					<Route exact path="/contactus" component={ContactUs} />
					<Route exact path="/postnotice" component={PostNotice} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		);
	}
}
export default App;
