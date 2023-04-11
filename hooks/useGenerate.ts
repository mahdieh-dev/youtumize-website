import { useCallback, useState } from "react";
import useFirebase, { ECollection } from "./useFirebase";

const useGenerate = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const { setToDatabase, getFromDatabase } = useFirebase();

  const generate = useCallback(
    async (userInput: string) => {
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
      const docData = await getFromDatabase(ECollection.PROMPTS);
      let docPrompt = docData?.prompts ?? [];
      docPrompt.push({ prompt: userInput, output: output.text });
      await setToDatabase(ECollection.PROMPTS, {
        prompts: docPrompt,
      });

      setGeneratedContent(`${output.text}`);
      setIsGenerating(false);
    },
    [getFromDatabase, setToDatabase]
  );

  return { generate, isGenerating, generatedContent };
};

export default useGenerate;
