import { Link, Route, Routes } from "react-router-dom";

function Header() {
  const currentDate = new Date();
  const day = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  return (
    <div className="wrapper">
      <header>
        <nav>
          <ul className="navLinks">
            <li>
              <Link className="links" to="/">Home</Link>
            </li>
            <li>
              <Link className="links" to="/about">About </Link>
            </li>
            <li>
              <Link className="links" to="/timeline">Timeline</Link>
            </li>
          </ul>
        </nav>

        <h1>Giphy Sentiments</h1>
        <h2> Happy {day}! </h2>
      </header>  
    </div>
    
  );
}

export default Header;
