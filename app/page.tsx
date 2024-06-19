import React from "react";
import Chat from "./components/Chat";

const page = () => {
  const isAuthenticated = true;

  return <div>{isAuthenticated ? <Chat></Chat> : <h1>Please login</h1>}</div>;
};

export default page;
