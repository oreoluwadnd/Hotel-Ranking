import { z } from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";

import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";

const city = z
  .string()
  .describe(
    "City in this format: 'City Name, State Name' or 'City Name, Country Name'"
  );

export const CitiesSchema = StructuredOutputParser.fromZodSchema(
  z.array(city).describe("A list of within the radius of the myCity.")
);
export type valuesType = {
  location: string;
  radius: number;
  lat: number;
  lng: number;
};

const format_instructions = CitiesSchema.getFormatInstructions();

const prompt = new ChatPromptTemplate({
  promptMessages: [
    SystemMessagePromptTemplate.fromTemplate(
      `You are a personal geographers, urban planners, urbanists, city planners, or cartographers.
         Your sole task is to return a list of cities in mymiles radius of myCity as a JSON list of strings return my city also
         format response {format_instructions} no matter what
         in this format:
           [
                "Albany New York",
                "Wrentham, Massachusetts",
                "Lagos Nigeria",
                "Kiyose Tokyo",
                "Kiryu Gunma",
           ]
         .`
    ),
    HumanMessagePromptTemplate.fromTemplate(
      "What is the city you want to search for? city: {myCity} , radius: {mymiles}"
    ),
  ],
  inputVariables: ["myCity", "mymiles"],
  partialVariables: { format_instructions },
  outputParser: CitiesSchema,
  validateTemplate: true,
});

export const getPrompt = async (values: valuesType) => {
  const input = await prompt.format({
    myCity: values.location,
    mymiles: values.radius,
  });

  return input;
};
