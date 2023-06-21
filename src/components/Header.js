function Header() {
  const currentDate = new Date();
  const day = currentDate.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <header>
      {/* insert logo */}
      <img src="#" />
      <nav>
        <ul>
          {/* <li>Login</li> */}
          <li>About</li>
          <li>Timeline</li>
        </ul>
      </nav>

      <h1>Giphy Sentiments</h1>
      <h2>Happy {day}</h2>
    </header>
  );
}

export default Header;
