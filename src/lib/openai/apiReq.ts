import { openai } from './openAiApi';

export async function chatgpt(message: string): Promise<string> {
  let assistantMessage = '';

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      temperature: 0.1,
    });

    if (response.status === 200) {
      assistantMessage = response.data.choices[0].message?.content as string;
    } else {
      console.log(
        `ChatGPT error. Code: ${response.status}, ${response.statusText}`
      );
    }
  } catch (e: any) {
    if (e.request) {
      console.log('ChatGPT error. Request error');
    }
  }

  return assistantMessage;
}
