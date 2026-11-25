import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import searchData from "./cripto";

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("searchData", () => {
  it("devuelve datos transformados ante una respuesta exitosa", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({
          bitcoin: {
            usd: 123456,
          },
        }),
      }),
    );

    const result = await searchData("bitcoin", "usd");

    expect(fetch).toHaveBeenCalledWith(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
    );

    expect(result).toEqual({
      status: "exito",
      data: [
        {
          id: "bitcoin",
          price: [
            {
              id: "usd",
              value: 123456,
            },
          ],
        },
      ],
    });
  });

  it("devuelve error ante una respuesta HTTP fallida", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
      }),
    );

    const result = await searchData("bitcoin", "usd");

    expect(result).toEqual({ status: "error" });
  });

  it("devuelve sinResultados ante una respuesta vacía", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({}),
      }),
    );

    const result = await searchData("bitcoin", "usd");

    expect(result).toEqual({ status: "sinResultados" });
  });
});