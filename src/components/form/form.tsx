import { useState } from "react";
import { searchSchema, type SearchFormData } from "../../schemas/searchSchema";

interface FormProps {
  onSearch: (data: SearchFormData) => void;
  isSubmitting: boolean;
}

function Form({ onSearch, isSubmitting }: FormProps) {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("usd");
  

  const [error, setError] = useState<{
    search?: string;
    currency?: string;
  }>({});

  const searchHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = searchSchema.safeParse({
      search,
      currency,
    });

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;

      setError({
        search: fieldErrors.search?.[0],
        currency: fieldErrors.currency?.[0],
      });

      return;
    }

    setError({});
    
    onSearch(validation.data);
  };

  return (
    <section className="search-section">
      <h2>Consultar precios</h2>
      <p>Los valores provienen directamente de CoinGecko.</p>

      <form id="search-form" className="search-form" onSubmit={searchHandler}>
        <div className="search-form-field">
          <label htmlFor="search">Criptomoneda</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Ej.: bitcoin, ethereum"
            autoComplete="off"
            aria-invalid={Boolean(error.search)}
            aria-describedby={error.search ? "search-error" : undefined}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {error.search && (
            <p className="search-form-error" id="search-error">
              {error.search}
            </p>
          )}
        </div>

        <div className="search-form-field">
          <label htmlFor="currency">Moneda</label>
          <select
            id="currency"
            name="currency"
            aria-invalid={Boolean(error.currency)}
            aria-describedby={error.currency ? "currency-error" : undefined}
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="ars">ARS</option>
          </select>

          {error.currency && (
            <p className="search-form-error" id="currency-error">
              {error.currency}
            </p>
          )}
        </div>

        <button type="submit" className="search-form-button" disabled={isSubmitting}>
          {isSubmitting ? "Consultando..." : "Consultar cotizaciones"}
        </button>
      </form>
    </section>
  );
}

export default Form;