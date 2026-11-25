import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Home from "./home";
import searchData from "../../services/cripto";
import { useFavorites } from "../../store/favoriteCoin";

import { useState } from "react";
import { type Crypto } from "../../services/cripto";

vi.mock("../../services/cripto", () => ({
  default: vi.fn(),
}));

afterEach(() => {
  cleanup();
  useFavorites.setState({ list: [] });
  vi.clearAllMocks();
});

function HomeWrapper() {
  const [results, setResults] = useState<Crypto[] | undefined>(undefined);
  const [estado, setEstado] = useState(
    "Todavía no se realizó una consulta.",
  );

  return (
    <Home
      results={results}
      setResults={setResults}
      estado={estado}
      setEstado={setEstado}
    />
  );
}

function renderHome() {
  render(
    <MemoryRouter>
      <HomeWrapper />
    </MemoryRouter>,
  );
}

describe("Home", () => {
  it("muestra resultados después de una consulta exitosa", async () => {
    vi.mocked(searchData).mockResolvedValue({
      status: "exito",
      data: [
        {
          id: "bitcoin",
          price: [{ id: "usd", value: 123456 }],
        },
      ],
    });

    renderHome();

    fireEvent.change(screen.getByRole("textbox", { name: "Criptomoneda" }), {
      target: { value: "bitcoin" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Consultar cotizaciones" }),
    );

    expect(
      await screen.findByText(
        "La consulta finalizó y existen datos para mostrar.",
      ),
    ).toBeInTheDocument();

    expect(screen.getByText("bitcoin")).toBeInTheDocument();
    expect(screen.getByText("$ 123456")).toBeInTheDocument();
  });

  it("muestra un mensaje cuando no hay datos", async () => {
    vi.mocked(searchData).mockResolvedValue({
      status: "sinResultados",
    });

    renderHome();

    fireEvent.change(screen.getByRole("textbox", { name: "Criptomoneda" }), {
      target: { value: "moneda-inexistente" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Consultar cotizaciones" }),
    );

    expect(
      await screen.findByText(
        "La solicitud fue correcta, pero no produjo resultados.",
      ),
    ).toBeInTheDocument();
  });

  it("muestra el error y permite consultar nuevamente", async () => {
    vi.mocked(searchData)
      .mockResolvedValueOnce({ status: "error" })
      .mockResolvedValueOnce({
        status: "exito",
        data: [
          {
            id: "ethereum",
            price: [{ id: "usd", value: 3500 }],
          },
        ],
      });

    renderHome();

    fireEvent.change(screen.getByRole("textbox", { name: "Criptomoneda" }), {
      target: { value: "ethereum" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Consultar cotizaciones" }),
    );

    expect(
      await screen.findByText("La solicitud no pudo completarse."),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Consultar cotizaciones" }),
    );

    await waitFor(() => {
      expect(screen.getByText("ethereum")).toBeInTheDocument();
    });
  });
});
