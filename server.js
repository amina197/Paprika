require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use('/static', express.static(__dirname + '/dist'));

const { getAllQuestions, addQuestion, helpfulQuestion, reportQuestion, addAnswer, helpfulAnswer, reportAnswer } = require('./db.js');

const PORT = process.env.PORT || 3000;

app.get('/qa/:productId', (req, res) => {
  getAllQuestions(Number(req.params.productId), (data) => {
    res.status(200).send(data);
  });
});

app.post('/qa/:productId/q/add', (req, res) => {
  addQuestion(req.body, Number(req.params.productId), (data) => {
    res.status(201).send(data);
  });
});

app.post('/qa/a/add', (req, res) => {
  addAnswer(req.body, (data) => {
    res.status(201).send(data);
  });
});

app.put('/qa/q/helpful', (req, res) => {
  helpfulQuestion(req.body.question_id, (data) => {
    res.status(200).send(data);
  });
})


app.put('/qa/a/helpful', (req, res) => {
  helpfulAnswer(req.body.question_id, req.body.answer_id, (data) => {
    res.status(200).send(data);
  });
})

app.put('/qa/q/report', (req, res) => {
  reportQuestion(req.body.question_id, (data) => {
    res.status(200).send(data);
  });
})

app.put('/qa/a/report', (req, res) => {
  reportAnswer(req.body.question_id, req.body.answer_id, (data) => {
    res.status(200).send(data);
  });
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
