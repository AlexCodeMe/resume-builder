"use server";

import anthropic from "@/lib/anthropic";
import {
  generateSummarySchema,
  GenerateSummaryInput,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/zod";
import { TextBlock } from "@anthropic-ai/sdk/resources/messages.mjs";

export async function generateSummary(input: GenerateSummaryInput) {
  // TODO: block non-premium users
  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `
        You are an expert resume writer.
        Your task is to write a professional introduction summary for a resume given the user's provided data.
        Only return the summary and do not include any other information in the response. Keep it concise and professional.
    `;

  const userMessage = `
    Please generate a professional resume summary from this data:

    Job title: ${jobTitle || "N/A"}

    Work experience:
    ${workExperiences
      ?.map(
        (exp) => `
        Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} 
        from ${exp.startDate || "N/A"} 
        to ${exp.endDate || "Present"}

        Description:
        ${exp.description || "N/A"}
        `,
      )
      .join("\n\n")}

    Education:
    ${educations
      ?.map(
        (edu) => `
        Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} 
        from ${edu.startDate || "N/A"} 
        to ${edu.endDate || "N/A"}
        `,
      )
      .join("\n\n")}

      Skills:
      ${skills ? skills.join(", ") : "N/A"}
    `;

  console.log("systemMessage", systemMessage);
  console.log("userMessage", userMessage);

  const completion = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1000,
    temperature: 0.2,
    system: systemMessage,
    messages: [{ role: "user", content: userMessage }],
  });

  const aiResponse = completion.content[0] as TextBlock;
  if (!aiResponse.text) {
    throw new Error("No response from AI");
  }

  return aiResponse.text;
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput,
) {
  // TODO: block for non-premium users
  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `
    You are an expert resume generator ai.
    Your task is to generate a work experience entry based on the user input.
    You must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add more fields

    Job title: <job title>
    Company: <company name>
    Start date: <format: YYYY-MM-DD (only if provided)>
    End date: <format: YYYY-MM-DD (only if provided)>
    Description: <an optimized description in bullet format, might be inferred from the job title>
  `;

  const userMessage = `
    Please generate a work experience entry from this description:
    ${description}
  `;

  const completion = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1000,
    temperature: 0.2,
    system: systemMessage,
    messages: [{ role: "user", content: userMessage }],
  });

  const aiResponse = completion.content[0] as TextBlock;
  if (!aiResponse.text) {
    throw new Error("No response from AI");
  }

  console.log("aiResponse", aiResponse.text);

  return {
    position: aiResponse.text.match(/Job title: (.*)/)?.[1] || "",
    company: aiResponse.text.match(/Company: (.*)/)?.[1] || "",
    description: (
      aiResponse.text.match(/Description:([\s\S]*)/)?.[1] || ""
    ).trim(),
    startDate: aiResponse.text.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.text.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  } satisfies WorkExperience;
}