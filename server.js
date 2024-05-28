import express from 'express';
import cors from 'cors';

const todos = [];

const app = express();

// JSON middleware
app.use(express.json());
// CORS middleware
app.use(cors());


// Get all todos
app.get('/todos', (req, res) => {
    res.status(200).json({ data: todos })
});

// Create a new todo
app.post('/todos', (req, res, next) => {
    if (!req.body.task) {
        return res.status(400).json({ error: 'Task is required!' });
    }

    try {
        // lets mimic an error with a typo 'todoz'
        todos.push(req.body);
        res.status(201).json({ message: 'Todo created', todos });
    } catch (err) {
        next(err);
    }
})

// If any request gets to this point, it means it was not handled
app.use((req, res, next) => {
    res.status(404).send('Sorry, we could not find that');
});

// Global error handler
// Runs if a middleware or route handler call next with an error
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong!' });
})

app.listen(4000, () => console.log('Server running on http://localhost:4000'));