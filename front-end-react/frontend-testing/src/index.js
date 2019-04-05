import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import InitConfig from "./InitConfig";
InitConfig(false);
ReactDOM.render(<App />, document.getElementById("root"));
