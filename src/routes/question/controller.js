const database = require('../../models').connect();

exports.question = async (req, res) => {
  const connect = await database;
  const response = {};
  const query = await connect.query(
    `SELECT Q.question, A.id, A.is_leaf, A.description, A.next_question_id FROM
    questions as Q LEFT OUTER JOIN answers as A ON A.question_id = Q.id
    where Q.id = ${req.query["parent_id"]}`);

  response["question"] = query[0].question;
  response["answers"] = query.map((item) => {
    delete item.question;
    return item;
  });
  res.json(response);
}
