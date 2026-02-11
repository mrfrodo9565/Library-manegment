
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI client following strict guidelines for API key usage.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBookSummary = async (bookTitle: string, author: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a professional summary of '${bookTitle}' by ${author}. 
      Also, suggest a 'Security Classification' (1-5) based on the rarity and content sensitive nature of such a work.`,
      config: { temperature: 0.3 }
    });
    return response.text || "Summary unavailable.";
  } catch (error) {
    return "Analysis offline.";
  }
};

export const getSecurityAssessment = async (logs: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze these library security logs for anomalies: ${JSON.stringify(logs)}. 
      Return a one-sentence "Risk Status" and 2 key security recommendations.`,
      config: { temperature: 0.1 }
    });
    return response.text || "Security Core Silent.";
  } catch (error) {
    return "Assessment unavailable.";
  }
};

export const getLibraryInsights = async (stats: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Librarian Insight for stats: ${JSON.stringify(stats)}. Include a note on 'Trust-Based Circulation'.`,
      config: { temperature: 0.2 }
    });
    return response.text || "Insights pending.";
  } catch (error) {
    return "Digital Librarian insights are unavailable.";
  }
};

// Fix: Implemented missing analyzeSecurityFrame function for visual security auditing.
export const analyzeSecurityFrame = async (base64Image: string, context: string) => {
  try {
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image,
      },
    };
    const textPart = {
      text: `Perform a high-security visual audit of this CCTV frame in the context of: ${context}. 
      Identify potential threats, unauthorized personnel, or protocol breaches. 
      Be concise and professional.`
    };
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: [imagePart, textPart] },
    });
    return response.text || "Vision systems compromised.";
  } catch (error) {
    return "Neural vision offline.";
  }
};

// Fix: Implemented missing getExecutiveBriefing function for high-level security status reports.
export const getExecutiveBriefing = async (incidents: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a high-level executive briefing based on these security incidents: ${JSON.stringify(incidents)}. 
      Focus on overall security posture and critical warnings. Keep it under 3 sentences.`,
      config: { temperature: 0.4 }
    });
    return response.text || "Briefing unavailable.";
  } catch (error) {
    return "Intelligence feed disrupted.";
  }
};
