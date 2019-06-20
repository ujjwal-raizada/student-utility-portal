import React, { Component } from "react";
import axios from "axios";
import config from "react-global-configuration";
import ModalNotice from "./ModalNotice";

class NoticeShrinked extends Component {
  state = {
    modalShow: false
  };

  componentDidMount() {
    const notice_id = this.props.notice_id;
    axios
      .get(
        config.get("host_url") +
          config.get("routes.get_notice") +
          "/" +
          notice_id
      )
      .then(res => {
        this.setState({ notice: res.data.notice });
      })
      .catch(error => {});
  }

  render() {
    const notice = this.state.notice;

    if(notice == null) {
      return null;
    }

    return (
      <div>
        <span>
          <pre>{notice.title}</pre>
        </span>

        <button
          className="btn btn-info aligned-right"
          onClick={event => {
            event.preventDefault();
            this.setState({ modalShow: true });
          }}
        >
          Read More &rarr;
        </button>

          <ModalNotice
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
            body={notice.body}
            title={notice.title}
            source={notice.source.split("@")[0].toUpperCase()}
            tags={notice.tags}
          />

        <hr />
        
      </div>
    );
  }
}

export default NoticeShrinked;
