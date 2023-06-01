import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from CodeX!",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    
    // gpt-3.5-turbo
    // replace .createCompletion() with .createChatCompletion()
    const completion = await openai.createChatCompletion({ 
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `${prompt}`}], 
    });



    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.log("ERROR!")
    res.status(500).send(error || "Something went wrong");
  }
});

app.listen(5000, () =>
  console.log("AI server started on http://localhost:5000")
);
