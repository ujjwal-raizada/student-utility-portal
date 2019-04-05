import React from "react";
import "./Stylesheets/Sidebar.css";

export default props => {
  return (
    <div className="fixed">
      <div className="card">
        <img
          src="https://i.ytimg.com/vi/ImO-vBmL4gk/hqdefault.jpg"
          alt="Avatar"
        />
        <div className="container">
          <h4>
            <b>Jane Doe</b>
          </h4>
          <p>Interior Designer</p>
        </div>
      </div>
    </div>
  );
};
