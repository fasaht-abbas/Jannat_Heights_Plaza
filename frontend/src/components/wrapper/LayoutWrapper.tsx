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
    <div className="w-[100vw] h-[100vh]">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="robots" content={author} />
      </Helmet>
      <Header />
      {/* make the minheight auto on deployment */}
      <main style={{ minHeight: "80vh", width: "100vW" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutWrapper;
