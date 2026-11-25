# Cotización de criptomonedas

Aplicación web hecha con React, TypeScript y Vite para consultar precios de criptomonedas en CoinGecko.

## Requisitos

- Node.js y npm instalados.

## Instalación

Desde la carpeta del proyecto, instala las dependencias:

```bash
npm install
```

## Ejecutar la aplicación

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre en el navegador la dirección que indique Vite en la terminal.

Para generar una versión de producción:

```bash
npm run build
```

## Datos de CoinGecko y transformación

El servicio `src/services/cripto.ts` consulta el endpoint Simple Price de CoinGecko:

```text
https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd
```

CoinGecko devuelve un objeto cuyas claves son los identificadores de las criptomonedas y cuyos valores contienen el precio por moneda solicitada:

```json
{
  "bitcoin": {
    "usd": 123456
  }
}
```

El servicio convierte ese formato a una lista que usa la aplicación:

```json
[
  {
    "id": "bitcoin",
    "price": [
      {
        "id": "usd",
        "value": 123456
      }
    ]
  }
]
```

La función `searchData` devuelve un objeto con un `status`:

- `exito`: la consulta tuvo datos; incluye `data` con la lista transformada.
- `sinResultados`: CoinGecko respondió correctamente, pero no devolvió datos.
- `error`: hubo un error HTTP u otro problema durante la consulta.

## Ejecutar las pruebas

Ejecuta todas las pruebas una vez, sin modo interactivo:

```bash
npm test -- --run
```

Las pruebas de componentes están en `src/pages/Home/home.test.tsx` y `src/components/Favorites/Favorites.test.tsx`. La prueba del servicio está en `src/services/cripto.test.ts`. Simulan las respuestas de la API, así que no hacen solicitudes reales a CoinGecko.

Para ejecutar solo las pruebas del servicio:

```bash
npm test -- --run src/services/cripto.test.ts
```

## Tecnologías

- React y TypeScript
- Vite
- CoinGecko Simple Price API
- Vitest y React Testing Library
- Zustand para guardar favoritos
