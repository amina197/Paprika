const { getAllQuestions, addQuestion, helpfulQuestion, reportQuestion, addAnswer, getOneQuestion, helpfulAnswer, reportAnswer } = require('./../db.js');

describe('getAllQuestions', () => {

  test('retrieve 5 questions corresponding to the product_id 5', done => {

    function callback(data) {
      try {
        expect(data.length).toBe(5);
        done();
      } catch(err) {
        done(err);
      }
    }

    getAllQuestions(5, callback);
  })
});

describe('addQuestion', () => {

  test('add a question to the database', done => {
    function callback(data) {
      try {
        expect(data).toBe('1 question added');
        done();
      } catch(err) {
        done(err);
      }
    }

    const q = {
      body: 'hello',
      name: 'tata',
      email: 'tata@gmail.com',
    }
    addQuestion(q, 879, callback);
  })
});

describe('helpfulQuestion', () => {
  test('increment by one the helpful field of question id 3518965', done => {

    function callback(data) {
      const previousHelpfulCount = data.helpful;

      function checkHelpfulIncremented(newData) {
        expect(newData.value.helpful).toBe(previousHelpfulCount + 1);
        done();
      }

      try {
        helpfulQuestion(3518965, checkHelpfulIncremented)
      } catch(err) {
        done(err);
      }
    }

    getOneQuestion(3518965, callback);
  })
});

describe('reportQuestion', () => {
  test('set the report field of question 3518965 to true', done => {

    function callback(data) {
      try {
        expect(data.value.reported).toBeTruthy();
        done();
      } catch(err) {
        done(err);
      }
    }

    reportQuestion(3518965, callback);
  })
});

describe('addAnswer', () => {
  test('add a new answer to the question with and id of 3518965', done => {

    function callback(data) {

      const previousAnswersLength = data.answers.length;

      const answer = {
        question_id: 3518965,
        body: 'answerBody',
        name: 'nickName',
        email: 'email',
        photos: ['1', '2']
      }

      function checkAnswerAdded(questionUpdated) {
        expect(questionUpdated.value.answers.length).toBe(previousAnswersLength + 1);
        done();
      }

      try {
        addAnswer(answer, checkAnswerAdded);
      } catch(err) {
        done(err);
      }
    }


    getOneQuestion(3518965, callback);
  })
});

describe('helpfulAnswer', () => {
  test('increment helpful field of answer by 1', done => {
    function callback(data) {
      const previousHelpfulCount = data.answers[3].helpful;

      function checkHelpfulIncremented(newData) {
        expect(newData.value.answers[3].helpful).toBe(previousHelpfulCount + 1);
        done();
      }

      try {
        helpfulAnswer(3518965, '6266d6cc2e9620373d09f0e2', checkHelpfulIncremented)

      } catch(err) {
        done(err);
      }
    }

    getOneQuestion(3518965, callback)
  })
});

describe('reportAnswer', () => {
  test('set reported field corresponding to the answer to true', done => {

    function callback(data) {
      try {
        expect(data.value.answers[3].reported).toBeTruthy();
        done();

      } catch(err) {
        done(err);
      }
    }

    reportAnswer(3518965, '6266d6cc2e9620373d09f0e2', callback)
  })
})







