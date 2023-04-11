import React from "react";

const bookFilter = () => {
  return (
    <div className="left-column">
      <div className="filter-container">
        <div className="filter-option">
          <h3>Genre</h3>
          <form>
            <label>
              <input type="checkbox" name="filter1" value="1" />
              Filter 1
            </label>
            <label>
              <input type="checkbox" name="filter2" value="2" />
              Filter 2
            </label>
            <label>
              <input type="checkbox" name="filter3" value="3" />
              Filter 3
            </label>
          </form>
        </div>
        <div className="filter-option">
          <h3>Review</h3>
          <form>
            <label>
              <input type="checkbox" name="filter1" value="1" />
              has review
            </label>
          </form>
        </div>
        <div className="filter-option">
          <h3>Rating</h3>
          <form>
            <label>
              <input type="checkbox" name="filter1" value="1" />
              Filter 1
            </label>
            <label>
              <input type="checkbox" name="filter2" value="2" />
              Filter 2
            </label>
            <label>
              <input type="checkbox" name="filter3" value="3" />
              Filter 3
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default bookFilter;
