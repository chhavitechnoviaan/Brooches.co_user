// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";
// import { Toaster } from "react-hot-toast";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//         <Toaster position="top-center" />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  Provider,
} from "react-redux";

import { store } from "./redux/store";

import {
  Toaster,
} from "react-hot-toast";

import {
  LocationProvider,
} from "./context/LocationContext";

ReactDOM.createRoot(
  document.getElementById(
    "root"
  )
).render(
  <React.StrictMode>

    <Provider store={store}>

      <LocationProvider>

        <BrowserRouter>

          <App />

          <Toaster position="top-center" />

        </BrowserRouter>

      </LocationProvider>

    </Provider>

  </React.StrictMode>
);