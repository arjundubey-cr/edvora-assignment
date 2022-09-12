import React from "react";

const Card = ({ data, heading }) => {
  return (
    <div className="p-8 border border-gray-100 shadow-xl rounded-xl">
      <h5 className="mt-4 text-xl font-bold text-gray-900">{heading}</h5>
      <p className="hidden mt-2 text-sm sm:block">{data}</p>
    </div>
  );
};

export default Card;
