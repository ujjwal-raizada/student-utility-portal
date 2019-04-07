import React, { Fragment, Component } from "react";
import axios from "axios";
import config from "react-global-configuration";
import Header from "./Header";
import "./Stylesheets/UserProfileOfficial.css";
import { Tabs, Tab } from "react-bootstrap";

class UserPofile extends Component {
  /* state variable for the class */
  state = {
    name: "",
    key: "Home",
    url: ""
  };

  /* lifecycle methods of the class */
  componentDidMount() {
    var url =
      `https://api.adorable.io/avatars/285/` +
      localStorage.getItem(`username`) +
      `.png`;
    this.setState({ name: localStorage.getItem(`username`), url: url });
  }

  /* render method enclosing jsx expression */
  render() {
    return (
      <Fragment>
        <Header />
        <div className="container-fluid cont">
          <div className="row" />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col col-lg-2" />
            <div className="col col-lg-2">
              <img src={this.state.url} className="avatar" alt="avatar" />
              <hr className="my-4" />
              <div className="text-center">{this.state.name}</div>
            </div>
            <div className="col col-lg-6">
              <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={key => this.setState({ key })}
              >
                <Tab eventKey="Home" title="Home">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Tab>
                <Tab eventKey="subscribers" title="Subscribers">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate velit esse quam nihil
                  molestiae consequatur, vel illum qui dolorem eum fugiat quo
                  voluptas nulla pariatur?
                </Tab>
                <Tab eventKey="pastNotices" title="Past Notices">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi, id est laborum et dolorum fuga. Et harum
                  quidem rerum facilis est et expedita distinctio. Nam libero
                  tempore, cum soluta nobis est eligendi optio cumque nihil
                  impedit quo minus id quod maxime placeat facere possimus,
                  omnis voluptas assumenda est, omnis dolor repellendus.
                  Temporibus autem quibusdam et aut officiis debitis aut rerum
                  necessitatibus saepe eveniet ut et voluptates repudiandae sint
                  et molestiae non recusandae. Itaque earum rerum hic tenetur a
                  sapiente delectus, ut aut reiciendis voluptatibus maiores
                  alias consequatur aut perferendis doloribus asperiores
                  repellat.
                </Tab>
              </Tabs>
            </div>
            <div className="col col-lg-2" />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserPofile;
