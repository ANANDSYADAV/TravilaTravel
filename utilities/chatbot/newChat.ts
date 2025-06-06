import { travelKeywords } from "../keywords/travelKeyWords";
import { explicitKeywords } from "../keywords/expliciteKeyWords";
// import { envVariables } from "../../env";

const apiKey: string | undefined = process.env.GEMINI_API_KEY;
const geminiBaseUrl: string | undefined = process.env.GEMINI_BASE_URL;
const url: string = `${geminiBaseUrl}?key=${apiKey}`;

async function getTravelInfo(query: string): Promise<string> {
  // Check if the query contains explicit keywords
  const containsExplicitKeywords: boolean = explicitKeywords.some((keyword) =>
    query.toLowerCase().includes(keyword)
  );

  if (containsExplicitKeywords) {
    return "I am not allowed to answer explicit queries!";
  }

  // Check for relevant keywords in query
  const isTravelRelated: boolean = travelKeywords.some((keyword) =>
    query.toLowerCase().includes(keyword)
  );

  if (!isTravelRelated) {
    return "I can only answer travel related questions!";
  }
  const data = {
    contents: [
      {
        parts: [
          {
            text: `You are a travel chatbot and now reply me for the question concisely in under 50 words: ${query}`,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
      temperature: 0.5,
    },
  };

  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Fetch error details if available
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${JSON.stringify(
          errorData
        )}`
      );
    }

    const responseData = await response.json();

    if (
      responseData.candidates &&
      responseData.candidates[0]?.content?.parts[0]?.text
    ) {
      return responseData?.candidates?.[0]?.content?.parts?.[0]?.text;
    } else {
      return "Sorry, I couldn't get a response.";
    }
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred."; // Return a user-friendly error message
  }
}

export default getTravelInfo;
