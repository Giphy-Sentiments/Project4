import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const currentDate = new Date();
  const day = currentDate.toLocaleDateString("en-US", { weekday: "long" });

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="wrapper">
      <header>
        <nav>
          <div
            className={`menu-toggle ${showMenu ? "active" : ""}`}
            onClick={handleMenuToggle}
          >
            <div className="hamburger"></div>
          </div>
          <ul className={`navLinks ${showMenu ? "active" : ""}`}>
            <li>
              <Link className="links" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="links" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="links" to="/timeline">
                Timeline
              </Link>
            </li>
          </ul>
        </nav>

        <h1>Giphy Sentiments</h1>
        <h2>Happy {day}!</h2>
      </header>
    </div>
  );
}

export default Header;
