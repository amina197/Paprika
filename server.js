require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const { getAllQuestions, addQuestion, helpfulQuestion, reportQuestion, addAnswer, helpfulAnswer, reportAnswer } = require('./db.js');

const PORT = process.env.PORT;


app.get('/', (req, res) => {
  getAllQuestions(2, (data) => {
    res.send(data);
  });
});

app.post('/question', (req, res) => {
  addQuestion(_, (data) => {
    res.send(data);
  });
});

app.post('/answer', (req, res) => {
  addAnswer(_, (data) => {
    res.send(data);
  });
});

app.put('/question/helpful', (req, res) => {
  helpfulQuestion(2, (data) => {
    res.send(data);
  });
})


app.put('/answer/helpful', (req, res) => {
  helpfulAnswer(2, 4, (data) => {
    res.send(data);
  });
})

app.put('/question/report', (req, res) => {
  reportQuestion(2, (data) => {
    res.send(data);
  });
})

app.put('/answer/report', (req, res) => {
  reportAnswer(2, 4, (data) => {
    res.send(data);
  });
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});