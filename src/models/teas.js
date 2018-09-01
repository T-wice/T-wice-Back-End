const database = require('./index').connect();
const response = {};

exports.findOneByTeaId = async (teaId) => {
  const connect = await database;

  const query = await connect.query(
    `SELECT T.id, T.name, T.duration, T.description, T.img_url, T.water_per_day, T.level,
    TG.id as tg_id, TG.description as tea_garbege_description, TG.quantity,
    G.name as gName, G.img_url as g_img_url  FROM teas as T
    LEFT OUTER JOIN tea_garbage_rels as TG ON TG.tea_id = T.id
    LEFT OUTER JOIN garbages as G ON G.id = TG.garbage_id
    where TG.tea_id = ${teaId}`);

    if (query.length === 0) {
      throw new Error("Not found find Tea Id");
    }

    Object.assign(response, query[0]);
    response["garbages"] = [];
    Object.keys(query)
      .map((item) => {
        if (Array.isArray(query[item])){
          return;
        }

        response["garbages"]
          .push(
            {
              id: query[item].tg_id,
              name: query[item].gName,
              description: query[item].tea_garbege_description,
              quantity: query[item].quantity,
              img_url: query[item].g_img_url
          }
        );
      })

      delete response.tg_id;
      delete response.gName;
      delete response.tea_garbege_description;
      delete response.quantity;
      delete response.g_img_url;

  return response;
}