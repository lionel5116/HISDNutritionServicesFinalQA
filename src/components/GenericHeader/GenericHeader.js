import React from "react";

const GenericHeader = ({ headertext }) => {
  return (
    <div className="GenericHeader">
      <h2>{headertext}</h2>
    </div>
  );
};

GenericHeader.defaultProps = {};

export default GenericHeader;
