import React from "react";

const search = () => {
  return (
    <div>
      <input
        name=""
        data-test="search-textarea"
        // value="search"
        id="search-textarea"
        cols="30"
        rows="1"
      ></input>
      <button data-test="search-submit">search</button>
    </div>
  );
};

export default search;
