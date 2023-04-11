import Link from "next/link";
import Search from "./search";

const header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link rel="stylesheet" href="/">
          next danube
        </Link>
      </div>

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

      <div className="links">
        <Link href="/login">login</Link>
        <Link href="/cart">cart</Link>
        <Link href="/user">account</Link>
      </div>
    </header>
  );
};

export default header;
