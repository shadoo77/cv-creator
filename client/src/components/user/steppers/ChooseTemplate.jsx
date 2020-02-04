import React, { forwardRef, useImperativeHandle } from "react";

export default forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    testFunc: () => {
      console.log("testFunc Choose template !");
    }
  }));

  return (
    <div>
      <h2>Choose template</h2>
    </div>
  );
});
