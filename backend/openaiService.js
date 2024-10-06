const { Configuration, OpenAIApi } = require('openai');

class OpenAIService {
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async getResponse(prompt) {
    try {
      const completion = await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 150,
      });
      return completion.data.choices[0].text.trim();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get response from OpenAI');
    }
  }
}

module.exports = OpenAIService;