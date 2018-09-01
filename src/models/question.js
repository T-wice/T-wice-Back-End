const database = require('./index').connect();
const response = {};

exports.question = async (parent_id) => {
  const connect = await database;
  const query = await connect.query(
    `SELECT Q.question, A.id, A.is_leaf, A.description, A.next_question_id, target_url FROM
    questions as Q LEFT OUTER JOIN answers as A ON A.question_id = Q.id
    where Q.id = ${parent_id}`);

  response["question"] = query[0].question;
  response["answers"] = query.map((item) => {
    delete item.question;
    item.isLeaf = item.is_leaf === 0 ? false : true;
    item.targetUrl = item.target_url;
    return item;
  });

  return response;
}