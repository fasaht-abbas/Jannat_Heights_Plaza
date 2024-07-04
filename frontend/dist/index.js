"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
const App_1 = __importDefault(require("./App"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const store_1 = require("./redux/store");
const google_1 = require("@react-oauth/google");
const validate_1 = require("./utils/validate");
const react_2 = require("redux-persist/integration/react");
const react_hot_toast_1 = require("react-hot-toast");
// import reportWebVitals from './reportWebVitals';
const root = client_1.default.createRoot(document.getElementById("root"));
root.render(<react_1.default.StrictMode>
    <react_router_dom_1.BrowserRouter>
      <google_1.GoogleOAuthProvider clientId={validate_1.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <react_redux_1.Provider store={store_1.store}>
          <react_2.PersistGate loading={null} persistor={store_1.persistor}>
            <App_1.default />
            <react_hot_toast_1.Toaster />
          </react_2.PersistGate>
        </react_redux_1.Provider>
      </google_1.GoogleOAuthProvider>
    </react_router_dom_1.BrowserRouter>
  </react_1.default.StrictMode>);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
