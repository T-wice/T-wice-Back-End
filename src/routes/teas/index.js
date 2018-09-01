const router = require('express').Router();
const teas = require('./teas');
const db = require('../../models').connect();


router.route('/:tea_id').get(teas.getTea);
addAnswerCount = (ansIds, conn) => {

    var timeStamp = new Date().getTime();

    var inputs = ansIds.map(element => {
        return `(${element}, ${timeStamp})`;
    }).join(',');

    conn.query(`INSERT INTO answer_results(answer_id, created_at) VALUES ${inputs}`);
}

whereClause = async (req, conn) => {
    var resultStr = "";
    if (req.query.answer_id) {
        var ansIds = req.query.answer_id.split(',').map(function(val){
            return parseInt(val)
        });

        var whereStr = "";
        if (ansIds && ansIds.length > 0) {
            whereStr = `WHERE answer_id IN (${ansIds.join(',')})`;

            addAnswerCount(ansIds, conn);
        }

        console.log(whereStr);
        const rows = await conn.query(`SELECT * FROM filter_conditions ${whereStr}`);

        rows.forEach(element => {
            if(resultStr.length > 0) {
                resultStr += "AND ";
            }
            resultStr += `teas.${element.column_name} ${element.comparator} ${element.value} `
        });

        if (resultStr.length > 0) {
            resultStr = "WHERE " + resultStr;
        }
    }
    return resultStr;
}


router.route('/').get(async function(req, res) {
    const connection = await db;
    const rows = await connection.query(`
    SELECT
    teas.id, teas.name, teas.description as tea_desc, duration, teas.img_url as tea_img_url, water_per_day, level,
    garbage_id, garbages.name as garbage_name, quantity, tea_garbage_rels.description as garbage_description, garbages.img_url as garbage_img_url
    FROM teas
    LEFT OUTER JOIN tea_garbage_rels ON teas.id = tea_garbage_rels.tea_id
    LEFT OUTER JOIN garbages ON tea_garbage_rels.garbage_id = garbages.id
    ${await whereClause(req, connection)}
    `);

    console.log ("length : " + rows.length);

    var result = [];

    var prevId;
    var teaView;
    rows.forEach(element => {
        var garbage = {};
        garbage.id = element.garbage_id;
        garbage.name = element.garbage_name;
        garbage.description = element.garbage_description;
        garbage.quantity = element.quantity;
        garbage.imgUrl = element.garbage_img_url;

        if (prevId == undefined || prevId != element.id) {
            teaView = {};
            teaView.id = element.id;
            prevId = element.id;
            teaView.name = element.name;
            teaView.description = element.tea_desc
            teaView.duration = element.duration;
            teaView.imgUrl = element.tea_img_url;
            teaView.waterPerDay = element.water_per_day;
            teaView.level = element.level;
            teaView.garbages = [];
            teaView.garbages.push(garbage);
            result.push(teaView);
        } else {
            teaView.garbages.push(garbage);
        }

    });

    res.json(result);

});

module.exports = router;