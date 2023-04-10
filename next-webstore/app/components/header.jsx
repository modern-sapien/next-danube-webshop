import Link from "next/link";
import Search from "./search"

const header = () => {
  return (
    <header className="header">
        <div className="logo">
          <Link rel="stylesheet" href="/">
            next danube
          </Link>
        </div>

<div>
<input name="" data-test="search-textarea" 
// value="search" 
id="search-textarea" cols="30" rows="1" ></input>
  <button data-test="search-submit">search</button>
</div>


      <div className="links">
        <Link href="/user">login</Link>
        <Link href="/book">signup</Link>
        <Link href="/review">reviews</Link>
        <Link href="/review">cart</Link>
      </div>
    </header>
  );
};

export default header;
