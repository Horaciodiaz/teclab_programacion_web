import { Link } from "react-router-dom";
import { useFavorites } from "../../store/favoriteCoin";

function Favorite({ coin }: { coin: string }) {
  const isFavorite = useFavorites((state) =>
    (state as { list: string[] }).list.includes(coin),
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
          onClick={() => toggle(coin)}
          aria-label={
            isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
          }
        >
          {isFavorite ? "★" : "☆"}
        </button>{" "}
        {coin}
      </h3>
      {/* {coin.price.map((value) => <p>$ {value.value}</p>)} */}

      <Link className="button" to={`/criptomonedas/${coin}`}>
        Ver detalles
      </Link>
    </article>
  );
}

export default Favorite;
