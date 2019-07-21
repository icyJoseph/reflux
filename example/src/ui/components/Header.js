import React from "react";

export function Header({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <h1 style={{ width: "90%", margin: "0 1em" }}>Todos using Reflux</h1>
      <h3 style={{ width: "10%", margin: "0 1em" }}>{children}</h3>
    </div>
  );
}

export default Header;
