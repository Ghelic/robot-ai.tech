import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
if (!apiKey) {
  console.error("No API key found in environment variables.");
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey });

async function generateAndSaveImage(prompt, filename) {
  console.log(`Generating ${filename}...`);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        const buffer = Buffer.from(base64Data, 'base64');
        const filePath = path.join(process.cwd(), 'images', filename);
        fs.writeFileSync(filePath, buffer);
        console.log(`Saved ${filename} to ${filePath}`);
        return;
      }
    }
    console.error(`No image data found for ${filename}`);
  } catch (error) {
    console.error(`Error generating ${filename}:`, error);
  }
}

async function main() {
  const images = [
    { prompt: "A minimalist, futuristic tech company logo for 'Robot AI Tech'. Clean lines, blue and emerald green gradients, white background, high resolution, vector style.", filename: "logo.png" },
    { prompt: "A high-tech robotics R&D laboratory with blue ambient lighting, advanced computer screens, and robotic prototypes on workbenches. Cinematic lighting, 8k resolution.", filename: "about_lab.jpg" },
    { prompt: "A sleek, advanced humanoid robot named ARES-1 standing in a futuristic industrial setting. White and carbon fiber finish, glowing blue sensors, 8k resolution.", filename: "robot_ares.jpg" },
    { prompt: "A rugged, high-tech quadruped robot named SENTINEL walking through a rocky, rubble-filled terrain. Military grade finish, LIDAR sensors, cinematic lighting.", filename: "robot_sentinel.jpg" },
    { prompt: "A high-precision collaborative robotic arm named CO-BOT 7 working in a clean, modern laboratory environment. 7-axis joints, sleek silver finish.", filename: "robot_cobot.jpg" },
    { prompt: "A high-speed autonomous drone named SKY-HUNTER X flying through a futuristic city skyline at dusk. Sleek aerodynamic design, glowing lights.", filename: "drone_skyhunter.jpg" },
    { prompt: "A large, powerful heavy-lift industrial drone named TITAN carrying a cargo container over a construction site. Eight rotors, rugged design.", filename: "drone_titan.jpg" },
    { prompt: "A sleek fixed-wing UAV named ORBITER 3 soaring high above a lush forest. White wings, solar panels on top, high-altitude surveillance style.", filename: "drone_orbiter.jpg" }
  ];

  if (!fs.existsSync(path.join(process.cwd(), 'images'))) {
    fs.mkdirSync(path.join(process.cwd(), 'images'));
  }

  for (const img of images) {
    await generateAndSaveImage(img.prompt, img.filename);
  }
}

main();
