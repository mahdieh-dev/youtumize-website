import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const zeroPromptPrefix = `
Write me some low-competition but highly searchable keywords for a Youtube video that has the following content:

Video content: 
`;

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${zeroPromptPrefix}${req.body.userInput}`);

  const zeroCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${zeroPromptPrefix}${req.body.userInput}\n`,
    temperature: 0.9,
    max_tokens: 500,
  });

  const zeroPromptOutput = zeroCompletion.data.choices.pop();

  const firstPromptPrefix = `
Write me an interesting title, a SEO-optimized description (include up to 5 tags in the description), the appropriate category of this video, a comment on the video to pin and a maximum of 500 characters low-competition SEO-optimized Youtube tags (split the tags with commas) for a Youtube video. Please do not include any duplicate tags. Write the above information in a way that increases video searchability and attractiveness and helps increase the video views. Work on the SEO of the above information using the below keywords.

The Youtube video has the following content:
Video content: ${req.body.userInput}

The keywords for SEO are as follows:
${zeroPromptOutput}
`;

  const firstCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${firstPromptPrefix}\n`,
    temperature: 0.9,
    max_tokens: 1250,
  });

  const firstPromptOutput = firstCompletion.data.choices.pop();

  res.status(200).json({ output: firstPromptOutput });
};

export default generateAction;
