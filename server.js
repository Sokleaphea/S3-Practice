// server.js
import express, { json } from 'express';
import courses from "./course.js";
import logger from './logger.js';
import validateQuery from './validateQuery.js';
import authenticateToken from './authentication.js';
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.use(logger);

// app.get('/departments/:dept/courses', validateQuery, (req, res) => {
//     res.send('Filtered Courses');
// });

app.get('/departments/:dept/courses', validateQuery, authenticateToken, (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    if (minCredits && maxCredits && parseInt(minCredits) > parseInt(maxCredits)) {
        return res.status(400).json({ error: "Invalid credit range"});
    }
    let filtered = courses.filter(course => course.department.toLowerCase() === dept.toLowerCase());
    if (level) {
        filtered = filtered.filter(courses => courses.level === level);
    }
    if (minCredits) {
        filtered = filtered.filter(courses => courses.credits >= parseInt(minCredits));
    }
    if (maxCredits) {
        filtered = filtered.filter(courses => courses.credits <= parseInt(maxCredits));
    }
    if (semester) {
        filtered = filtered.filter(courses => courses.semester === semester);
    }
    if (instructor) {
        filtered = filtered.filter(courses => 
            courses.instructor.toLowerCase().includes(instructor.toLowerCase())
        );
    }
    return res.status(200).json(filtered);
    // Hint: Use the filter method to filter the courses array based on the provided criteria
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
