import React, { Component } from "react";
import axios from "axios";
import config from "react-global-configuration";
import ReactTable from "react-table";
import "react-table/react-table.css";
class SourcesList extends Component {
  state = {
    sources: []
  };

  componentDidMount() {
    axios
      .get(config.get("host_url") + config.get("routes.sources"))
      .then(res => {
        this.setState({
          sources: res.data.source_list
        });
      });
  }

  render() {
    const sources_list = this.state.sources.map((item, index) => {
      return {
        index: index,
        username: item.username
      };
    });
    const columns = [
      {
        Header: "Index",
        accessor: "index"
      },
      {
        Header: "Username",
        accessor: "username"
      }
    ];
    return (
      <div>
        <h2>Sources Registered</h2>
        <br />
        <ReactTable
          className="ReactTable-striped"
          data={sources_list}
          columns={columns}
          defaultPageSize={10}
          resized={[
            {
              id: "index",
              value: 70
            }
          ]}
          SubComponent={row => {
            return (
              <div>
                You can put any component you want here, even another React
                Table! You even have access to the row-level data if you need!
                Spark-charts, drill-throughs, infographics... the possibilities
                are endless!
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default SourcesList;
