import React, { Component } from "react";
import "./Stylesheets/NoticeData-stylesheet.css";
import axios from "axios";
import config from "react-global-configuration";
import ModalNotice from "./ModalNotice";
import ModalPoster from "./ModalPoster";
import { Card, CardHeader, CardImg, CardBody, CardFooter, Button, ButtonGroup } from "shards-react";

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
    if(event.target.name === "read_more") {
      this.setState({ modalShow: true });
    } else if (event.target.name === "star_status") {
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
    let { title, body, source, tags } = this.props.data[1];
    source = source.split("@")[0].toUpperCase();
    var images = [
      "https://i.ibb.co/mbY2R0j/4.png",
      "https://i.ibb.co/zb6FXgn/3.png",
      "https://i.ibb.co/Tb9B0Tt/2.png",
      "https://i.ibb.co/PQzBcx3/1.png"
    ];

    const img_url = images[this.props.index % 4];

    return (
      <Card style={{ maxWidth: "900px" }}>
        <CardHeader> {title} </CardHeader>
        <CardImg src={img_url} alt="Poster" onClick={event => {event.preventDefault();
            this.setState({ posterShow: true });
            }}
        />
        <ModalPoster show={this.state.posterShow} url={img_url} 
          onHide={() => this.setState({ posterShow: false })}          
        />                
        <CardBody>
          <pre>
              {body.slice(0, 400) + (body.length > 400 ? "..." : "")}
          </pre>
          <ModalNotice
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          body={body}
          title={title}
          source={source}
          tags={tags}
          />
        <ButtonGroup>
          <Button name="read_more"onClick={this.handleClick}>
            Read More &rarr;
          </Button>
          &nbsp; &nbsp;          
          <Button name="star_status" onClick={this.handleClick}>
              {this.state.star_status ? "starred" : "star"}
          </Button>
          &nbsp; &nbsp;
          <Button name="subscribe_status" onClick={this.handleClick}>
              {this.state.subscribe_status ? "subscribed" : "subscribe"}
          </Button>
        </ButtonGroup>
        </CardBody>
        <CardFooter>
          Posted by - {source} 
        </CardFooter>        
    </Card>
    );
  }
}

export default NoticeData;
