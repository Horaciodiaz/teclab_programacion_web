import "./App.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import CriptoDetail from "./pages/CriptoDetail/criptoDetail";
import NotFound from "./pages/NotFound/notFound";
import { useState } from "react";
import { type Crypto } from "./services/cripto";

function App() {
  const [results, setResults] = useState<Crypto[] | undefined>(undefined);
  const [estado, setEstado] = useState("Todavía no se realizó una consulta.");
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                results={results}
                setResults={setResults}
                estado={estado}
                setEstado={setEstado}
              />
            }
          />
          <Route path="/criptomonedas/:id" element={<CriptoDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
