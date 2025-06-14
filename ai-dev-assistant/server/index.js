require('dotenv').config();
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

app.post('/api/ask', async (req, res) => {
    const { prompt } = req.body;
    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [{role: 'user', content: prompt}],
            stream: false
        });
        res.json({ text: completion.data.choices[0].message.content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'AI request failed' });
    }
});

app.listen(4000, () => console.log('Server running on port 4000'));