const { MongoClient } = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'sdcQA';
// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
});

const db = client.db(dbName);
const questions = db.collection('questions');

/**
 * @return all the questions related to the product
 */
const getAllQuestions = (product_id, cb) => {

  questions.find({ product_id }).toArray(function(err, productQuestions) {
    assert.equal(null, err);
    cb(productQuestions);
  })
}

/**
 * Save a new question in the database
 */
const addQuestion = (q) => {

  questions.find().sort({ id: -1}).limit(1).next(function(err, question) {
    questions.insertOne({
      id: question.id + 1,
      product_id: q.product_id,
      body: q.body,
      date_written: new Date(),
      asker_name: q.name,
      asker_email: q.email,
      reported: false,
      helpful: 0,
      answers: []
    }, function(err) {
      assert.equal(null, err);
      cb('1 question added');
    })
  })
}

/**
 * Add 1 to the helpful field of the concerned question
 * @return the modified question marked as helpful
 */
const helpfulQuestion = (id, cb) => {
  questions.findOneAndUpdate({ id } , { $inc: { helpful: 1 }}, { returnDocument: 'after'},
    function(err, modifiedQuestion) {
      assert.equal(null, err);
      console.log(modifiedQuestion);
      cb(modifiedQuestion);
    }
  )
}

/**
 * Set the reported field of the concerned question to true
 * @return the modified reported question
 */
const reportQuestion = (id, cb) => {

  questions.findOneAndUpdate({ id }, { $set: { reported: true }}, {returnDocument: 'after'}, function(err, modifiedQuestion) {
    assert.equal(null, err);
    cb(modifiedQuestion);
  })
}

/**
 * Save new answer to the database
 * @return the question with the new answer added to it
 */
const addAnswer = (a, cb) => {
  let lastIndex = 6879306;
  lastIndex += 1;
  questions.findOneAndUpdate({ id: a.question_id },
    { $push: {
      answers: {
        id: lastIndex,
        question_id: a.question_id,
        body: a.body,
        date_written: new Date(),
        answerer_name: a.name,
        answerer_email: a.email,
        reported: false,
        helpful: 0,
        photos: a.photos
      }
    }},
  { returnDocument: 'after'}, function(err, qNewAnswer) {
    cb(qNewAnswer);
  })
}

/**
 * Add 1 to the helpful field of the concerned answer
 * @return the modified question with the answer marked as helpful
 */
const helpfulAnswer = (q_id, a_id, cb) => {

  questions.findOneAndUpdate({ id: q_id, 'answers.id': a_id }, { $inc: { 'answers.$.helpful': 1} }, { returnDocument: 'after' },
    function(err, modifiedQuestion) {
      cb(modifiedQuestion);
    }
  )
}

/**
 * Set the reported field of the concerned answer to true
 * @return the modified question with the reported answer
 */
const reportAnswer = (q_id, a_id, cb) => {
  questions.findOneAndUpdate({ id: q_id, 'answers.id': a_id }, { $set: { 'answers.$.reported': true } }, { returnDocument: 'after' }, function(err, modifiedQuestion) {
    cb(modifiedQuestion);
  })
}

exports.getAllQuestions = getAllQuestions;
exports.addQuestion = addQuestion;
exports.helpfulQuestion = helpfulQuestion;
exports.reportQuestion = reportQuestion;
exports.addAnswer = addAnswer;
exports.helpfulAnswer = helpfulAnswer;
exports.reportAnswer = reportAnswer;


//TESTING
//getAllQuestions(5);

// addQuestion({
//   body: 'questionBody',
//   name: 'nickName',
//   email: 'email',
//   product_id: 50,
// });

// helpfulQuestion(3518964);

// addAnswer({
//   question_id: 3518964,
//   body: 'answerBody',
//   name: 'nickName',
//   email: 'email',
//   photos: ['1', '2']
// })

// reportAnswer(3518964, 6879307);
// helpfulAnswer(3518964, 6879307);
