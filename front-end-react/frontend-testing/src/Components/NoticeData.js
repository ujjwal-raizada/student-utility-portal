import React, { Component, Fragment } from "react";
import "./Stylesheets/NoticeData-stylesheet.css";

class NoticeData extends Component {
  render() {
    const { title, body, source } = this.props.data[1];
    let username = source.split("@")[0].toUpperCase();
    console.log(this.props.data[1]);
    return (
      <div class="card cont">
        <div class="row no-gutters">
          <div class="col-auto">
            <img
              src="https://picsum.photos/400/450/?random"
              class="img-fluid"
              alt=""
            />
          </div>
          <div class="col">
            <div class="card-block px-2 description">
              <h4 class="card-title">{title}</h4>
              <p class="card-text">
                <pre>{body}</pre>
              </p>
            </div>
            <button className="btn btn-primary">Read More &rarr;</button>
          </div>
        </div>
        <div />
        <div class="card-footer w-100 text-muted">Posted by - {username}</div>
      </div>
    );
  }
}

export default NoticeData;
