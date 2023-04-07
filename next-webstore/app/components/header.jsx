import Link from "next/link";

const header = () => {
  return (
    <header className="header">
        <div className="logo">
          <Link rel="stylesheet" href="/">
            Home{" "}
          </Link>
        </div>

<div>
<textarea name="" data-test="search-textarea" 
// value="search" 
id="search-textarea" cols="30" rows="1" ></textarea>
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
