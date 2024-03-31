import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { LayoutWrapperProps } from "../interface";

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  title,
  description,
  keywords,
  author,
}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author}></meta>
      </Helmet>
      <Header />
      {/* make the minheight auto on deployment */}
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutWrapper;
