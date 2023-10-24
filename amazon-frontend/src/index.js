import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import "./global.css";
import { Provider } from "react-redux";
import store from "./Store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThirdwebProvider activeChain={Sepolia}>
        <App />
      </ThirdwebProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
