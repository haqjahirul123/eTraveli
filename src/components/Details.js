import React from "react";

const Details = ({item}) => {
  return (
    <div className="mt-5">
      <h4 className="mb-4">{item?.fields?.title}</h4>
      <p>
      {item?.fields?.opening_crawl}
      </p>
      <p className="mt-4">
        <b>Directed by</b> : {item?.fields?.director}
      </p>
    </div>
  );
};

export default Details;
