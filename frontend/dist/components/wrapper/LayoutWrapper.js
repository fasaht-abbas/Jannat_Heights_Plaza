"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Header_1 = __importDefault(require("./Header"));
const Footer_1 = __importDefault(require("./Footer"));
const react_helmet_1 = require("react-helmet");
const LayoutWrapper = ({ children, title, description, keywords, author, }) => {
    return (<div className="w-[100%]">
      <react_helmet_1.Helmet>
        <meta charSet="utf-8"/>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
        <meta name="author" content={author}></meta>
      </react_helmet_1.Helmet>
      <Header_1.default />
      {/* make the minheight auto on deployment */}
      <main style={{ minHeight: "80vh", width: "100vW" }}>{children}</main>
      <Footer_1.default />
    </div>);
};
exports.default = LayoutWrapper;
