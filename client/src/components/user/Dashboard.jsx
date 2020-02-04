import React from "react";
// Component
import Carousel from "../shared/carousel";

export default props => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Carousel {...props} />
    </div>
  );
};
