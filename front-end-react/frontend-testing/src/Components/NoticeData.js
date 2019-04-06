import React, { Component, Fragment } from "react";
import "./Stylesheets/NoticeData-stylesheet.css";

class NoticeData extends Component {
  render() {
    const { title, body, source } = this.props.data[1];
    let username = source.split("@")[0].toUpperCase();
    console.log(this.props.data[1]);
    return (
      <div className="card cont">
        <div className="row no-gutters">
          <div className="col-auto">
            <img
              src="https://picsum.photos/400/450/?random"
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col">
            <div className="card-block px-2 description">
              <h4 className="card-title">{title}</h4>
              <p className="card-text">
                <pre>{body}</pre>
              </p>
            </div>
            <button className="btn btn-info">Read More &rarr;</button>
          </div>
        </div>
        <div />
        <div className="card-footer w-100 text-muted">
          Posted by - {username}
        </div>
      </div>
    );
  }
}

export default NoticeData;
