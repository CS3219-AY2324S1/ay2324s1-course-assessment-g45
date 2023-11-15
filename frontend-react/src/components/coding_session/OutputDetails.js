import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <>
    {
      outputDetails.status.id === 3
       &&
      <div>
        <i className="text-sm px-3">
          Memory:{" "} <span> {outputDetails?.memory} </span>
        </i>
        <i className="text-sm px-3">
          Time:{" "} <span> {outputDetails?.time} </span>
        </i>
      </div>
    }
    </>
  );
};

export default OutputDetails;