import Link from "next/link";

const HomePage = () => {
  return (
    <div className="columns">
      <div className="left-column">
        <div className="book-filter">
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
        <div className="book-filter">
          <h3>Review</h3>
          <form>
            <label>
              <input type="checkbox" name="filter1" value="1" />
              has review
            </label>
          </form>
        </div>
        <div>
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

      <div className="right-column">
        {" "}
        <div className="card">Card content</div>
        <div className="card">Card content</div> <div className="card">Card content</div>
        <div className="card">Card content</div> <div className="card">Card content</div>
        <div className="card">Card content</div>
      </div>
    </div>
  );
};

export default HomePage;
