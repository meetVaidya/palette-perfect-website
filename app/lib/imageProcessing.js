import { GoogleGenerativeAI } from "@google/generative-ai";

// Use environment variable for API key
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 0.4,
    topP: 1,
    topK: 32,
    maxOutputTokens: 1024,
};

async function fetchImageAsBase64(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer).toString('base64');
}

export async function processImage(imageUrl) {
    try {
        console.log("Fetching image from URL:", imageUrl);
        const base64Image = await fetchImageAsBase64(imageUrl);
        console.log("Image fetched and converted to base64 successfully. Length:", base64Image.length);

        const prompt = `Analyze the image and provide the hex color codes for skin, hair, and eye color. 
        Return the result in JSON format with keys "skin", "hair", and "eye". 
        For example: {"skin": "#F5D5C5", "hair": "#3B3024", "eye": "#7B3F00"}`;

        console.log("Sending request to Gemini 1.5 Flash");
        const result = await model.generateContent({
            contents: [
                {
                    parts: [
                        {
                            inlineData: {
                                mimeType: "image/jpeg",
                                data: base64Image
                            }
                        },
                        { text: prompt }
                    ]
                }
            ],
            generationConfig,
        });

        const response = await result.response;
        const responseText = await response.text();
        console.log("Raw response:", responseText);

        // Parse the JSON response
        try {
            // Remove potential markdown code block syntax
            const jsonString = responseText.replace(/```json\n|\n```/g, '').trim();
            const colorData = JSON.parse(jsonString);
            console.log("Parsed color data:", colorData);
            return colorData;
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            throw new Error("Failed to parse color data from Gemini response");
        }
    } catch (error) {
        console.error("An error occurred during image processing:", error);
        throw error;
    }
}