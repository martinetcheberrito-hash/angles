
import { GoogleGenAI, Type } from "@google/genai";
import { ProductData, GenerationResult } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

export const generateCampaign = async (product: ProductData): Promise<GenerationResult> => {
  /* Initializing GoogleGenAI with the required named parameter and direct process.env.API_KEY reference */
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const imageParts = product.images.map(img => ({
    inlineData: {
      data: img.split(',')[1],
      mimeType: 'image/jpeg'
    }
  }));

  const textPart = {
    text: `
      Product Name: ${product.name}
      Description: ${product.description}
      Price: ${product.price || 'N/A'}
      Target Audience: ${product.targetAudience || 'General E-commerce shoppers'}
      
      Generate the communication angles and 5 ad variations based on the provided winning hook strategies.
    `
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: [...imageParts, textPart] },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          angles: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                logic: { type: Type.STRING },
                psychologicalTrigger: { type: Type.STRING }
              },
              required: ["title", "logic", "psychologicalTrigger"]
            }
          },
          ads: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                hookType: { type: Type.STRING },
                headline: { type: Type.STRING },
                bodyCopy: { type: Type.STRING },
                visualScript: { type: Type.STRING },
                callToAction: { type: Type.STRING }
              },
              required: ["id", "hookType", "headline", "bodyCopy", "visualScript", "callToAction"]
            }
          }
        },
        required: ["angles", "ads"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as GenerationResult;
};
