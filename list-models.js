const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "AIzaSyBVLpd2SSjc8kbvfiFNaF9HvhcmHOHhpfs";
async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        const models = data.models.map(m => m.name);
        console.log("Available models:", models);
    } catch (e) {
        console.error(e);
    }
}
listModels();
