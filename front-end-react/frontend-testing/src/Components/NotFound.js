import React, { Component, Fragment } from "react";
import Header from "./Header";

class NotFound extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <h3 className="text-danger text-center">
                    Email sent successfully
                </h3>
            </Fragment>
        );
    }
}
export default NotFound;
