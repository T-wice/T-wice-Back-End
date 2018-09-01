const database = require('../../models/post');

exports.post = async (req,res) => {
  try {
    await database.insert(req.body.question, req.body.answers);
    res.status(201).end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.toString() })
  }
}
