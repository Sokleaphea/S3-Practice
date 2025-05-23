const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
const filePath = path.join(__dirname, 'submissions.txt');

app.use((req,res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});
app.get('/', (req, res) => {
    res.status(200).type('text').send('Welcome to the home page');
});
app.get('/contact', (req, res) => {
    res.status(200).type('html').send(`
        <form method ="POST" action="contact">
            <input type="text" name="name" placeholder="Your Name"/>
            <button type="submit">Submit</button>
        </form>
    `)
});
app.post('/contact', (req, res) => {
    const name = req.body.name;

    try {
        fs.appendFileSync(filePath, name + "\n");
        res.status(200).send("Data Recieved");
    } catch (err) {
        console.error('Error writing to file', err);
        res.status(500).send('Internal Server Error');
    }
});
app.use((req, res) => {
  res.status(404).type('text').send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
