import { Link } from "react-router-dom";
import type { Crypto } from "../../services/cripto";
import { useFavorites } from "../../store/favoriteCoin";

function Card(coin: Crypto) {
  const isFavorite = useFavorites((state) =>
    (state as { list: string[] }).list.includes(coin.id),
  );

  const toggle = useFavorites(
    (state) => (state as { toggle: (coin: string) => void }).toggle,
  );

  return (
    <article className="card">
      <h3>
        <button
          type="button"
          className="favorite"
          onClick={() => toggle(coin.id)}
          aria-label={
            isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
          }
        >
          {isFavorite ? "★" : "☆"}
        </button>{" "}
        {coin.id}
      </h3>
      {coin.price.map((value) => (
        <p>$ {value.value}</p>
      ))}

      <Link className="button" to={`/criptomonedas/${coin.id}`}>
        Ver detalles
      </Link>
    </article>
  );
}

export default Card;
