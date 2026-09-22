import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const translations = {
  en: {
    language: "Language",
    home: "Home",
    behaviorCheck: "Behavior Check",
    subtitle: "Simple guidance for everyday childhood behavior.",
    chatTitle: "Ask about child behavior",
    chatHint:
      "Ask about anger, impatience, routines, crying, anxiety, or other everyday behavior.",
    placeholder:
      "Example: My child gets very angry when playtime ends.",
    send: "Send",
    checking: "Thinking…",
    startCheck: "Start Behavior Check",

    surveyTitle: "Parent & Child Behavior Check",
    surveyIntro:
      "Please answer based on what you usually observe. There are no right or wrong answers.",
    submit: "Get Guidance",
    back: "Back",
    results: "Your Guidance",
    tailored: "Guidance based on your answers",
    askFollow: "Ask a follow-up question",
    newCheck: "Start New Check",

    basic: "Basic Information",
    childBehaviour: "Child Behaviour",
    parenting: "Parenting Challenges",
    support: "Current Support",
    technology: "Technology",
    feedback: "Feedback",

    q1: "What is your age?",
    q2: "What is your gender?",
    q3: "What is your highest level of education?",
    q4: "What is your occupation?",
    q5: "What is the age of your child?",

    q6: "Does your child get angry frequently?",
    q7: "Does your child become impatient easily?",
    q8: "Does your child cry often without a clear reason?",
    q9: "Does your child get upset when things don't go their way?",
    q10: "Does your child show signs of fear or anxiety?",

    q11: "Do you find it difficult to understand your child's behaviour?",
    q12: "How often do you feel stressed while managing your child's behaviour?",
    q13: "What is your biggest parenting challenge?",
    q14: "Do you think parenting guidance would help you?",

    q15: "Who do you usually ask for parenting advice?",
    q16: "Have you ever consulted a doctor for behavioural concerns?",
    q17: "Do you trust online parenting advice?",

    q18: "Do you own a smartphone?",
    q19: "Do you have internet access?",

    q20: "Would regular parenting tips be useful?",
    q21: "Would you recommend such a platform to other parents?",

    select: "Choose one",
    yes: "Yes",
    no: "No",
    sometimes: "Sometimes",

    genderOptions: [
      "Male",
      "Female",
      "Other",
      "Prefer not to say"
    ],

    educationOptions: [
      "No formal education",
      "Primary school",
      "Secondary school",
      "Higher secondary",
      "Diploma",
      "Graduate",
      "Postgraduate",
      "Other"
    ],

    frequencyOptions: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Very often"
    ],

    stressOptions: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Very often"
    ],

    adviceOptions: [
      "Family or relatives",
      "Friends",
      "Doctor",
      "Teacher or school",
      "Online websites",
      "Social media",
      "Nobody",
      "Other"
    ],

    trustOptions: [
      "Yes",
      "Somewhat",
      "No",
      "Not sure"
    ],

    welcome:
      "Hello! I can share simple, positive ways to respond to everyday child behavior.",

    privacy:
      "Privacy: your answers are kept only in temporary browser memory. This app does not use a database to store your survey responses.",

    disclaimer:
      "This guidance is educational. It does not diagnose a child or replace professional care.",

    required: "Please answer all required questions."
  },

  hi: {
    language: "भाषा",
    home: "होम",
    behaviorCheck: "व्यवहार जाँच",
    subtitle: "बच्चों के रोज़मर्रा के व्यवहार के लिए सरल मार्गदर्शन।",
    chatTitle: "बच्चे के व्यवहार के बारे में पूछें",
    chatHint:
      "गुस्सा, अधीरता, रोना, चिंता या अन्य रोज़मर्रा के व्यवहार के बारे में पूछें।",
    placeholder:
      "उदाहरण: खेल खत्म होने पर मेरा बच्चा बहुत गुस्सा करता है।",
    send: "भेजें",
    checking: "सोच रहा है…",
    startCheck: "व्यवहार जाँच शुरू करें",

    surveyTitle: "माता-पिता और बच्चे की व्यवहार जाँच",
    surveyIntro:
      "जो आप आमतौर पर देखते हैं उसके आधार पर उत्तर दें। कोई सही या गलत उत्तर नहीं है।",
    submit: "मार्गदर्शन पाएँ",
    back: "वापस",
    results: "आपका मार्गदर्शन",
    tailored: "आपके उत्तरों के आधार पर मार्गदर्शन",
    askFollow: "आगे का सवाल पूछें",
    newCheck: "नई जाँच शुरू करें",

    basic: "बुनियादी जानकारी",
    childBehaviour: "बच्चे का व्यवहार",
    parenting: "पालन-पोषण की चुनौतियाँ",
    support: "वर्तमान सहायता",
    technology: "तकनीक",
    feedback: "प्रतिक्रिया",

    q1: "आपकी उम्र क्या है?",
    q2: "आपका लिंग क्या है?",
    q3: "आपकी उच्चतम शैक्षणिक योग्यता क्या है?",
    q4: "आपका व्यवसाय क्या है?",
    q5: "आपके बच्चे की उम्र क्या है?",

    q6: "क्या आपका बच्चा अक्सर गुस्सा करता है?",
    q7: "क्या आपका बच्चा आसानी से अधीर हो जाता है?",
    q8: "क्या आपका बच्चा बिना स्पष्ट कारण के अक्सर रोता है?",
    q9: "क्या चीज़ें उसके अनुसार न होने पर आपका बच्चा परेशान हो जाता है?",
    q10: "क्या आपके बच्चे में डर या चिंता के संकेत दिखाई देते हैं?",

    q11: "क्या आपको अपने बच्चे के व्यवहार को समझने में कठिनाई होती है?",
    q12: "अपने बच्चे के व्यवहार को संभालते समय आप कितनी बार तनाव महसूस करते हैं?",
    q13: "आपकी सबसे बड़ी पालन-पोषण चुनौती क्या है?",
    q14: "क्या आपको लगता है कि पालन-पोषण संबंधी मार्गदर्शन आपकी मदद करेगा?",

    q15: "आप आमतौर पर पालन-पोषण की सलाह किससे लेते हैं?",
    q16: "क्या आपने कभी बच्चे के व्यवहार संबंधी चिंता के लिए डॉक्टर से सलाह ली है?",
    q17: "क्या आप ऑनलाइन पालन-पोषण की सलाह पर भरोसा करते हैं?",

    q18: "क्या आपके पास स्मार्टफोन है?",
    q19: "क्या आपके पास इंटरनेट की सुविधा है?",

    q20: "क्या नियमित पालन-पोषण संबंधी सुझाव आपके लिए उपयोगी होंगे?",
    q21: "क्या आप इस तरह के प्लेटफॉर्म की सलाह दूसरे माता-पिता को देंगे?",

    select: "एक चुनें",
    yes: "हाँ",
    no: "नहीं",
    sometimes: "कभी-कभी",

    genderOptions: [
      "पुरुष",
      "महिला",
      "अन्य",
      "बताना पसंद नहीं"
    ],

    educationOptions: [
      "कोई औपचारिक शिक्षा नहीं",
      "प्राथमिक शिक्षा",
      "माध्यमिक शिक्षा",
      "उच्च माध्यमिक",
      "डिप्लोमा",
      "स्नातक",
      "स्नातकोत्तर",
      "अन्य"
    ],

    frequencyOptions: [
      "कभी नहीं",
      "बहुत कम",
      "कभी-कभी",
      "अक्सर",
      "बहुत अक्सर"
    ],

    stressOptions: [
      "कभी नहीं",
      "बहुत कम",
      "कभी-कभी",
      "अक्सर",
      "बहुत अक्सर"
    ],

    adviceOptions: [
      "परिवार या रिश्तेदार",
      "दोस्त",
      "डॉक्टर",
      "शिक्षक या स्कूल",
      "ऑनलाइन वेबसाइट",
      "सोशल मीडिया",
      "किसी से नहीं",
      "अन्य"
    ],

    trustOptions: [
      "हाँ",
      "कुछ हद तक",
      "नहीं",
      "पता नहीं"
    ],

    welcome:
      "नमस्ते! मैं बच्चे के रोज़मर्रा के व्यवहार पर सरल और सकारात्मक तरीके बता सकता हूँ।",

    privacy:
      "गोपनीयता: आपके उत्तर केवल अस्थायी ब्राउज़र मेमोरी में रहते हैं। यह ऐप आपके उत्तरों को डेटाबेस में सेव नहीं करता।",

    disclaimer:
      "यह जानकारी शैक्षिक है। यह बच्चे का निदान नहीं करती और पेशेवर देखभाल का विकल्प नहीं है।",

    required: "कृपया सभी आवश्यक प्रश्नों के उत्तर दें।"
  },

  mr: {
    language: "भाषा",
    home: "मुख्यपृष्ठ",
    behaviorCheck: "वर्तन तपासणी",
    subtitle: "मुलांच्या रोजच्या वर्तनासाठी सोपे मार्गदर्शन.",
    chatTitle: "मुलाच्या वर्तनाबद्दल विचारा",
    chatHint:
      "राग, अधीरता, रडणे, चिंता किंवा इतर रोजच्या वर्तनाबद्दल विचारा.",
    placeholder:
      "उदाहरण: खेळ थांबवताना माझ्या मुलाला खूप राग येतो.",
    send: "पाठवा",
    checking: "विचार करत आहे…",
    startCheck: "वर्तन तपासणी सुरू करा",

    surveyTitle: "पालक आणि मुलाची वर्तन तपासणी",
    surveyIntro:
      "तुम्ही नेहमी जे पाहता त्यानुसार उत्तर द्या. बरोबर किंवा चूक असे उत्तर नाही.",
    submit: "मार्गदर्शन मिळवा",
    back: "मागे",
    results: "तुमचे मार्गदर्शन",
    tailored: "तुमच्या उत्तरांवर आधारित मार्गदर्शन",
    askFollow: "पुढचा प्रश्न विचारा",
    newCheck: "नवी तपासणी सुरू करा",

    basic: "मूलभूत माहिती",
    childBehaviour: "मुलाचे वर्तन",
    parenting: "पालकत्वाच्या अडचणी",
    support: "सध्याची मदत",
    technology: "तंत्रज्ञान",
    feedback: "अभिप्राय",

    q1: "तुमचे वय किती आहे?",
    q2: "तुमचे लिंग काय आहे?",
    q3: "तुमची सर्वोच्च शैक्षणिक पात्रता काय आहे?",
    q4: "तुमचा व्यवसाय काय आहे?",
    q5: "तुमच्या मुलाचे वय किती आहे?",

    q6: "तुमचे मूल वारंवार रागावते का?",
    q7: "तुमचे मूल सहज अधीर होते का?",
    q8: "तुमचे मूल स्पष्ट कारण नसताना वारंवार रडते का?",
    q9: "गोष्टी मनासारख्या न झाल्यास तुमचे मूल अस्वस्थ होते का?",
    q10: "तुमच्या मुलामध्ये भीती किंवा चिंतेची चिन्हे दिसतात का?",

    q11: "तुमच्या मुलाचे वर्तन समजून घेणे तुम्हाला कठीण जाते का?",
    q12: "मुलाचे वर्तन हाताळताना तुम्हाला किती वेळा ताण जाणवतो?",
    q13: "तुमची सर्वात मोठी पालकत्वाची अडचण काय आहे?",
    q14: "पालकत्वाचे मार्गदर्शन तुम्हाला उपयोगी ठरेल असे वाटते का?",

    q15: "पालकत्वाच्या सल्ल्यासाठी तुम्ही सहसा कोणाला विचारता?",
    q16: "मुलाच्या वर्तनाबद्दलच्या चिंतेसाठी तुम्ही कधी डॉक्टरांचा सल्ला घेतला आहे का?",
    q17: "तुम्ही ऑनलाइन पालकत्वाच्या सल्ल्यावर विश्वास ठेवता का?",

    q18: "तुमच्याकडे स्मार्टफोन आहे का?",
    q19: "तुमच्याकडे इंटरनेटची सुविधा आहे का?",

    q20: "नियमित पालकत्वाचे टिप्स तुमच्यासाठी उपयोगी ठरतील का?",
    q21: "तुम्ही अशा प्लॅटफॉर्मची शिफारस इतर पालकांना कराल का?",

    select: "एक निवडा",
    yes: "होय",
    no: "नाही",
    sometimes: "कधीकधी",

    genderOptions: [
      "पुरुष",
      "महिला",
      "इतर",
      "सांगू इच्छित नाही"
    ],

    educationOptions: [
      "औपचारिक शिक्षण नाही",
      "प्राथमिक शिक्षण",
      "माध्यमिक शिक्षण",
      "उच्च माध्यमिक",
      "डिप्लोमा",
      "पदवी",
      "पदव्युत्तर",
      "इतर"
    ],

    frequencyOptions: [
      "कधीच नाही",
      "क्वचित",
      "कधीकधी",
      "अनेकदा",
      "खूप वेळा"
    ],

    stressOptions: [
      "कधीच नाही",
      "क्वचित",
      "कधीकधी",
      "अनेकदा",
      "खूप वेळा"
    ],

    adviceOptions: [
      "कुटुंब किंवा नातेवाईक",
      "मित्र",
      "डॉक्टर",
      "शिक्षक किंवा शाळा",
      "ऑनलाइन वेबसाइट",
      "सोशल मीडिया",
      "कोणालाही नाही",
      "इतर"
    ],

    trustOptions: [
      "होय",
      "काही प्रमाणात",
      "नाही",
      "माहित नाही"
    ],

    welcome:
      "नमस्कार! मुलांच्या रोजच्या वर्तनासाठी मी सोपे आणि सकारात्मक उपाय सांगू शकतो.",

    privacy:
      "गोपनीयता: तुमची उत्तरे फक्त तात्पुरत्या ब्राउझर मेमरीमध्ये राहतात. अॅप तुमची उत्तरे डेटाबेसमध्ये साठवत नाही.",

    disclaimer:
      "हे मार्गदर्शन शैक्षणिक आहे. यामधून निदान केले जात नाही आणि व्यावसायिक मदतीचा हा पर्याय नाही.",

    required: "कृपया सर्व आवश्यक प्रश्नांची उत्तरे द्या."
  }
};

const initialSurvey = {
  q1: "",
  q2: "",
  q3: "",
  q4: "",
  q5: "",
  q6: "",
  q7: "",
  q8: "",
  q9: "",
  q10: "",
  q11: "",
  q12: "",
  q13: "",
  q14: "",
  q15: "",
  q16: "",
  q17: "",
  q18: "",
  q19: "",
  q20: "",
  q21: ""
};

function App() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("home");
  const [survey, setSurvey] = useState(initialSurvey);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const t = translations[lang];

  /*
    IMPORTANT:
    We deliberately do NOT use localStorage or sessionStorage.
    All survey and chat data stays only in React memory.
  */
  useEffect(() => {
    const clearMemory = () => {
      setSurvey(initialSurvey);
      setChat([]);
      setMessage("");
    };

    window.addEventListener("pagehide", clearMemory);
    window.addEventListener("beforeunload", clearMemory);

    return () => {
      window.removeEventListener("pagehide", clearMemory);
      window.removeEventListener("beforeunload", clearMemory);
    };
  }, []);

  function updateAnswer(question, value) {
    setSurvey((previous) => ({
      ...previous,
      [question]: value
    }));
  }

  function isSurveyComplete() {
    return Object.values(survey).every(
      (value) => String(value).trim() !== ""
    );
  }

  async function callAI(text = "", includeSurvey = false) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          language: lang,
          message: text,
          survey: includeSurvey ? survey : undefined
        })
      });

      const data = await response.json();

      if (!response.ok && !data.answer) {
        throw new Error(data.error || "Request failed");
      }

      return data.answer || t.disclaimer;
    } catch (err) {
      console.error(err);
      setError(
        "The guidance service is temporarily unavailable. Please try again."
      );

      return t.disclaimer;
    } finally {
      setLoading(false);
    }
  }

  async function submitSurvey(event) {
    event.preventDefault();

    if (!isSurveyComplete()) {
      setError(t.required);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return;
    }

    setError("");
    setChat([]);
    setPage("results");

    const answer = await callAI("", true);

    setChat([
      {
        role: "assistant",
        text: answer
      }
    ]);
  }

  async function sendMessage(event) {
    if (event) {
      event.preventDefault();
    }

    const text = message.trim();

    if (!text || loading) {
      return;
    }

    setMessage("");

    setChat((previous) => [
      ...previous,
      {
        role: "user",
        text
      }
    ]);

    const answer = await callAI(
      text,
      page === "results"
    );

    setChat((previous) => [
      ...previous,
      {
        role: "assistant",
        text: answer
      }
    ]);
  }

  function resetApplication() {
    setSurvey(initialSurvey);
    setChat([]);
    setMessage("");
    setError("");
    setPage("home");
  }

  return (
    <div className="app">

      <header className="topbar">
        <button
          className="brand"
          onClick={resetApplication}
          aria-label="Margdarshan home"
        >
          <span className="brand-mark">म</span>
          <span>Margdarshan</span>
        </button>

        <label className="language">
          <span className="sr-only">
            {t.language}
          </span>

          <select
            value={lang}
            onChange={(event) => setLang(event.target.value)}
            aria-label={t.language}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
          </select>
        </label>
      </header>

      <main className="shell">

        {/* HOME PAGE */}
        {page === "home" && (
          <>
            <section className="hero">
              <div className="eyebrow">
                MARGDARSHAN
              </div>

              <h1>
                {t.subtitle}
              </h1>

              <p>
                {t.privacy}
              </p>
            </section>

            {/* General Chatbot */}
            <section className="card chat-card">

              <div className="section-heading">
                <div>
                  <span className="icon">💬</span>
                  <h2>{t.chatTitle}</h2>
                </div>
              </div>

              <p className="muted">
                {t.chatHint}
              </p>

              <div className="mini-chat">

                {chat.length === 0 && (
                  <div className="bubble assistant">
                    {t.welcome}
                  </div>
                )}

                {chat.slice(-4).map((item, index) => (
                  <div
                    key={index}
                    className={`bubble ${item.role}`}
                  >
                    {item.text}
                  </div>
                ))}

              </div>

              <form
                onSubmit={sendMessage}
                className="composer"
              >
                <input
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  placeholder={t.placeholder}
                  maxLength={1500}
                />

                <button
                  className="primary send"
                  disabled={
                    !message.trim() || loading
                  }
                >
                  {loading ? t.checking : t.send}
                </button>
              </form>

            </section>

            {/* Behavior Check */}
            <section className="card check-card">

              <div className="section-heading">
                <div>
                  <span className="icon">✓</span>
                  <h2>{t.behaviorCheck}</h2>
                </div>
              </div>

              <p className="muted">
                {t.surveyIntro}
              </p>

              <button
                className="primary full"
                onClick={() => {
                  setError("");
                  setPage("survey");
                }}
              >
                {t.startCheck}
              </button>

            </section>
          </>
        )}

        {/* SURVEY PAGE */}
        {page === "survey" && (
          <section className="card survey-card">

            <button
              className="back"
              onClick={() => setPage("home")}
            >
              ← {t.back}
            </button>

            <div className="hero compact">
              <div className="eyebrow">
                BEHAVIOR CHECK
              </div>

              <h1>
                {t.surveyTitle}
              </h1>

              <p>
                {t.surveyIntro}
              </p>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={submitSurvey}>

              {/* BASIC INFORMATION */}
              <SurveySection title={t.basic}>

                <TextQuestion
                  number="1"
                  label={t.q1}
                  value={survey.q1}
                  onChange={(value) =>
                    updateAnswer("q1", value)
                  }
                  type="number"
                />

                <SelectQuestion
                  number="2"
                  label={t.q2}
                  value={survey.q2}
                  options={t.genderOptions}
                  placeholder={t.select}
                  onChange={(value) =>
                    updateAnswer("q2", value)
                  }
                />

                <SelectQuestion
                  number="3"
                  label={t.q3}
                  value={survey.q3}
                  options={t.educationOptions}
                  placeholder={t.select}
                  onChange={(value) =>
                    updateAnswer("q3", value)
                  }
                />

                <TextQuestion
                  number="4"
                  label={t.q4}
                  value={survey.q4}
                  onChange={(value) =>
                    updateAnswer("q4", value)
                  }
                />

                <TextQuestion
                  number="5"
                  label={t.q5}
                  value={survey.q5}
                  onChange={(value) =>
                    updateAnswer("q5", value)
                  }
                  type="number"
                />

              </SurveySection>

              {/* CHILD BEHAVIOUR */}
              <SurveySection title={t.childBehaviour}>

                <RadioQuestion
                  number="6"
                  label={t.q6}
                  value={survey.q6}
                  options={t.frequencyOptions}
                  onChange={(value) =>
                    updateAnswer("q6", value)
                  }
                />

                <RadioQuestion
                  number="7"
                  label={t.q7}
                  value={survey.q7}
                  options={t.frequencyOptions}
                  onChange={(value) =>
                    updateAnswer("q7", value)
                  }
                />

                <RadioQuestion
                  number="8"
                  label={t.q8}
                  value={survey.q8}
                  options={t.frequencyOptions}
                  onChange={(value) =>
                    updateAnswer("q8", value)
                  }
                />

                <RadioQuestion
                  number="9"
                  label={t.q9}
                  value={survey.q9}
                  options={t.frequencyOptions}
                  onChange={(value) =>
                    updateAnswer("q9", value)
                  }
                />

                <RadioQuestion
                  number="10"
                  label={t.q10}
                  value={survey.q10}
                  options={t.frequencyOptions}
                  onChange={(value) =>
                    updateAnswer("q10", value)
                  }
                />

              </SurveySection>

              {/* PARENTING CHALLENGES */}
              <SurveySection title={t.parenting}>

                <RadioQuestion
                  number="11"
                  label={t.q11}
                  value={survey.q11}
                  options={[
                    t.yes,
                    t.sometimes,
                    t.no
                  ]}
                  onChange={(value) =>
                    updateAnswer("q11", value)
                  }
                />

                <RadioQuestion
                  number="12"
                  label={t.q12}
                  value={survey.q12}
                  options={t.stressOptions}
                  onChange={(value) =>
                    updateAnswer("q12", value)
                  }
                />

                <TextAreaQuestion
                  number="13"
                  label={t.q13}
                  value={survey.q13}
                  onChange={(value) =>
                    updateAnswer("q13", value)
                  }
                />

                <RadioQuestion
                  number="14"
                  label={t.q14}
                  value={survey.q14}
                  options={[
                    t.yes,
                    t.sometimes,
                    t.no
                  ]}
                  onChange={(value) =>
                    updateAnswer("q14", value)
                  }
                />

              </SurveySection>

              {/* CURRENT SUPPORT */}
              <SurveySection title={t.support}>

                <SelectQuestion
                  number="15"
                  label={t.q15}
                  value={survey.q15}
                  options={t.adviceOptions}
                  placeholder={t.select}
                  onChange={(value) =>
                    updateAnswer("q15", value)
                  }
                />

                <RadioQuestion
                  number="16"
                  label={t.q16}
                  value={survey.q16}
                  options={[
                    t.yes,
                    t.no
                  ]}
                  onChange={(value) =>
                    updateAnswer("q16", value)
                  }
                />

                <SelectQuestion
                  number="17"
                  label={t.q17}
                  value={survey.q17}
                  options={t.trustOptions}
                  placeholder={t.select}
                  onChange={(value) =>
                    updateAnswer("q17", value)
                  }
                />

              </SurveySection>

              {/* TECHNOLOGY */}
              <SurveySection title={t.technology}>

                <RadioQuestion
                  number="18"
                  label={t.q18}
                  value={survey.q18}
                  options={[
                    t.yes,
                    t.no
                  ]}
                  onChange={(value) =>
                    updateAnswer("q18", value)
                  }
                />

                <RadioQuestion
                  number="19"
                  label={t.q19}
                  value={survey.q19}
                  options={[
                    t.yes,
                    t.no
                  ]}
                  onChange={(value) =>
                    updateAnswer("q19", value)
                  }
                />

              </SurveySection>

              {/* FEEDBACK */}
              <SurveySection title={t.feedback}>

                <RadioQuestion
                  number="20"
                  label={t.q20}
                  value={survey.q20}
                  options={[
                    t.yes,
                    t.sometimes,
                    t.no
                  ]}
                  onChange={(value) =>
                    updateAnswer("q20", value)
                  }
                />

                <RadioQuestion
                  number="21"
                  label={t.q21}
                  value={survey.q21}
                  options={[
                    t.yes,
                    t.sometimes,
                    t.no
                  ]}
                  onChange={(value) =>
                    updateAnswer("q21", value)
                  }
                />

              </SurveySection>

              <button
                className="primary full"
                type="submit"
                disabled={loading}
              >
                {loading ? t.checking : t.submit}
              </button>

            </form>
          </section>
        )}

        {/* RESULTS PAGE */}
        {page === "results" && (
          <section className="card results-card">

            <button
              className="back"
              onClick={() => setPage("home")}
            >
              ← {t.home}
            </button>

            <div className="hero compact">

              <div className="eyebrow">
                MARGDARSHAN
              </div>

              <h1>
                {t.results}
              </h1>

              <p>
                {t.tailored}
              </p>

            </div>

            <div className="result-chat">

              {chat.map((item, index) => (
                <div
                  key={index}
                  className={`bubble ${item.role}`}
                >
                  {item.text}
                </div>
              ))}

              {loading && (
                <div className="bubble assistant">
                  {t.checking}
                </div>
              )}

            </div>

            <form
              onSubmit={sendMessage}
              className="composer"
            >
              <input
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder={t.askFollow}
                maxLength={1500}
              />

              <button
                className="primary send"
                disabled={
                  !message.trim() || loading
                }
              >
                {t.send}
              </button>
            </form>

            <button
              className="secondary full"
              onClick={resetApplication}
            >
              {t.newCheck}
            </button>

            <p className="privacy-note">
              🔒 {t.privacy}
            </p>

            <p className="disclaimer">
              {t.disclaimer}
            </p>

          </section>
        )}

      </main>

      <footer>
        <span>Margdarshan</span>
        <span>•</span>
        <span>{t.disclaimer}</span>
      </footer>

    </div>
  );
}


/* ---------------- COMPONENTS ---------------- */

function SurveySection({ title, children }) {
  return (
    <section className="survey-section">
      <h2 className="survey-section-title">
        {title}
      </h2>

      {children}
    </section>
  );
}


function TextQuestion({
  number,
  label,
  value,
  onChange,
  type = "text"
}) {
  return (
    <label className="field">

      <span className="question-label">
        <b>{number}.</b> {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        required
        min={type === "number" ? "1" : undefined}
        max={type === "number" ? "120" : undefined}
      />

    </label>
  );
}


function TextAreaQuestion({
  number,
  label,
  value,
  onChange
}) {
  return (
    <label className="field">

      <span className="question-label">
        <b>{number}.</b> {label}
      </span>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        rows="4"
        maxLength="600"
        required
      />

    </label>
  );
}


function SelectQuestion({
  number,
  label,
  value,
  options,
  placeholder,
  onChange
}) {
  return (
    <label className="field">

      <span className="question-label">
        <b>{number}.</b> {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        required
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            value={option}
            key={option}
          >
            {option}
          </option>
        ))}
      </select>

    </label>
  );
}


function RadioQuestion({
  number,
  label,
  value,
  options,
  onChange
}) {
  return (
    <fieldset className="question">

      <legend>
        <b>{number}.</b> {label}
      </legend>

      <div className="options">

        {options.map((option) => (
          <label
            className={`option ${
              value === option ? "selected" : ""
            }`}
            key={option}
          >

            <input
              type="radio"
              name={`question-${number}`}
              value={option}
              checked={value === option}
              onChange={() =>
                onChange(option)
              }
              required
            />

            <span>
              {option}
            </span>

          </label>
        ))}

      </div>

    </fieldset>
  );
}


createRoot(
  document.getElementById("root")
).render(
  <App />
);