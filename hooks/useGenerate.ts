import { useCallback, useState } from "react";
import useAuthentication, { ECollection } from "./useAuthentication";

const useGenerate = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const { setToDatabase } = useAuthentication();

  const generate = useCallback(async (userInput: string) => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    // console.log("OpenAI replied...", output.text);
    await setToDatabase(ECollection.PROMPTS, {
      prompt: userInput,
    });
    setGeneratedContent(`${output.text}`);
    setIsGenerating(false);
  }, []);

  return { generate, isGenerating, generatedContent };
};

export default useGenerate;
