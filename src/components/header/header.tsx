import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-link">
        <span className="header-link-icon">CB</span>
        <span className="header-link-name">Cripto Bros</span>
      </Link>
      <p className="header-description">Cotización actual de criptomonedas</p>
    </header>
  );
}

export default Header;
