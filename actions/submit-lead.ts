"use server";

import { z } from "zod";

const LeadSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Correo electrónico inválido"),
});

export type FormState = {
    status: "idle" | "success" | "error";
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
    };
};

export async function submitLead(prevState: FormState, formData: FormData): Promise<FormState> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const validatedFields = LeadSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
    });

    if (!validatedFields.success) {
        return {
            status: "error",
            message: "Por favor revisa los campos.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // TODO: Here we will insert into Supabase once the project limit issue is resolved.
    // const { error } = await supabase.from('leads').insert({ ...validatedFields.data });

    // For now, we simulate success for SinFlow Pages
    console.log("Lead captured (Simulation):", validatedFields.data);

    return {
        status: "success",
        message: "¡Gracias! Tu solicitud ha sido recibida.",
    };
}
