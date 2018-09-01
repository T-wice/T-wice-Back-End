const database = require('./index').connect();
const response = {};

function getAnswers(question_id, answers) {

  return answers.map((item) => {
    return `("${question_id}", "${item.is_leaf}", "${item.description}", "${item.target_url}", "${item.img_url}", "${item.next_question_id}")`;
  }).join(',');
}

exports.insert = async (question, answers) => {
  console.log(question, answers);

  const connect = await database;
  const questionResult = await connect
    .query(`INSERT INTO questions (question) VALUES ("${question}")`);
  await connect
    .query(`INSERT INTO answers (question_id, is_leaf, description, target_url, img_url, next_question_id) values ${getAnswers(questionResult.id, answers)}`);
}