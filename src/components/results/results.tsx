import type { Crypto } from "../../services/cripto";
import Card from "../card/card";

interface ResultsProps {
  results: Crypto[];
}


function Results(list: ResultsProps) {
  // const crypto = Object.values(list.results)[0];
  const currency = list.results.map((item: Crypto) => item.price[0].id);
  return (
    <section className="results-section">
      <p>Resultados de la busqueda</p>
      <div className="result-title">
        <h2>Precios actuales</h2>
        <p>Moneda: {currency[0].toUpperCase()}</p>
      </div>
      <div id="search-results">
        {list.results.map((item: Crypto) => {
          return <Card key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
}

export default Results;
