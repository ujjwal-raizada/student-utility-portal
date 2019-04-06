import React, { Component, Fragment } from "react";
import "./Stylesheets/Sidebar.css";

export default class Sidebar extends Component {
    render() {
        return (
            <Fragment>
                <div className="position-fixed">
                    <div class="card my-4">
                        <h5 class="card-header">Search</h5>
                        <div class="card-body">
                            <div class="input-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Search for..."
                                />
                                &nbsp;
                                <span class="input-group-btn">
                                    <button
                                        class="btn btn-secondary"
                                        type="button"
                                    >
                                        Go!
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="card my-4">
                        <h5 class="card-header">Tags</h5>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <ul class="list-unstyled mb-0">
                                        <li>
                                            <a href="#">Web Design</a>
                                        </li>
                                        <li>
                                            <a href="#">HTML</a>
                                        </li>
                                        <li>
                                            <a href="#">Freebies</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-lg-6">
                                    <ul class="list-unstyled mb-0">
                                        <li>
                                            <a href="#">JavaScript</a>
                                        </li>
                                        <li>
                                            <a href="#">CSS</a>
                                        </li>
                                        <li>
                                            <a href="#">Tutorials</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
