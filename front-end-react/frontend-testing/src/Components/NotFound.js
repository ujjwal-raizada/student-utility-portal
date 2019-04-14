import React, { Component, Fragment } from "react";
import Header from "./Header";

class NotFound extends Component {
    render() {
        return (
            <Fragment>
                <h3 className="text-danger text-center">Error 404!!!</h3>
            </Fragment>
        );
    }
}
export default NotFound;
