import React, { useEffect, useState, useRef } from "react";
import "./Display.css";

import Box from "@mui/material/Box";

import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from "react-awesome-button";
const Groq = require("groq-sdk");
const groq = new Groq({
  dangerouslyAllowBrowser: true,
  apiKey: "",
});

export const Chatvoiceollamagroq = () => {
  const [history, setHistory] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  // YAML states
  const [selectedFile, setSelectedFile] = useState(null);
  const [yamlContent, setYamlContent] = useState("");
  const fileInputRef = useRef(null);

  const getGroqChatCompletion = async (prompt) => {
    return groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for Home Assistant YAML automations. 
Your role is to validate, secure, and optimize YAML. 
Always return a corrected YAML file (formatted properly), 
then provide a short summary of what was changed.`,
        },
        { role: "user", content: prompt },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 1,
      max_tokens: 8192,
    });
  };

  // Upload → open file picker
  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  // Submit → actually read the file into yamlContent
  const handleFileSubmit = () => {
    if (!selectedFile) {
      alert("Please select a YAML file first!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setYamlContent(event.target.result);
    };
    reader.readAsText(selectedFile);
  };

  // When user selects a file
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setYamlContent(""); // reset until submit
    }
  };

  const sendPrompt = async () => {
    setLoading(true);

    let combinedInput = "";
    if (yamlContent.trim()) {
      combinedInput += `Here is the YAML file:\n\n${yamlContent}\n\n`;
    }
    if (prompt.trim()) {
      combinedInput += `User instructions:\n${prompt}`;
    }

    if (!combinedInput) {
      alert("Please provide either a YAML file or a prompt.");
      setLoading(false);
      return;
    }

    let tempHistory = [
      ...history,
      { prompt: combinedInput, type: "user", timestamp: Date.now() },
      { prompt: "", type: "server", timestamp: Date.now() },
    ];
    setHistory(tempHistory);
    const tempIndex = tempHistory.length - 1;

    const chatCompletion = await getGroqChatCompletion(combinedInput);
    const content = chatCompletion.choices[0]?.message?.content || "";

    tempHistory[tempIndex].prompt = content;
    setHistory([...tempHistory]);
    setLoading(false);
  };

  // Download corrected YAML
  const downloadCorrectedYaml = () => {
    if (!history.length) {
      alert("No AI response found.");
      return;
    }

    const lastAiMessage = history
      .filter((h) => h.type === "server")
      .slice(-1)[0];
    if (!lastAiMessage || !lastAiMessage.prompt) {
      alert("No corrected YAML available.");
      return;
    }

    let aiText = lastAiMessage.prompt;

    // Detect YAML code block
    let yamlOnly = "";
    const yamlMatch = aiText.match(/```yaml([\s\S]*?)```/i);
    if (yamlMatch) {
      yamlOnly = yamlMatch[1].trim();
    } else {
      const parts = aiText.split(/Summary|Notes|Explanation|Changes/i);
      yamlOnly = parts[0].trim();
    }

    let summary = aiText.replace(yamlOnly, "").trim();
    let summaryAsComments = "";
    if (summary) {
      summaryAsComments =
        "\n\n# ----------------------------\n" +
        "# AI Notes / Summary:\n" +
        summary
          .split("\n")
          .map((line) => "# " + line)
          .join("\n");
    }

    const finalYaml = yamlOnly + summaryAsComments;

    const blob = new Blob([finalYaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "corrected.yaml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [history]);

  // --------------------------
  // UI
  // --------------------------
  return (
    <div className="App">
      <Box
        boxShadow={3}
        bgcolor="background.paper"
        p={2}
        className="retro-box"
        maxWidth="1000px"
        margin="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <h2>SmartHomeSecure Assistant GTP-OSS 20b</h2>

        {/* Chat history */}
        <div ref={chatBoxRef} className="chat-box">
          <div className="history">
            {history.map((item, index) => (
              <div key={index} className={`message ${item.type}`}>
                {item.type === "user" ? (
                  <>
                    🧑🏻‍💻 User:
                    <pre className="yaml-output">
                      <code>{item.prompt}</code>
                    </pre>
                  </>
                ) : (
                  <>
                    🤖 AI:
                    <pre className="yaml-output">
                      <code>{item.prompt}</code>
                    </pre>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </Box>

      {/* File actions */}
      <div
        className="file-upload"
        style={{ textAlign: "center", marginTop: 20 }}
      >
        <input
          type="file"
          accept=".yaml,.yml"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />

        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <AwesomeButton type="facebook" onPress={handleFileUpload}>
            Add YAML
          </AwesomeButton>
          <AwesomeButton type="facebook" onPress={handleFileSubmit}>
            Upload YAML
          </AwesomeButton>
          <AwesomeButton type="facebook" onPress={downloadCorrectedYaml}>
            Get Corrected YAML
          </AwesomeButton>
        </div>

        {selectedFile && <p>📄 Selected: {selectedFile.name}</p>}
        {yamlContent && <p className="file-status">✅ YAML loaded</p>}
      </div>

      {/* Prompt box */}
      <textarea
        className="textarea"
        placeholder="Add more instructions or comments for the SmartHomeSecure Chatbot"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>

      {/* Send button */}
      <div className="send-button-container" style={{ textAlign: "center" }}>
        <AwesomeButton type="github" disabled={loading} onPress={sendPrompt}>
          {loading ? "Processing..." : "Send"}
        </AwesomeButton>
      </div>
    </div>
  );
};
