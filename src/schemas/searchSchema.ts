import { z } from "zod";

export const searchSchema = z.object({
    search: z
        .string()
        .trim()
        .min(2, "Ingresá al menos 2 caracterers"),
        currency: z.enum(["usd", "eur", "ars"], {
        error: "Seleccioná una moneda válida"
    })
})

export type SearchFormData = z.infer<typeof searchSchema>;