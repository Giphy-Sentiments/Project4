import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const currentDate = new Date();
  const day = currentDate.toLocaleDateString("en-US", { weekday: "long" });

  const [showMenu, setShowMenu] = useState(false);

  const [isToggled, setIsToggled] = useState(false);

  const handleMenuToggle = () => {
    setIsToggled((prevState) => !prevState);
    setShowMenu((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
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
            className={`menu-toggle ${isToggled ? "open" : ""}`}
            onClick={handleMenuToggle}
          >
            <div className="hamburger"></div>
            <div className="hamburger"></div>
            <div className="hamburger"></div>
          </div>
          <ul className={`navLinks ${showMenu ? "active" : ""}`}>
            <li>
              <Link className="links" to="/" onClick={handleMenuToggle}>
                Home
              </Link>
            </li>
            <li>
              <Link className="links" to="/about" onClick={handleMenuToggle}>
                About
              </Link>
            </li>
            <li>
              <Link className="links" to="/timeline" onClick={handleMenuToggle}>
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
