import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        // Fallback to NEXT_PUBLIC just in case the user hasn't updated their env yet,
        // but ideally they should use GOOGLE_API_KEY going forward to keep it secure.
        const apiKey = process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

        if (!apiKey) {
            return new Response("No se configuró la API Key en el servidor. Por favor revisa el archivo .env.local", { status: 500 });
        }

        const { messages, systemInstruction } = await req.json();

        // Ensure we always have messages
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return new Response("Invalid messages payload", { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        // Use gemini-2.5-flash as it provides the most immediate, structured and capable responses for this type of agent
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: systemInstruction,
        });

        // Format history for Gemini SDK (excluding the very last user message which is sent directly)
        const history = messages.slice(0, -1).map((msg: any) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }]
        }));

        const userMessage = messages[messages.length - 1].content;

        const chat = model.startChat({ history });
        const result = await chat.sendMessageStream(userMessage);

        const encoder = new TextEncoder();

        // Create a ReadableStream from the generator
        const readable = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result.stream) {
                        if (chunk.text) {
                            controller.enqueue(encoder.encode(chunk.text()));
                        }
                    }
                } catch (streamError) {
                    console.error("Stream generation error:", streamError);
                    controller.error(streamError);
                } finally {
                    controller.close();
                }
            }
        });

        return new Response(readable, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });

    } catch (error: any) {
        console.error("API Route Chat Error:", error);
        return new Response(error.message || "Error procesando la solicitud localmente.", { status: 500 });
    }
}
