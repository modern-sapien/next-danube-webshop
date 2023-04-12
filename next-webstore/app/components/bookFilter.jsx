import React from "react";

const bookFilter = () => {
  return (
    <div className="left-column">
      <div className="filter-container">
        <div className="filter-option">
          <h3>Genre</h3>
          <form data-test="book-filter-genre">
            <label>
              <input type="checkbox" name="filter1" value="1" />
              Romance
            </label>
            <label>
              <input type="checkbox" name="filter2" value="2" />
              Sci-Fi
            </label>
            <label>
              <input type="checkbox" name="filter3" value="3" />
              Fantasy
            </label>
            <label>
              <input type="checkbox" name="filter4" value="4" />
              Nicholas Cage
            </label>
            <label>
              <input type="checkbox" name="history" value="4" />
              History
            </label>
          </form>
        </div>
        <div className="filter-option">
          <h3>Review</h3>
          <form data-test="book-filter-review">
            <label>
              <input type="checkbox" name="filter1" value="1" />
              has reviews
            </label>
          </form>
        </div>
        <div className="filter-option">
          <h3>Rating</h3>
          <form data-test="book-filter-review">
            <label>
              <input type="checkbox" name="filter1" value="5" />
              5 stars
            </label>
            <label>
              <input type="checkbox" name="filter2" value="4" />
              4 stars
            </label>
            <label>
              <input type="checkbox" name="filter3" value="3" />
              3 stars
            </label>
            <label>
              <input type="checkbox" name="filter3" value="2" />
              2 stars
            </label>
            <label>
              <input type="checkbox" name="filter3" value="1" />
              1 star
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default bookFilter;
