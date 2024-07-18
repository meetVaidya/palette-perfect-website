import { processImage } from '../../lib/imageProcessing';
import { analyzeColorPalette } from '../../lib/colorAnalysisProcessor';

export async function POST(request) {
    const { imageUrl } = await request.json();

    try {
        const colorData = await processImage(imageUrl);

        // Analyze the color palette
        const { season, fullAnalysis } = await analyzeColorPalette(
            colorData.skin,
            colorData.eye,
            colorData.hair
        );

        return new Response(JSON.stringify({
            ...colorData,
            season,
            fullAnalysis
        }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        console.error("Error processing image:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
}