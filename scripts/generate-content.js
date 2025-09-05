import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";

const API_KEY_PATH = path.resolve(process.cwd(), "apikey.txt");
const KEYWORD_PATH = path.resolve(process.cwd(), "keyword.txt");
const OUTPUT_PATH = path.resolve(process.cwd(), "src/data/marketing-glossary.json");

const BACKDATE_DAYS = 3;
const FUTURE_SCHEDULE_DAYS = 5;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  console.log("Starting smart content generation process...");

  try {
    const rawApiKeyContent = await fs.readFile(API_KEY_PATH, "utf-8");
    const apiKey = rawApiKeyContent.split('\n').find(line => line.trim().startsWith("AIzaSy"))?.trim();

    if (!apiKey) {
      throw new Error("Could not find a valid API Key in apikey.txt.");
    }

    const keywords = (await fs.readFile(KEYWORD_PATH, "utf-8")).trim().split('\n').filter(k => k.trim());

    if (!keywords.length) {
      console.log("No keywords found in keyword.txt. Exiting.");
      return;
    }

    let existingArticles = [];
    try {
      const fileContent = await fs.readFile(OUTPUT_PATH, "utf-8");
      existingArticles = JSON.parse(fileContent);
    } catch (e) {
      console.log("No existing glossary file found. A new one will be created.");
    }

    const existingSlugs = new Set(existingArticles.map(article => article.slug));
    const keywordsToGenerate = keywords.filter(keyword => {
      const slug = keyword.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      return !existingSlugs.has(slug);
    });

    if (!keywordsToGenerate.length) {
      console.log("All keywords already have corresponding articles. Nothing to generate.");
      return;
    }

    console.log(`${existingArticles.length} articles already exist. Found ${keywordsToGenerate.length} new keywords to generate.`);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const totalScheduleSpan = BACKDATE_DAYS + FUTURE_SCHEDULE_DAYS;
    const postsPerDay = Math.ceil(keywords.length / totalScheduleSpan);
    
    let keywordCount = existingArticles.length;
    for (const keyword of keywordsToGenerate) {
      keywordCount++;
      const currentKeyword = keyword.trim();
      console.log(`[${keywordCount}/${keywords.length}] Generating content for new keyword: "${currentKeyword}"`);

      const daySlot = Math.floor((keywordCount - 1) / postsPerDay);
      const dayOffset = daySlot - (BACKDATE_DAYS > 0 ? BACKDATE_DAYS - 1 : 0);
      
      const publishDate = new Date();
      publishDate.setDate(publishDate.getDate() + dayOffset);
      const formattedDate = publishDate.toISOString().split('T')[0];

      const masterPrompt = `
        Act as a world-class digital marketing expert and technical writer for an English-speaking audience.
        Your task is to write a comprehensive article about the term "${currentKeyword}".

        Structure your entire response as a single, valid JSON object that has the following exact keys: "slug", "term", "date", "category", "tags", "isPopular", "summary", "deepDive", "importance", an array of "prosCons" (each with "point" and "explanation"), an array of "relatedTerms" (each with "term" and "slug"), and an array of "faq" (each with "question" and "answer").

        - The "slug" must be a URL-friendly version of the term "${currentKeyword}".
        - The "term" should be the full name, for example: "SEO (Search Engine Optimization)".
        - The "date" must be "${formattedDate}".
        - The "category" must be one of the following: "SEO Fundamentals", "Content Marketing", "Paid Advertising", "Web Analytics", or "General Marketing". Choose the most relevant one.
        - The "tags" must be an array of 3-5 relevant lowercase strings.
        - The "isPopular" must be a boolean value (true or false). Set it to true only if the term is extremely common like SEO, CPC, or Content Marketing.
        - The "deepDive" and "importance" sections must be detailed, informative, and collectively exceed 800 words in valid Markdown format.
        - All content must be high-quality, original, and easy for a beginner to understand.
      `;

      try {
        const result = await model.generateContent(masterPrompt);
        const response = await result.response;
        const text = response.text();
        
        const jsonMatch = text.match(/{[\s\S]*}/);
        if (!jsonMatch) {
          throw new Error("No valid JSON block found in the AI response.");
        }
        
        const jsonString = jsonMatch[0];
        const jsonResult = JSON.parse(jsonString);
        existingArticles.push(jsonResult);

      } catch (e) {
        console.error(`Failed to generate content for "${currentKeyword}". Error: ${e.message}`);
      }

      await delay(5000); 
    }

    await fs.writeFile(OUTPUT_PATH, JSON.stringify(existingArticles, null, 2));
    console.log(`Process finished. Total articles now: ${existingArticles.length}. Saved to ${OUTPUT_PATH}`);

  } catch (error) {
    console.error("An error occurred during the script execution:", error);
  }
}

main();