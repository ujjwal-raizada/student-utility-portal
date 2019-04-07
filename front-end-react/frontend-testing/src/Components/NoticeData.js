import React, { Component, Fragment } from "react";
import "./Stylesheets/NoticeData-stylesheet.css";

class NoticeData extends Component {
  state = {
    star_status: false,
    subscribe_status: false
  };

  handleClick = event => {
    event.preventDefault();
    var tar =
      event.target.name === "star_status"
        ? !this.state.star_status
        : !this.state.subscribe_status;
    this.setState({ [event.target.name]: tar });
  };

  render() {
    const { title, body, source } = this.props.data[1];
    let username = source.split("@")[0].toUpperCase();
    console.log(this.props.data[1]);
    return (
      <div className="card cont">
        <div className="row no-gutters">
          <div className="col col-md-6 customDiv">
            <img
              src="https://scontent.fmaa1-3.fna.fbcdn.net/v/t1.0-9/56371106_1535602813243383_420630675855507456_n.jpg?_nc_cat=101&_nc_ht=scontent.fmaa1-3.fna&oh=5625da8e034d740cb05dba6435b459eb&oe=5D40E221"
              className="img-fluid NoticeImg"
              alt="Poster"
            />
          </div>
          <div className="col col-md-6 ">
            <div className="card-block px-2 description">
              <h4 className="card-title">
                {" "}
                <b>{title} </b>
              </h4>
              <hr />
              <p className="card-text">
                <pre>{body}</pre>
              </p>
              <hr />
            </div>
            <button className="btn btn-info">Read More &rarr;</button>
            <br />
          </div>
        </div>
        <div />
        <div className="card-footer w-100 text-muted">
          <div className="row">
            <div className=" col col-sm-4 text-left">
              Posted by - {username}
            </div>
            <div className="col col-sm-8 text-right">
              <button
                className="footerButtons btn-md"
                name="star_status"
                onClick={this.handleClick}
              >
                {this.state.star_status ? "UnStar" : "star"}
              </button>
              &nbsp; &nbsp;
              <button
                className="footerButtons btn-md"
                name="subscribe_status"
                onClick={this.handleClick}
              >
                {this.state.subscribe_status ? "subscribed" : "subscribe"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoticeData;
