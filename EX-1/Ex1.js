// import express from 'express';
const express = require('express');
const app = express();
const port = 3000;


app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});
app.get('/', (req, res) => {
    res.status(200).send(`
        <html>
            <head><title>Home</title></head>
            <body>
                <h1>Welcome to the homepage</h1>
                <p>This is a simple express</p>
            </body>
        </html>`);
});
app.get('/about', (req, res) => {
    res.status(200).send(`
        <html>
            <p>About us: At CADT, we love Node.js</p>
        </html>
    `)
});
app.get('/contact-us', (req, res) => {
    res.status(200).send(`
        <html>
            <p>You can reach us via email...</p>
        </html>
    `)
});
app.get('/products', (req, res) => {
    res.status(200).send(`
        <html>
            <p>Buy one get one</p>
        </html>
    `)
});
app.get('/projects', (req, res) => {
    res.status(200).send(`
        <html>
            <p>Here are our awesome projects</p>
        </html>
    `)
});
app.use((res,req) => {
    res.status(404).send(`
        <html>
            <title>Error</title>
            <h1>Error 404 not found</h1>
        </html>
    `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});