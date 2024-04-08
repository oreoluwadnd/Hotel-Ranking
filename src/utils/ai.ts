import { toast } from "sonner";
import { OpenAI } from "@langchain/openai";
import { CitiesSchema, getPrompt, valuesType } from "./schema";

function model() {
  return new OpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
    timeout: 100000,
    cache: true,
    maxTokens: -1,
    openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
}

export const getCloseCity = async (prompt: valuesType) => {
  const input = await getPrompt(prompt);
  const result = await model().invoke(input);
  try {
    const parsed = CitiesSchema.parse(result);
    return parsed;
  } catch (error) {
    toast.error("An error occured generating courses");
  }
};
