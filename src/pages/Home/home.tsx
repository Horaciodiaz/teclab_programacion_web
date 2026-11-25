import { useState } from "react";

import Form from "../../components/form/form";
import Results from "../../components/results/results";
import QueryState from "../../components/querystate/querystate";

import searchData, { type Crypto } from "../../services/cripto";
import type { SearchFormData } from "../../schemas/searchSchema";
import { useFavorites } from "../../store/favoriteCoin";
import Favorite from "../../components/Favorites/Favorites";

const states: Record<string, string> = {
  inicial: "Todavía no se realizó una consulta.",
  enCurso: "La solicitud está en curso.",
  sinResultados: "La solicitud fue correcta, pero no produjo resultados.",
  exito: "La consulta finalizó y existen datos para mostrar.",
  error: "La solicitud no pudo completarse.",
};

interface HomeProps{
  results: Crypto[] | undefined;
  setResults: (p: Crypto[] | undefined) => void;
  estado: string;
  setEstado: (p: string) => void;
}

function Home({results, setResults, estado, setEstado}: HomeProps) {
  // const [results, setResults] = useState<Crypto[] | undefined>(undefined);
  // const [estado, setEstado] = useState(states.inicial);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const favorites = useFavorites((state) => (state as { list: string[] }).list);

  const handleSearch = async (formData: SearchFormData) => {
    setIsSubmitting(true);
    setEstado(states.enCurso);

    const response = await searchData(formData.search, formData.currency);

    setEstado(states[response.status] ?? states.error);
    setResults(response.data);
    setIsSubmitting(false);
  };

  return (
    <>
      <p>Monedas digitales</p>
      <h1>Cotización de criptomonedas</h1>
      <p>Obtén el valor actual de las criptomonedas.</p>

      <Form onSearch={handleSearch} isSubmitting={isSubmitting} />

      <QueryState state={estado} />

      {favorites.length ? <section className="results-section">
        <h3>Favoritos (cantidad: {favorites.length})</h3>
        <div id="search-results">
        {favorites.map((item) => <Favorite key={"fav"+item} coin={item} />)}
        </div>
      </section> : ""}

      {results && Object.keys(results).length > 0 && (
        <Results results={results} />
      )}
    </>
  );
}

export default Home;
