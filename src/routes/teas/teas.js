const teaModel = require('../../models/teas');

exports.getTea = async (req,res) => {
  if(!req.params.tea_id || Number.isNaN(new Number(req.params.tea_id).valueOf())) {
    res.status(400).json({ message: "should required path parameters tea_id" });
  }

  try {
    res.json(await teaModel.findOneByTeaId(req.params.tea_id));
  } catch (err) {
    res.status(500).json({ message: err.toString()});
  }
}