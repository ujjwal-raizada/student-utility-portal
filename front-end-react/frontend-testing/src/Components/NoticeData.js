import React, { Component, Fragment } from "react";
import "./Stylesheets/NoticeData-stylesheet.css";

class NoticeData extends Component {
  render() {
    const { title, text, username } = this.props.data[1];
    return (
      <div>
        <div className="cont">
          <h4 align="center">{title}</h4>
          <hr className="my-4" />
          <div className="container-fluid">
            <div className="row">
              <div className="col col-sm-2">
                <img
                  className="NoticeImg"
                  src="https://i.ytimg.com/vi/ImO-vBmL4gk/hqdefault.jpg"
                />
              </div>
              <div className="col col-sm-8">
                <pre>{text}</pre>
              </div>
              <div className="col-sm-2">
                <button className="button button1">b0</button>
                <button className="button button2">b1</button>
                <button className="button button3">b2</button>
                <button className="button button4">b3</button>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <h6 align="center">-{username}</h6>
        </div>
      </div>
    );
  }
}

export default NoticeData;
