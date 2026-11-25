import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <p className="not-found-code">404</p>
      <h1>Página no encontrada</h1>
      <p>La dirección que buscas no existe o fue movida.</p>
      <Link className="not-found-link" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFound;