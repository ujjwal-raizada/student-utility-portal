import React, { Component } from "react";
import { Modal, Button, ButtonToolbar } from "react-bootstrap";
class ModalPoster extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="fluid"
        scrollable
      >
        <Modal.Body>
          <img
            src={this.props.url}
            alt="Poster"
            className="img-fluid inline-block"
            width="100%"
            height="75%"
          />
        </Modal.Body>
      </Modal>
    );
  }
}
export default ModalPoster;
