import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
    },
});

const systemInstruction = "You are a professional seasonal color analyst who can determine the color palette based on the hex color provided to you for hair, skin and eye. Your answer is pitch perfect and you are confident about it.";

export async function analyzeColorPalette(skinTone, eyeTone, hairColor) {
    try {
        const prompt = `My skin tone is ${skinTone}. Eye tone is ${eyeTone} and my hair is ${hairColor}. Which skin color palette am I? In terms of spring, summer, fall, winter.`;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: systemInstruction }, { text: prompt }] }],
        });

        const response = await result.response;
        const analysisText = response.text();

        // Extract the season from the analysis
        const seasonMatch = analysisText.match(/\b(Spring|Summer|Fall|Winter)\b/i);
        const season = seasonMatch ? seasonMatch[0] : "Unknown";

        return {
            season,
            fullAnalysis: analysisText,
        };
    } catch (error) {
        console.error("Error in color palette analysis:", error);
        throw new Error("Failed to analyze color palette");
    }
}