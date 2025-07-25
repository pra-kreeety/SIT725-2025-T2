// Load express library
const express = require('express');
const path = require('path');

// Make express app
const app = express();
const PORT = 3000;

// Allow express to understand JSON
app.use(express.json());

// Show files from "public" folder (like calculator.html)
app.use(express.static(path.join(__dirname, 'public')));

// Some facts about me (used in index.html)
let aboutMe = [
    "I am from Nepal.",
    "I am studying at Deakin University.",
    "I love food.",
    "I love desserts."
];

// This gives a random fact
app.get('/api/about-me', (req, res) => {
    let randomNumber = Math.floor(Math.random() * aboutMe.length);
    res.json({ quote: aboutMe[randomNumber] });
});

// This handles the calculator request
app.post('/api/calculate', (req, res) => {
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let op = req.body.operation;

    let result;

    // Check which operation to do
    if (op === "add") {
        result = num1 + num2;
    } else if (op === "subtract") {
        result = num1 - num2;
    } else if (op === "multiply") {
        result = num1 * num2;
    } else {
        res.status(400).json({ error: "Unknown operation" });
        return;
    }

    // Send result back to the browser
    res.json({ result: result });
});

// Start the server
app.listen(PORT, () => {
    console.log("Server is running at http://localhost:" + PORT);
});
