import React, { Component, Fragment } from "react";
import "./Stylesheets/NoticeData-stylesheet.css";
import axios from "axios";
import config from "react-global-configuration";
import { Modal, Button, ButtonToolbar } from "react-bootstrap";
import ModalNotice from "./ModalNotice";
import ModalPoster from "./ModalPoster";

class NoticeData extends Component {
  state = {
    star_status: false,
    subscribe_status: false,
    modalShow: false,
    posterShow: false
  };
  componentDidMount() {
    this.setState({
      star_status: this.props.is_starred,
      subscribe_status: this.props.is_subscribed
    });
  }

  handleClick = event => {
    event.preventDefault();
    var tar;
    if (event.target.name === "star_status") {
      tar = !this.state.star_status;
      this.handleStar(event);
    } else {
      tar = !this.state.subscribe_status;
      this.handleSubscribe(event);
    }
    this.setState({ [event.target.name]: tar });
  };

  handleStar = event => {
    event.preventDefault();
    const id = this.props.data[1]._id;
    const username = localStorage.getItem("username");
    const path = this.state.star_status ? "routes.unstar" : "routes.star";
    axios
      .post(config.get("host_url") + config.get(path), {
        username: username,
        noticeid: id
      })
      .then(res => {})
      .catch(error => {});
  };

  handleSubscribe = event => {
    event.preventDefault();
    const source = this.props.data[1].source;
    const username = localStorage.getItem("username");
    if (this.state.subscribe_status) {
      const path = config.get("host_url") + config.get("routes.unsubscribe");
      axios
        .post(path, { username: username, source: source })
        .then(res => {
          if (res.data.status == "success") {
            this.props.addSource(source);
          }
        })
        .catch(error => {});
    } else {
      const path = config.get("host_url") + config.get("routes.subscribe");
      axios
        .post(path, { username: username, source: source })
        .then(res => {
          if (res.data.status == "success") {
            this.props.removeSource(source);
          }
        })
        .catch(error => {});
    }
  };

  render() {
    const { title, body, source, tags } = this.props.data[1];
    let username = source.split("@")[0].toUpperCase();
    var images = [
      "https://i.ibb.co/mbY2R0j/4.png",
      "https://i.ibb.co/zb6FXgn/3.png",
      "https://i.ibb.co/Tb9B0Tt/2.png",
      "https://i.ibb.co/PQzBcx3/1.png"
    ];
    const img_url = images[this.props.index % 4];
    return (
      <div className="card cont">
        <div className="row no-gutters">
          <div className="col col-md-6 customDiv">
            <a href="#">
              <img
                src={img_url}
                className="img-fluid NoticeImg"
                alt="Poster"
                onClick={event => {
                  event.preventDefault();
                  this.setState({ posterShow: true });
                }}
              />
            </a>

            <ModalPoster
              show={this.state.posterShow}
              onHide={() => this.setState({ posterShow: false })}
              url={img_url}
            />
          </div>

          <div className="col col-md-6 ">
            <div className="card-block px-2 description">
              <h4 className="card-title">
                <b>{title} </b>
              </h4>

              <hr />

              <pre className="card-text">{body}</pre>

              <hr />
            </div>

            <br />

            <button
              className="btn btn-info aligned-right"
              onClick={event => {
                event.preventDefault();
                this.setState({ modalShow: true });
              }}
            >
              Read More &rarr;
            </button>
          </div>
          <ModalNotice
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
            body={body}
            title={title}
            username={username}
            tags={tags}
          />
        </div>
        <div />
        <div className="card-footer w-100 text-muted">
          <div className="row">
            <div className=" col col-sm-4 text-left">
              Posted by - {username}
            </div>
            {this.props.is_user && (
              <div className="col col-sm-8 text-right">
                <button
                  className="footerButtons btn-md"
                  name="star_status"
                  onClick={this.handleClick}
                >
                  {this.state.star_status ? "starred" : "star"}
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
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NoticeData;
