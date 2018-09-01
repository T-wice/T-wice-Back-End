const questionModel = require('../../models/question');

exports.question = async (req, res) => {
  if(!req.query["parent_id"] || req.query["parent_id"] < 1) {
    req.query["parent_id"] = 1;
  }

  try {
    res.json(await questionModel.question(req.query["parent_id"]));
    } catch(err) {
      res.status(500).json(err);
    }
}
