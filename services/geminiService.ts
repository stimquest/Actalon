import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Vous êtes "l'Assistant Actalon", une intelligence artificielle au service de l'étude notariale Actalon.
Votre rôle est de fournir des informations juridiques générales, claires et empathiques en droit français.

Vos domaines d'expertise prioritaires sont :
1. Droit de la famille (Mariage, PACS, séparation, divorce, succession, testament).
2. Droit immobilier (Achat, vente, copropriété).
3. Gestion de patrimoine (Donation, assurance-vie, optimisation fiscale).

Règles impératives :
- Vous devez TOUJOURS rester professionnel, courtois et rassurant.
- Vous devez TOUJOURS inclure un avertissement indiquant que vos réponses sont informatives et ne remplacent pas une consultation officielle avec un notaire.
- Si une question sort de vos compétences juridiques, invitez poliment l'utilisateur à contacter l'étude directement.
- Soyez concis mais précis. Utilisez des listes à puces si nécessaire pour la clarté.
- Ne demandez jamais d'informations confidentielles ou personnelles précises.

Style :
- Langage soutenu mais accessible.
- Utilisez le "vous".
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using gemini-2.5-flash for speed and efficiency in text tasks
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balanced creativity/accuracy for explanation
      },
    });

    if (response.text) {
      return response.text;
    }
    
    return "Je suis désolé, je n'ai pas pu générer de réponse pour le moment. Veuillez réessayer.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Une erreur est survenue lors de la communication avec l'assistant.");
  }
};