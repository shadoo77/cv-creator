import React, { forwardRef, useImperativeHandle } from "react";

export default forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    testFunc: () => {
      console.log("testFunc Education & experiences called!");
    }
  }));

  return (
    <div>
      <h2>Experiences and educations</h2>
    </div>
  );
});
