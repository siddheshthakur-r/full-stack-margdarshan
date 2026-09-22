import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

const port = Number(process.env.PORT || 8787);

// Create OpenAI client only when the API key exists
const client = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

app.disable("x-powered-by");

app.use(
  cors({
    origin: true,
  })
);

app.use(
  express.json({
    limit: "64kb",
  })
);

/*
 * SYSTEM INSTRUCTIONS
 */

const SYSTEM_PROMPT = `
You are Margdarshan, a calm and supportive parenting guidance assistant.

Your purpose is to help parents understand everyday childhood behavior and provide practical positive-parenting strategies.

IMPORTANT RULES:

1. Do not diagnose the child.
2. Do not claim that a child has a disorder or medical condition.
3. Do not make definitive medical or psychological conclusions.
4. Use simple, non-technical language.
5. Be respectful and non-judgmental.
6. Give practical steps that parents can try.
7. Include examples of what a parent can say to the child.
8. Focus on positive reinforcement, calm communication, predictable routines, emotional labeling, choices, and age-appropriate boundaries.
9. Never ask the parent for their name, address, phone number, school name, or other identifying information.
10. Do not repeat unnecessary personal information.
11. Use the parent's selected language: English, Hindi, or Marathi.
12. If the parent describes immediate danger, serious injury, abuse, self-harm, breathing difficulty, loss of consciousness, or another emergency, advise them to seek urgent local professional/emergency help.
13. If professional support may be useful, suggest speaking with a pediatrician or qualified child-development professional without diagnosing.
14. Keep answers concise and easy to understand on a basic smartphone.

When giving recommendations, prefer this structure:

- What may be happening
- What the parent can do
- Example words the parent can use
- One small thing to try today
- When professional help may be appropriate

Remember that the survey is an observation tool, not a diagnostic test.
`;

/*
 * Keep only behavioral information needed for guidance.
 * Parent demographic information is deliberately excluded.
 */

function normalizeSurvey(survey = {}) {
  return {
    childAge: String(survey.q5 || "").slice(0, 50),
    anger: String(survey.q6 || "").slice(0, 100),
    impatience: String(survey.q7 || "").slice(0, 100),
    crying: String(survey.q8 || "").slice(0, 100),
    upsetWhenThingsGoWrong: String(survey.q9 || "").slice(0, 100),
    fearAnxiety: String(survey.q10 || "").slice(0, 100),
    difficultyUnderstanding: String(survey.q11 || "").slice(0, 100),
    parentStress: String(survey.q12 || "").slice(0, 100),
    biggestChallenge: String(survey.q13 || "").slice(0, 600),
    guidanceHelpful: String(survey.q14 || "").slice(0, 100),
    adviceSource: String(survey.q15 || "").slice(0, 100),
    doctorConsulted: String(survey.q16 || "").slice(0, 100),
    onlineAdviceTrust: String(survey.q17 || "").slice(0, 100),
    smartphone: String(survey.q18 || "").slice(0, 50),
    internet: String(survey.q19 || "").slice(0, 50),
    regularTips: String(survey.q20 || "").slice(0, 100),
    recommendPlatform: String(survey.q21 || "").slice(0, 100),
  };
}

/*
 * Build behavioral context for the AI.
 */

function buildSurveyContext(survey) {
  const safe = normalizeSurvey(survey);

  return `
Child age:
${safe.childAge}

Child behavior observations:

Frequent anger:
${safe.anger}

Impatience:
${safe.impatience}

Crying without clear reason:
${safe.crying}

Gets upset when things do not go their way:
${safe.upsetWhenThingsGoWrong}

Signs of fear or anxiety:
${safe.fearAnxiety}

Parenting challenges:

Difficulty understanding child's behavior:
${safe.difficultyUnderstanding}

Parent stress:
${safe.parentStress}

Biggest parenting challenge:
${safe.biggestChallenge}

Whether guidance may help:
${safe.guidanceHelpful}

Current support:

Usual source of parenting advice:
${safe.adviceSource}

Previous doctor consultation for behavioral concerns:
${safe.doctorConsulted}

Trust in online parenting advice:
${safe.onlineAdviceTrust}

Technology access:

Smartphone:
${safe.smartphone}

Internet:
${safe.internet}

Feedback:

Interest in regular parenting tips:
${safe.regularTips}

Would recommend platform:
${safe.recommendPlatform}
`;
}

/*
 * POST /api/chat
 */

app.post("/api/chat", async (req, res) => {
  const {
    language = "en",
    message = "",
    survey,
  } = req.body || {};

  const safeMessage = String(message || "").slice(0, 1500);

  const allowedLanguages = {
    en: "English",
    hi: "Hindi",
    mr: "Marathi",
  };

  const languageName =
    allowedLanguages[language] || "English";

  if (!safeMessage.trim() && !survey) {
    return res.status(400).json({
      error: "Message is required.",
    });
  }

  const surveyContext = survey
    ? buildSurveyContext(survey)
    : "No behavior survey was provided.";

  /*
   * If OpenAI API key is missing, use local fallback.
   */

  if (!client) {
    console.error(
      "OPENAI_API_KEY is not configured."
    );

    return res.json({
      answer: fallbackGuidance(language),
      ephemeral: true,
      provider: "local-fallback",
    });
  }

  try {
    const userPrompt = `
Respond in ${languageName}.

${surveyContext}

Parent's latest question:

${
  safeMessage.trim()
    ? safeMessage
    : "Please provide initial personalized guidance based on the behavior observations."
}
`;

    /*
     * OpenAI Responses API
     *
     * store: false means this response is not stored
     * as an OpenAI response object for later retrieval.
     */

    const response = await client.responses.create({
      model:
        process.env.OPENAI_MODEL ||
        "gpt-5.6-luna",

      store: false,

      input: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const answer =
      response.output_text?.trim() ||
      fallbackGuidance(language);

    return res.json({
      answer,
      ephemeral: true,
    });
  } catch (error) {
    /*
     * IMPORTANT:
     * Log the actual OpenAI error in Render logs.
     * Never log the API key.
     */

    console.error("AI request failed.");

    console.error(
      "Status:",
      error?.status || "unknown"
    );

    console.error(
      "Message:",
      error?.message || "Unknown error"
    );

    if (error?.error) {
      console.error(
        "OpenAI error:",
        JSON.stringify(error.error)
      );
    }

    return res.status(502).json({
      error:
        "The guidance service is temporarily unavailable.",

      answer: fallbackGuidance(language),

      ephemeral: true,
    });
  }
});

/*
 * Simple fallback guidance
 */

function fallbackGuidance(language) {
  const guidance = {
    en: `
Start with connection before correction.

1. Stay calm and name the child's feeling:
"You seem really upset."

2. Keep the boundary short:
"I won't let you hit. You can tell me you're angry."

3. Give two simple choices:
"Do you want to put the toys away now or after one minute?"

4. Once the child is calm, talk briefly about what happened.

5. Notice and praise small positive behavior:
"Thank you for using your words."

Try one predictable routine today and use the same calm words each time.
`,

    hi: `
पहले जुड़ाव करें, फिर सुधार करें।

1. शांत रहें और बच्चे की भावना को शब्द दें:
"तुम बहुत परेशान लग रहे हो।"

2. सीमा छोटी और स्पष्ट रखें:
"मैं तुम्हें मारने नहीं दूँगा/दूँगी। तुम बता सकते हो कि तुम्हें गुस्सा है।"

3. दो छोटे विकल्प दें:
"खिलौने अभी रखोगे या एक मिनट बाद?"

4. बच्चा शांत होने के बाद घटना के बारे में थोड़ी बात करें।

5. अच्छे व्यवहार की तुरंत प्रशंसा करें:
"अपनी बात शब्दों में बताने के लिए धन्यवाद।"

आज एक तय दिनचर्या आज़माएँ और हर बार शांत भाषा का इस्तेमाल करें।
`,

    mr: `
आधी जोडणी करा, मग सुधारणा करा.

1. शांत राहा आणि मुलाच्या भावनेला शब्द द्या:
"तुला खूप वाईट वाटत आहे असे दिसते."

2. मर्यादा थोडक्यात सांगा:
"मी तुला मारू देणार नाही. तुला राग आला आहे हे तू सांगू शकतोस."

3. दोन छोटे पर्याय द्या:
"खेळणी आत्ता ठेवशील की एका मिनिटाने?"

4. मूल शांत झाल्यावर काय झाले याबद्दल थोडक्यात बोला.

5. चांगल्या वर्तनाची लगेच प्रशंसा करा:
"तू शब्दांत सांगितल्याबद्दल धन्यवाद."

आज एक ठरलेली दिनचर्या वापरून पाहा आणि प्रत्येक वेळी शांत भाषा वापरा.
`,
  };

  return guidance[language] || guidance.en;
}

/*
 * Start server
 */

app.listen(port, () => {
  console.log(
    `Margdarshan API listening on port ${port}`
  );

  console.log(
    `OpenAI configured: ${Boolean(
      process.env.OPENAI_API_KEY
    )}`
  );

  console.log(
    `OpenAI model: ${
      process.env.OPENAI_MODEL ||
      "gpt-5.6-luna"
    }`
  );
});