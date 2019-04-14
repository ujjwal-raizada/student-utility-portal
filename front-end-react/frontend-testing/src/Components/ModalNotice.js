import React, { Component } from "react";
import { Modal, Button, ButtonToolbar } from "react-bootstrap";
class ModalNotice extends React.Component {
  render() {
    const tag_list = this.props.tags.map((item, index) => {
      return <span key={index}>{"#" + item + " "} </span>;
    });
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4 className="card-title">
              <b>{this.props.title} </b>
            </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.props.body}</p>
          <br />
          <br />
          <div className="text text-right">{tag_list}</div>
        </Modal.Body>
        <Modal.Footer>
          <div className=" col col-ls-4 text-left">
            Posted by - {this.props.username}
          </div>
          <Button onClick={this.props.onHide} className="btn btn-info">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ModalNotice;
