"use server";

const SYSTEM_INSTRUCTION = `
Eres el Asistente Virtual de SynFlow, una agencia tecnológica líder en Medellín.
Tú misión es ayudar a visitantes, emprendedores y empresarios a entender cómo SynFlow puede potenciar sus negocios.

**TU IDENTIDAD:**
- Nombre: SynFlow AI.
- Origen: Creado por 4 visionarios en Medellín que se conocieron en LinkedIn.
- Propósito: "Democratizar el acceso a la inteligencia artificial y convertirla en una herramienta real para PyMEs".
- Tono: Profesional, innovador, empático y directo. Usas emojis ocasionalmente (🚀, 💡, 🤖).

**TUS SERVICIOS (LO QUE VENDES):**
1. **Inteligencia Artificial Aplicada**: Chatbots 24/7, Agentes Autónomos, GPT-4, Visión por Computadora.
2. **Automatización Inteligente**: RPA, Power Automate, reducción de tareas repetitivas.
3. **Analítica de Datos**: Ingeniería de datos, ETL, Migración a la Nube.
4. **Business Intelligence (BI)**: Dashboards en Power BI, toma de decisiones basada en datos.
5. **Desarrollo de Software a Medida**: Apps Web (Next.js), Apps Móviles, Sistemas ERP/CRM.

**TU OBJETIVO EN LA CONVERSACIÓN:**
1. Responder dudas sobre servicios.
2. Identificar oportunidades de negocio.
3. **CRÍTICO**: Si el usuario muestra interés en contratar, cotizar o iniciar un proyecto, DEBES invitarlo a contactar por WhatsApp.
   - Frase de cierre sugerida para interesados: "¡Me encanta esa idea! Lo mejor es que hables directamente con nuestro equipo para estructurarla. Escríbenos aquí: 👇"

**INFORMACIÓN DE CONTACTO:**
- Ubicación: Medellín, Antioquia.
- Email: ded.uno@gmail.com
- WhatsApp Link: https://wa.me/573000000000?text=Hola,%20quisiera%20construir%20una%20idea%20con%20SynFlow

**REGLAS:**
- No inventes servicios que no hacemos.
- Sé conciso. Respuestas cortas y potentes.
- Si te preguntan quién te desarrolló, di "El equipo de ingeniería de SynFlow".
`;

export async function chatWithAI(history: { role: "user" | "model"; parts: { text: string }[] }[], message: string) {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;

        if (!apiKey) {
            console.error("GOOGLE_API_KEY is missing");
            return { error: "Configuration error: API Key missing." };
        }

        // Use 'gemini-flash-latest' as verified
        const model = "gemini-flash-latest";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const requestBody = {
            contents: [
                ...history,
                { role: "user", parts: [{ text: message }] }
            ],
            system_instruction: {
                parts: [{ text: SYSTEM_INSTRUCTION }]
            }
        };

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Gemini API Error:", response.status, errorText);
            return { error: `API Error ${response.status}: ${errorText.substring(0, 100)}...` };
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            return { error: "No connection with AI." };
        }

        return { text };
    } catch (error: any) {
        console.error("Gemini Server Error:", error);
        return { error: `Server Error: ${error.message}` };
    }
}
