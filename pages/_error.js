import React from "react";
import NotFound from "../components/notFound";

function Error({ statusCode }) {
  if (statusCode === 404) return <NotFound />;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
