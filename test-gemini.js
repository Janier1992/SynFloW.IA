const apiKey = "AIzaSyAmGESviqSJm8Zo8--n2odh-XuXBz_EKd0";
async function test() {
    try {
        const model = "gemini-1.5-flash-latest"; // Let's test standard one first
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: "Hola" }] }] })
        });
        const data = await res.json();
        console.log("Response with 1.5-flash:", JSON.stringify(data).substring(0, 100));

        const model2 = "gemini-flash-latest"; // The one in code
        const url2 = `https://generativelanguage.googleapis.com/v1beta/models/${model2}:generateContent?key=${apiKey}`;
        const res2 = await fetch(url2, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: "Hola" }] }] })
        });
        const data2 = await res2.json();
        console.log("Response with flash-latest:", JSON.stringify(data2).substring(0, 100));
    } catch (e) {
        console.error(e);
    }
}
test();
