import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import searchData, { type Crypto } from "../../services/cripto";
import { useFavorites } from "../../store/favoriteCoin";

function CriptoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<Crypto[] | null>(null);
  const [loading, setLoading] = useState(true);

  const isFavorite = useFavorites((state) =>
    (state as { list: string[] }).list.includes(id!),
  );

  const toggle = useFavorites(
    (state) => (state as { toggle: (coin: string) => void }).toggle,
  );

  useEffect(() => {
    async function getData() {
      if (!id) {
        setLoading(false);
        return;
      }

      const response = await searchData(id, "usd,ars,eur");
      setData(response.data ?? null);
      // console.log(response);
      setLoading(false);
    }

    void getData();
  }, [id]);

  return (
    <section className="crypto-detail">
      <button
        className="search-form-button"
        type="button"
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
      <h2>
        Detalle de {id ?? "criptomoneda"}{" "}
        <button
          type="button"
          className="favorite"
          onClick={() => toggle(id!)}
          aria-label={
            isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
          }
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </h2>

      {loading && <p>Cargando...</p>}
      {!loading && !data && <p>No hay datos disponibles.</p>}
      {data && (
        <table className="crypto-price-table">
          <thead>
            <tr>
              <th>Moneda</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) =>
              item.price.map((coin) => (
                <tr>
                  <td>{coin.id.toUpperCase()}</td>
                  <td>${coin.value}</td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default CriptoDetail;
