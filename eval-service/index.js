const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 7000;
const cheerio = require('cheerio');

app.use(express.json());

app.use(cors());

const apiKey = '844f6c8b4bmshce3b825a3df98bfp1f4a4djsneee8c988e709';
const baseUrl = 'https://judge0-ce.p.rapidapi.com';
const openaiKey = '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';

function extractTextFromHTML(html) {
    const $ = cheerio.load(html);
    const textElements = [];
  
    $('*').each((index, element) => {
      const text = $(element).text().trim();
      if (text) {
        textElements.push(text);
      }
    });
  
    return textElements.join(' ');
  }

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
        // Poll the status until the compilation is finished
        const compilationResult = await pollCompilationStatus(submissionToken);
        console.log('result:', compilationResult);
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
            const status = response.data.status.description;
            console.log(status);
            if (status === 'In Queue' || status === 'Processing') {
                // If the submission is still in the queue or processing, continue polling
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before polling again
            } else {
                // Handle other statuses as needed
                const stdout = response.data.stdout;
                const stderr = response.data.stderr;

                if (stdout != null) {
                    return stdout;
                } else {
                    return stderr;
                }
            }
        }
    } catch (error) {
        throw new Error('Error polling submission status: ' + error.message);
    }
};

app.post('/evaluate', async (req, res) => {
    try {
        const { code, language, description, compilationResult } = req.body;
        const extractedText = extractTextFromHTML(description); 
        console.log(extractedText);
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
    Here is the question description: ${extractedText}
    Here is the code the student wrote: ${code} in ${language}
    Here is the compilation result: ${compilationResult}
    Repeat the question description and score the student's code out of 10 total marks based on
    1) Correctness of code, does it satisfy the question requirement or is it failing some edge cases (5 marks allocated)
    2) time complexity of algorithm used (3 marks allocated)
    3) readability of code (2 marks allocated)
    if the code does not answer the question at all please give it a score of 0 out of 10. Please output the score as Student's Score : (the score you have given the student)/10`,
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
