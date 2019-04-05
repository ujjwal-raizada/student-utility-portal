import React, { Component, Fragment } from "react";

class Test extends Component {
  render() {
    return (
      <Fragment>
        <h2> First name: {this.props.first_name} </h2>
        <h3>Last Name: {this.props.last_name}</h3>
        <br />
      </Fragment>
    );
  }
}
export default Test;
