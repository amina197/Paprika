require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const { getAllQuestions, addQuestion, helpfulQuestion, reportQuestion, addAnswer, helpfulAnswer, reportAnswer } = require('./db.js');

const PORT = process.env.PORT;

app.get('/qa', (req, res) => {
  getAllQuestions(req.query.product_id, (data) => {
    res.send(data);
  });
});

app.post('/qa/q/add', (req, res) => {
  addQuestion(req.body, (data) => {
    res.send(data);
  });
});

app.post('/qa/a/add', (req, res) => {
  addAnswer(req.body, (data) => {
    res.send(data);
  });
});

app.put('/qa/q/helpful', (req, res) => {
  helpfulQuestion(req.body.question_id, (data) => {
    res.send(data);
  });
})


app.put('/qa/a/helpful', (req, res) => {
  helpfulAnswer(req.body.question_id, req.body.answer_id, (data) => {
    res.send(data);
  });
})

app.put('/qa/q/report', (req, res) => {
  reportQuestion(req.body.question_id, (data) => {
    res.send(data);
  });
})

app.put('/qa/a/report', (req, res) => {
  reportAnswer(req.body.question_id, req.body.answer_id, (data) => {
    res.send(data);
  });
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});