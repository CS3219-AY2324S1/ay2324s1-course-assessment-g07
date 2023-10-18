const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 7000;

app.use(express.json());

app.use(cors());

const apiKey = '844f6c8b4bmshce3b825a3df98bfp1f4a4djsneee8c988e709';
const baseUrl = 'https://judge0-ce.p.rapidapi.com';
const openaiKey = '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';

app.post('/compile', async (req, res) => {
    try {
        const { sourceCode, languageId } = req.body;

        const response = await axios.post(
            `${baseUrl}/submissions/?base64_encoded=false&wait=false`,
            {
                source_code: sourceCode,
                language_id: languageId, // Replace with the appropriate language ID (e.g., 1 for C++)

            },
            {
                headers: {
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    'X-RapidAPI-Key': apiKey,
                    'Content-Type': 'application/json',
                },
            }
        );


        const submissionToken = response.data.token;
        console.log(response);
        // Poll the status until the compilation is finished
        const compilationResult = await pollCompilationStatus(submissionToken);
        console.log(compilationResult);
        res.json({ result: compilationResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const pollCompilationStatus = async (submissionToken) => {
    try {
        while (true) {
            const response = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}`, {
                headers: {
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    'X-RapidAPI-Key': apiKey,
                },
            });
            console.log('compilation response:', response.data);
            const status = response.data.status.description;
            console.log(status);
            if (status === 'In Queue' || status === 'Processing') {
                // If the submission is still in the queue or processing, continue polling
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before polling again
            } else if (status === 'Accepted') {
                // If the submission is accepted, retrieve the output and return it
                return response.data.stderr;
            } else {
                // Handle other statuses as needed

                return response.data.message;
            }
        }
    } catch (error) {
        throw new Error('Error polling submission status: ' + error.message);
    }
};

app.post('/evaluate', async (req, res) => {
    try {
        const { code, language, description, compilationResult } = req.body;

        // Construct the input for ChatGPT
        const chatGptInput = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful computer science professor.',
                },
                {
                    role: 'user',
                    content: `Imagine you are a helpful computer science professor.
    Here is the question description: ${description}
    Here is the code the student wrote: ${code} in ${language}
    Here is the compilation result: ${compilationResult}
    If there are errors, provide tips to solve the compilation errors and give the student a score of 0/30
    If there are no errors, give the student a score out of 10 based on :
    1) computational efficiency of code
    2) readability of code
    3) time complexity of algorithm`,
                },
            ],
        };

        // Make a request to the OpenAI GPT-3 API for code evaluation
        const response = await axios.post('https://api.openai.com/v1/chat/completions', chatGptInput, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiKey}`,
            },
        });

        // Extract and return the response from ChatGPT
        const chatGptMessageContent = response.data.choices[0].message.content;

        res.json({ result: chatGptMessageContent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`eval-service listening at http://localhost:${port}`);
});
