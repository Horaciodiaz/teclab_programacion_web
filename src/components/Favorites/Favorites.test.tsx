
import { MemoryRouter } from "react-router-dom";

import Favorite from "./Favorites";
import { useFavorites } from "../../store/favoriteCoin";

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

afterEach(() => {
  cleanup();
  useFavorites.persist.clearStorage();
});

describe("Favorite component", () => {
  beforeEach(() => {
    useFavorites.setState({ list: [] });
  });

  const renderFavorite = (coin = "bitcoin") =>
    render(
      <MemoryRouter>
        <Favorite coin={coin} />
      </MemoryRouter>
    );

  it("muestra el estado vacío inicialmente", () => {
    renderFavorite();

    expect(
      screen.getByRole("button", { name: "Agregar a favoritos" })
    ).toBeInTheDocument();

    expect(screen.getByText("☆")).toBeInTheDocument();
  });

  it("agrega una moneda al hacer clic", () => {
    renderFavorite();

    fireEvent.click(
      screen.getByRole("button", { name: "Agregar a favoritos" })
    );

    expect(useFavorites.getState().list).toContain("bitcoin");

    expect(
      screen.getByRole("button", { name: "Quitar de favoritos" })
    ).toBeInTheDocument();
  });

  it("quita una moneda al hacer clic", () => {
    useFavorites.setState({ list: ["bitcoin"] });

    renderFavorite();

    fireEvent.click(
      screen.getByRole("button", { name: "Quitar de favoritos" })
    );

    expect(useFavorites.getState().list).not.toContain("bitcoin");

    expect(
      screen.getByRole("button", { name: "Agregar a favoritos" })
    ).toBeInTheDocument();
  });

  it("muestra el enlace a la página de detalles", () => {
    renderFavorite("ethereum");

    expect(
      screen.getByRole("link", { name: "Ver detalles" })
    ).toHaveAttribute("href", "/criptomonedas/ethereum");
  });
});