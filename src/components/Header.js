import { Link, Route, Routes } from "react-router-dom";

function Header() {
  const currentDate = new Date();
  const day = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  return (
    <header>
      <nav>
        <ul className="navLinks">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About </Link>
          </li>
          <li>
            <Link className="link" to="/timeline">Timeline</Link>
          </li>
        </ul>
      </nav>

      <h1>Giphy Sentiments</h1>
      <h2> Happy {day}! </h2>
    </header>
  );
}

export default Header;
