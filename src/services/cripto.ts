export interface CriptoPrice {
    [currency: string]: number;
}

export interface Price {
    id: string;
    value: number;
}

export interface Crypto {
    id: string;
    price: Price[];
}

export interface SearchResponse {
    status: string,
    data?: Crypto[]
}


const searchData = async (search: string, currency: string): Promise<SearchResponse> => {
    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${search}&vs_currencies=${currency}`
        );

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: Record<string, CriptoPrice> = await response.json();

        if (Object.keys(data).length === 0) {
            return { status: "sinResultados" };
        }

        //transformar Data

        const criptos: Crypto[] = Object.entries(data).map(([id, prices]) => ({
            id,
            price: Object.entries(prices).map(([currency, value]) => ({
                id: currency,
                value
            }))
        }))

        return {
            status: "exito",
            data: criptos
        };

    } catch (error) {
        console.error(error);

        return { status: "error" };
    }
};

export default searchData;