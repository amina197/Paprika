db.questions.aggregate([
  {
    '$lookup': {
      'from': 'answers',
      'localField': 'id',
      'foreignField': 'question_id',
      'as': 'answers'
    }
  }, {
    '$merge': 'questions'
  }
])


db.answers.aggregate([
  {
    '$lookup': {
      'from': 'photos',
      'localField': 'id',
      'foreignField': 'answer_id',
      'as': 'photos'
    }
  },
  {
    '$project': {
      _id: 1,
      id: 1,
      question_id: 1,
      body: 1,
      date_written: 1,
      answerer_name: 1,
      answerer_email: 1,
      reported: 1,
      helpful: 1,
      'photos': {
        '$map': {
          input: "$photos",
          as: "photo",
          in: "$$photo.url"
        }
      }
    }
  },
  {
    '$merge':
      "answers"
  }
])
