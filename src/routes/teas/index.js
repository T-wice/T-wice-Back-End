const router = require('express').Router();
const db = require('../../models').connect();

router.route('/').get(async function(req, res) {
    const connection = await db;
    const rows = await connection.query("SELECT * FROM teas");
    
    console.log ("length : " + rows.length);

    var result = [];

    rows.forEach(element => {
        result.push({
            "id" :
            "name"
            "duration"
            "img_url"
        });
    });
    
    res.json(rows);

});

module.exports = router;